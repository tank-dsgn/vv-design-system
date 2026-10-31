// Runs axe-core over every story in a built Storybook, in both themes.
//
//   npm run build-storybook && npm run test:a11y
//
// Exits 1 on any WCAG 2.1 A/AA violation. Stories only: the docs pages add
// Storybook's own chrome, which is not this system's to fix. Forced hover and
// focus states are included, since the matrices render them.
import { createReadStream, existsSync, readFileSync } from "node:fs"
import { createServer } from "node:http"
import { createRequire } from "node:module"
import { extname, join, resolve } from "node:path"
import { chromium } from "playwright"

const ROOT = resolve(process.argv[2] ?? "storybook-static")
if (!existsSync(join(ROOT, "index.json"))) {
  console.error(`No Storybook build at ${ROOT}. Run: npm run build-storybook`)
  process.exit(2)
}
const axeSource = readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8")
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".woff2": "font/woff2" }

const server = createServer((req, res) => {
  const path = join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname))
  if (!path.startsWith(ROOT) || !existsSync(path)) { res.writeHead(404); return res.end() }
  res.writeHead(200, { "content-type": TYPES[extname(path)] ?? "application/octet-stream" })
  createReadStream(path).pipe(res)
})
await new Promise((ok) => server.listen(0, ok))
const base = `http://localhost:${server.address().port}`

const entries = JSON.parse(readFileSync(join(ROOT, "index.json"), "utf8")).entries
const stories = Object.values(entries).filter((e) => e.type === "story")
// CI installs Playwright's Chromium; on a laptop the installed Chrome will do.
const browser = await chromium.launch(process.env.CI ? {} : { channel: "chrome" })
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" })
const failures = []
let done = 0

async function check(story, theme) {
  const page = await context.newPage()
  try {
    await page.goto(`${base}/iframe.html?id=${story.id}&viewMode=story&globals=theme:${theme}`, { waitUntil: "load" })
    await page.waitForFunction(() => document.querySelector("#storybook-root")?.childElementCount > 0, null, { timeout: 15000 })
    await page.waitForTimeout(250)
    await page.evaluate(axeSource)
    const violations = await page.evaluate(async () => {
      // Storybook's a11y addon may be running axe on the same page; wait it out.
      const run = async (tries) => {
        try {
          return await window.axe.run("#storybook-root", {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
          })
        } catch (e) {
          if (!tries || !String(e).includes("already running")) throw e
          await new Promise((ok) => setTimeout(ok, 300))
          return run(tries - 1)
        }
      }
      const r = await run(30)
      return r.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.map((n) => ({ target: n.target.join(" "), why: n.any[0]?.message ?? n.failureSummary })),
      }))
    })
    for (const v of violations) failures.push({ story: story.id, title: story.title, theme, ...v })
  } catch (e) {
    failures.push({ story: story.id, title: story.title, theme, id: "render-failed", impact: "critical", help: String(e.message).split("\n")[0], nodes: [] })
  } finally {
    await page.close()
    done++
  }
}

const queue = stories.flatMap((s) => [[s, "light"], [s, "dark"]])
await Promise.all(Array.from({ length: 6 }, async () => {
  while (queue.length) await check(...queue.shift())
}))
await browser.close()
server.close()

console.log(`${done} checks: ${stories.length} stories × 2 themes`)
if (!failures.length) {
  console.log("No WCAG 2.1 A/AA violations.")
  process.exit(0)
}
const byRule = new Map()
for (const f of failures) {
  const key = `${f.id} — ${f.help}`
  if (!byRule.has(key)) byRule.set(key, [])
  byRule.get(key).push(f)
}
for (const [rule, list] of byRule) {
  const nodes = list.reduce((n, f) => n + f.nodes.length, 0)
  console.log(`\n${rule} (${list.length} stories, ${nodes} nodes)`)
  for (const f of list) {
    for (const n of f.nodes.length ? f.nodes : [{ target: "", why: "" }]) console.log(`  [${f.theme}] ${f.story}  ${n.target}\n      ${n.why ?? ""}`)
  }
}
process.exit(1)
