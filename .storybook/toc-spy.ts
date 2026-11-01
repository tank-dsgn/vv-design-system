/* The contents list follows the page. Tocbot's own tracking stays on one heading on these pages,
   so it marks a class nothing styles (preview.tsx) and this sets the ones the list is styled by.
   Headings in a hidden tab do not count. */
/** A section counts as current once its heading reaches this share of the window. */
const REACHED = 0.4

/** A clicked item stays current until the reader scrolls: a short section's neighbour may also have reached the line. */
let pinned: Element | null = null

function update() {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".toc-wrapper a.toc-link"))
    .map((link) => ({ link, heading: document.getElementById(decodeURIComponent(link.hash.slice(1))) }))
    .filter(({ link, heading }) => link.offsetParent && heading?.offsetParent)
  if (!links.length) return
  const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
  const line = window.innerHeight * REACHED
  const passed = links.filter(({ heading }) => heading!.getBoundingClientRect().top <= line)
  const current = atEnd ? links[links.length - 1] : passed[passed.length - 1] ?? links[0]
  document.querySelectorAll(".toc-wrapper .toc-link").forEach((link) => {
    const on = link === (pinned ?? current.link)
    if (link.classList.contains("is-active-link") !== on) link.classList.toggle("is-active-link", on)
    link.parentElement?.classList.toggle("is-active-li", on)
  })
}

let queued = false
const schedule = () => {
  if (queued) return
  queued = true
  requestAnimationFrame(() => {
    queued = false
    update()
  })
}

document.addEventListener("click", (e) => {
  const link = (e.target as Element).closest?.(".toc-wrapper a.toc-link")
  if (link) { pinned = link; schedule() }
}, true)
const unpin = () => { pinned = null }
for (const type of ["wheel", "touchmove", "keydown"]) window.addEventListener(type, unpin, { passive: true })

window.addEventListener("scroll", schedule, { passive: true })
window.addEventListener("resize", schedule)
// A new page, a rebuilt list or another tab.
new MutationObserver(schedule).observe(document.documentElement, { subtree: true, childList: true })
