// Walks every docs page and story of a built Storybook in both themes, on desktop and on a phone,
// and reports what is wrong on the page as a person would meet it.
//
//   npm run build-storybook && node scripts/crawl.mjs [storybook-static]
import { createReadStream, existsSync, readFileSync } from "node:fs"
import { createServer } from "node:http"
import { extname, join, resolve } from "node:path"
import { chromium } from "playwright"

const ROOT = resolve(process.argv[2] ?? "storybook-static")
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png" }
const server = createServer((req, res) => {
  const p = join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname))
  if (!p.startsWith(ROOT) || !existsSync(p)) { res.writeHead(404); return res.end() }
  res.writeHead(200, { "content-type": TYPES[extname(p)] ?? "application/octet-stream" })
  createReadStream(p).pipe(res)
})
await new Promise((ok) => server.listen(0, ok))
const base = `http://localhost:${server.address().port}`
const entries = Object.values(JSON.parse(readFileSync(join(ROOT, "index.json"))).entries)
const docs = entries.filter((e) => e.type === "docs").map((e) => e.id)
const stories = entries.filter((e) => e.type === "story").map((e) => e.id)
const ids = new Set(entries.map((e) => e.id))
const browser = await chromium.launch(process.env.CI ? {} : { channel: "chrome" })
const problems = []
const report = (where, what) => problems.push(`${where}: ${what}`)

async function pool(items, size, fn) {
  let i = 0
  await Promise.all(Array.from({ length: size }, async () => { while (i < items.length) await fn(items[i++]) }))
}

// The page as it opens from the header: shell and page must agree.
async function shell(theme, width) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } })
  await ctx.addInitScript((t) => localStorage.setItem("vv-theme", t), theme)
  await pool(docs, 6, async (id) => {
    const where = `${id} [${theme} ${width}]`
    const page = await ctx.newPage()
    page.on("pageerror", (e) => report(where, `script error: ${e.message.slice(0, 120)}`))
    page.on("response", (r) => { if (r.status() >= 400 && !/favicon|missing-image/.test(r.url())) report(where, `${r.status()} ${r.url().slice(0, 100)}`) })
    await page.goto(`${base}/index.html?path=/docs/${id}`)
    await page.waitForTimeout(3500)
    const s = await page.evaluate(() => {
      const f = document.querySelector("#storybook-preview-iframe")
      const d = f?.contentDocument
      const bg = d && getComputedStyle(d.querySelector(".sbdocs-wrapper") ?? d.body).backgroundColor
      const lum = bg && bg.match(/\d+/g).slice(0, 3).reduce((a, b) => a + Number(b), 0)
      return {
        shell: document.documentElement.dataset.vvTheme,
        html: d?.documentElement.classList.contains("dark"),
        lum,
        error: d?.querySelector("#vv-error h1")?.textContent ?? null,
        title: d?.querySelector("#storybook-docs h1")?.textContent ?? null,
        overflow: d ? d.documentElement.scrollWidth - d.documentElement.clientWidth : 0,
        broken: d ? [...d.images].filter((i) => i.complete && !i.naturalWidth).map((i) => i.src.slice(-40)) : [],
        selected: document.querySelector('[data-selected="true"]')?.dataset.itemId ?? null,
        desktop: innerWidth >= 600,
        links: d ? [...d.querySelectorAll('a[href*="path=/docs/"]')].map((a) => new URL(a.href).searchParams.get("path").split("/").pop()) : [],
      }
    })
    if (s.error) report(where, `error screen: ${s.error}`)
    if (!s.title) report(where, "no page title")
    if (s.shell !== theme) report(where, `shell is ${s.shell}`)
    if (s.html !== (theme === "dark")) report(where, `page class disagrees (dark=${s.html})`)
    if (theme === "dark" ? s.lum > 150 : s.lum < 600) report(where, `page background is wrong: ${s.lum}`)
    if (s.overflow > 1) report(where, `sideways scroll ${s.overflow}px`)
    if (s.broken.length) report(where, `broken images ${s.broken}`)
    if (s.desktop && s.selected !== id) report(where, `menu marks ${s.selected}`)
    for (const l of s.links) if (!ids.has(l)) report(where, `dead link ${l}`)
    await page.close()
  })
  await ctx.close()
}

// Every story on its own, which is what an embedded example or a link opens.
async function story(theme) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  await pool(stories, 4, async (id) => {
    const where = `${id} [${theme}]`
    const page = await ctx.newPage()
    page.on("pageerror", (e) => report(where, `script error: ${e.message.slice(0, 120)}`))
    await page.goto(`${base}/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`)
    await page.waitForFunction(() => document.querySelector("#storybook-root")?.childElementCount > 0 || document.querySelector("#vv-error h1"), null, { timeout: 30000 }).catch(() => report(where, "never rendered"))
    const err = await page.locator("#vv-error h1").textContent({ timeout: 200 }).catch(() => null)
    if (err) report(where, `error screen: ${err}`)
    const empty = await page.evaluate(() => (document.querySelector("#storybook-root")?.getBoundingClientRect().height ?? 0) < 4)
    if (empty && !err) report(where, "renders nothing visible")
    await page.close()
  })
  await ctx.close()
}

for (const theme of ["light", "dark"]) {
  await shell(theme, 1440)
  await shell(theme, 390)
  await story(theme)
}
await browser.close()
server.close()
const unique = [...new Set(problems)].sort()
console.log(`${docs.length} pages, ${stories.length} stories; ${unique.length} problems`)
unique.forEach((p) => console.log(p))
process.exit(unique.length ? 1 : 0)
