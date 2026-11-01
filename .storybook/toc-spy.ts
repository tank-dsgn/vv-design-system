/* The contents list follows the page. Tocbot's own tracking stays on one heading on these pages,
   so it marks a class nothing styles (preview.tsx) and this sets the ones the list is styled by.
   Headings under a sticky toolbar or in a hidden tab count correctly. */
const UNDER_TOOLBAR = 96

function update() {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".toc-wrapper a.toc-link"))
    .map((link) => ({ link, heading: document.getElementById(decodeURIComponent(link.hash.slice(1))) }))
    .filter(({ link, heading }) => link.offsetParent && heading?.offsetParent)
  if (!links.length) return
  const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
  const passed = links.filter(({ heading }) => heading!.getBoundingClientRect().top <= UNDER_TOOLBAR)
  const current = atEnd ? links[links.length - 1] : passed[passed.length - 1] ?? links[0]
  document.querySelectorAll(".toc-wrapper .toc-link").forEach((link) => {
    const on = link === current.link
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

window.addEventListener("scroll", schedule, { passive: true })
window.addEventListener("resize", schedule)
// A new page, a rebuilt list or another tab.
new MutationObserver(schedule).observe(document.documentElement, { subtree: true, childList: true })
