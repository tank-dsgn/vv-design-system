// Storybook names the manager's addon bundles without a hash, so a browser can keep an old one after
// a release and pair it with the new page: the site header then misses whatever changed. Each bundle
// gets its content's hash in the address, so a new release is always fetched anew.
import { createHash } from "node:crypto"
import { readFileSync, writeFileSync } from "node:fs"

const dir = "storybook-static"
const page = `${dir}/index.html`
let html = readFileSync(page, "utf8")
let count = 0
html = html.replace(/\.\/(sb-addons\/[^"'?]+\.js)/g, (match, file) => {
  count++
  return `${match}?v=${createHash("sha1").update(readFileSync(`${dir}/${file}`)).digest("hex").slice(0, 10)}`
})
writeFileSync(page, html)
console.log(`stamped ${count} addon bundle references`)
