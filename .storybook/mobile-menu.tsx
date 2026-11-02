import * as React from "react"
import type { API } from "storybook/manager-api"
import { GROUPS } from "../src/docs/groups"
import { GROUP_ICONS, NavIcon, PAGE_ICONS } from "./nav-icons"
import { PanelIcon } from "./nav-state"

/* The phone menu: a panel from the right, under the header and its section tabs, opened by
   the navigation button. It replaces Storybook's bottom bar and its drawer, and holds search
   and the pages of the open section. */

type Page = { id: string; title: string }

const pagesOf = (api: API): Page[] =>
  (Object.values(api.getIndex()?.entries ?? {}) as unknown as { id: string; type: string; title: string }[])
    .filter((e) => e.type === "docs")
    .map((e) => ({ id: e.id, title: e.title }))

const leaf = (title: string) => title.split("/").pop() ?? title

/** The phone's navigation button, beside the theme button in the header. */
export function PanelButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  const label = open ? "Close navigation" : "Open navigation"
  return (
    <button type="button" className="vv-header__panel" aria-label={label} title={label} aria-expanded={open} aria-controls="vv-drawer" onClick={onClick}>
      <PanelIcon open={open} side="right" />
    </button>
  )
}

export function MobileMenu({ api, open, path, section, onClose }: {
  api: API
  open: boolean
  path: string | undefined
  section: string
  onClose: () => void
}) {
  const tab = section
  const [text, setText] = React.useState("")
  const pages = React.useMemo(() => (open ? pagesOf(api) : []), [api, open])
  const current = path?.split("/").pop()?.replace(/--.*$/, "")

  React.useEffect(() => {
    if (open) setText("")
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

  const go = (e: React.MouseEvent, to: string) => {
    if (e.metaKey || e.ctrlKey) return
    e.preventDefault()
    api.navigate(to)
    onClose()
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
      <div className="vv-drawer__scrim" data-open={open || undefined} onClick={onClose} />
      <nav id="vv-drawer" className="vv-drawer" data-open={open || undefined} aria-label="Menu">
        <div className="vv-drawer__body">

          {/* Stays at the top of the panel while the list scrolls under it. */}
          <div className="vv-drawer__findbar">
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
