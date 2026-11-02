import * as React from "react"
import type { API } from "storybook/manager-api"
import { GROUPS } from "../src/docs/groups"
import { GROUP_ICONS, NavIcon, PAGE_ICONS } from "./nav-icons"
import { PanelIcon } from "./nav-state"

/* The phone menu: a panel from the right, under the header, opened by the navigation button.
   It replaces Storybook's bottom bar and its drawer, and holds the sections as tabs, search and
   the pages of the chosen section. */

type Page = { id: string; title: string }

const pagesOf = (api: API): Page[] =>
  (Object.values(api.getIndex()?.entries ?? {}) as unknown as { id: string; type: string; title: string }[])
    .filter((e) => e.type === "docs")
    .map((e) => ({ id: e.id, title: e.title }))

const leaf = (title: string) => title.split("/").pop() ?? title

/** The phone's navigation button, at the right end of the header. */
export function PanelButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  const label = open ? "Close navigation" : "Open navigation"
  return (
    <button type="button" className="vv-header__panel" aria-label={label} title={label} aria-expanded={open} aria-controls="vv-drawer" onClick={onClick}>
      <PanelIcon open={open} side="right" />
    </button>
  )
}

export function MobileMenu({ api, open, path, section, onClose, sections }: {
  api: API
  open: boolean
  path: string | undefined
  section: string
  onClose: () => void
  sections: { id: string; label: string; to: string }[]
}) {
  const [tab, setTab] = React.useState(section)
  const [text, setText] = React.useState("")
  const pages = React.useMemo(() => (open ? pagesOf(api) : []), [api, open])
  const current = path?.split("/").pop()?.replace(/--.*$/, "")

  React.useEffect(() => {
    if (open) { setTab(section); setText("") }
  }, [open, section])

  // Everything behind the panel leaves the tab order while it is open.
  React.useEffect(() => {
    const root = document.getElementById("root")
    root?.toggleAttribute("inert", open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { onClose(); document.querySelector<HTMLElement>(".vv-header__panel")?.focus() } }
    const wide = window.matchMedia("(min-width: 600px)")
    const onWide = () => { if (wide.matches) onClose() }
    document.addEventListener("keydown", onKey)
    wide.addEventListener("change", onWide)
    return () => {
      root?.removeAttribute("inert")
      document.removeEventListener("keydown", onKey)
      wide.removeEventListener("change", onWide)
    }
  }, [open, onClose])

  // A swipe to the right closes the panel: it follows the finger and closes past a third of its
  // width or on a quick flick; a vertical move is left to scrolling.
  const drawer = React.useRef<HTMLElement>(null)
  const scrim = React.useRef<HTMLDivElement>(null)
  const swipe = React.useRef<{ x: number; y: number; t: number; dx: number; axis?: "x" | "y" } | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    const p = e.touches[0]
    swipe.current = e.touches.length === 1 ? { x: p.clientX, y: p.clientY, t: e.timeStamp, dx: 0 } : null
  }
  const onTouchMove = (e: React.TouchEvent) => {
    const s = swipe.current
    const el = drawer.current
    if (!s || !el) return
    const dx = e.touches[0].clientX - s.x
    const dy = e.touches[0].clientY - s.y
    if (!s.axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      s.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y"
    }
    if (s.axis !== "x") return
    s.dx = Math.max(0, dx)
    el.style.transition = "none"
    el.style.transform = `translateX(${s.dx}px)`
    if (scrim.current) {
      scrim.current.style.transition = "none"
      scrim.current.style.opacity = String(1 - s.dx / el.offsetWidth)
    }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = swipe.current
    const el = drawer.current
    swipe.current = null
    if (!s || !el || s.axis !== "x") return
    for (const node of [el, scrim.current]) node?.style.removeProperty("transition")
    el.style.removeProperty("transform")
    scrim.current?.style.removeProperty("opacity")
    if (s.dx > el.offsetWidth / 3 || s.dx / (e.timeStamp - s.t) > 0.5) onClose()
  }
  const swipeHandlers = { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel: onTouchEnd }

  const go = (e: React.MouseEvent, to: string, close = true) => {
    if (e.metaKey || e.ctrlKey) return
    e.preventDefault()
    api.navigate(to)
    if (close) onClose()
  }

  const link = (p: Page) => (
    <a key={p.id} href={`./?path=/docs/${p.id}`} aria-current={p.id.replace(/--.*$/, "") === current ? "page" : undefined} onClick={(e) => go(e, `/docs/${p.id}`)}>
      <NavIcon name={p.id.startsWith("components-") ? "component" : PAGE_ICONS[leaf(p.title)]} />
      {leaf(p.title)}
    </a>
  )

  const q = text.trim().toLowerCase()
  const byName = (name: string) => pages.find((p) => p.id === `components-${name.toLowerCase()}--docs`)

  return (
    <>
      <div ref={scrim} className="vv-drawer__scrim" data-open={open || undefined} onClick={onClose} {...swipeHandlers} />
      <nav ref={drawer} id="vv-drawer" className="vv-drawer" {...swipeHandlers} data-open={open || undefined} aria-label="Menu">
        <div className="vv-drawer__body">

          {/* The sections and search stay at the top of the panel while the list scrolls under them. */}
          <div className="vv-drawer__findbar">
            <div className="vv-drawer__sections">
              {sections.map((s) => (
                <a key={s.id} href={`./?path=${s.to}`} aria-current={section === s.id ? "page" : undefined} data-tab={tab === s.id || undefined} onClick={(e) => { setTab(s.id); setText(""); go(e, s.to, false) }}>
                  {s.label}
                </a>
              ))}
            </div>
            <label className="vv-drawer__find">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true"><path d="M7 12.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM11 11l3.5 3.5" /></svg>
              <input aria-label="Find a page" placeholder="Find..." autoComplete="off" spellCheck={false} value={text} onChange={(e) => setText(e.target.value)} />
            </label>
          </div>

          <div className="vv-drawer__pages">
            {q ? (
              <>
                {pages.filter((p) => leaf(p.title).toLowerCase().includes(q)).map(link)}
                {!pages.some((p) => leaf(p.title).toLowerCase().includes(q)) && <p role="status">No results</p>}
              </>
            ) : tab === "foundations" ? (
              pages.filter((p) => p.title.startsWith("Foundations/")).map(link)
            ) : (
              Object.entries(GROUPS).map(([group, names]) => (
                <details key={group} open={names.some((n) => n.toLowerCase() === current?.replace("components-", "")) || undefined}>
                  <summary><NavIcon name={GROUP_ICONS[group]} />{group}</summary>
                  {names.map(byName).filter((p): p is Page => Boolean(p)).map(link)}
                </details>
              ))
            )}
          </div>
        </div>

      </nav>
    </>
  )
}
