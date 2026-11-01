import * as React from "react"
import { createPortal } from "react-dom"
import { createRoot } from "react-dom/client"
import type { API } from "storybook/manager-api"
import { PanelIcon, setNavOpen } from "./nav-state"

/* Search in the sidebar, laid out like Figma's Find: a filled field, a filter
   button with a dark menu, a close button, and an empty panel until something
   is typed. It replaces Storybook's own field (hidden in manager-head.html) and
   reads the same index. The sidebar's tree is hidden while search is open. */

type Scope = "all" | "section"
type Entry = { id: string; type: string; title: string; name: string }
type Result = { id: string; label: string; path: string }

const Glyph = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
)
const SEARCH = "M7 12.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM11 11l3.5 3.5"
const SLIDERS = "M5 1.5v6.2M5 12v2.5M11 1.5V4M11 8.3v6.2M5 12a2.1 2.1 0 1 0 0-4.3A2.1 2.1 0 0 0 5 12ZM11 8.3A2.1 2.1 0 1 0 11 4a2.1 2.1 0 0 0 0 4.3Z"
const CLOSE = "M3.5 3.5l9 9M12.5 3.5l-9 9"
const CHECK = "M3 8.5l3.2 3.2L13 4.5"
const CHEVRON = "M4.5 6.5 8 10l3.5-3.5"
const PAGE = "M4 1.5h5.5L12.5 4.5v10h-8.5zM6.5 7.5h4M6.5 10h4"

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

function find(entries: Entry[], query: string, scope: Scope, matchCase: boolean, wholeWords: boolean) {
  const q = query.trim()
  if (!q) return { results: [] as Result[], re: null }
  const re = new RegExp(wholeWords ? `\\b${escape(q)}\\b` : escape(q), matchCase ? "" : "i")
  const section = document.documentElement.dataset.vvSection === "components" ? "Components" : "Foundations"
  const results = entries
    .filter((e) => e.type === "docs" && (scope === "all" || e.title.startsWith(section)))
    .map((e) => {
      const parts = e.title.split("/")
      return { id: e.id, label: parts[parts.length - 1], path: parts.slice(0, -1).join(" / ") }
    })
    .filter((r) => re.test(r.label))
    .sort((a, b) =>
      Number(!a.label.toLowerCase().startsWith(q.toLowerCase())) - Number(!b.label.toLowerCase().startsWith(q.toLowerCase())) ||
      a.label.localeCompare(b.label),
    )
  return { results, re }
}

function Mark({ text, re }: { text: string; re: RegExp | null }) {
  const m = re && text.match(re)
  if (!m || m.index === undefined) return <>{text}</>
  return <>{text.slice(0, m.index)}<b>{m[0]}</b>{text.slice(m.index + m[0].length)}</>
}

type MenuItem = { label: string; on: boolean; icon?: string; onPick: () => void; role: "menuitemradio" | "menuitemcheckbox" }

/** The dark menu. In a portal, because it reaches past the sidebar's edge. */
function DarkMenu({ anchor, label, groups, onClose }: { anchor: HTMLElement; label: string; groups: MenuItem[][]; onClose: () => void }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const r = anchor.getBoundingClientRect()
  React.useEffect(() => {
    ref.current?.querySelector("button")?.focus()
    const down = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node) && !anchor.contains(e.target as Node)) onClose()
    }
    // A click in the page lands in the preview's iframe: this document only sees itself lose focus.
    document.addEventListener("pointerdown", down)
    window.addEventListener("blur", onClose)
    return () => {
      document.removeEventListener("pointerdown", down)
      window.removeEventListener("blur", onClose)
    }
  }, [anchor, onClose])
  const onKey = (e: React.KeyboardEvent) => {
    const items = Array.from(ref.current?.querySelectorAll("button") ?? [])
    const i = items.indexOf(document.activeElement as HTMLButtonElement)
    if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length]?.focus() }
    else if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length]?.focus() }
    else if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); onClose(); anchor.focus() }
    else if (e.key === "Tab") onClose()
  }
  return createPortal(
    <div ref={ref} role="menu" aria-label={label} className="vv-find-menu" style={{ top: r.bottom + 6, left: r.left }} onKeyDown={onKey}>
      {groups.map((items, g) => (
        <div key={g} role="group" className="vv-find-menu__group">
          {items.map((it) => (
            <button key={it.label} type="button" role={it.role} aria-checked={it.on} onClick={it.onPick}>
              <span className="vv-find-menu__check">{it.on && <Glyph d={CHECK} />}</span>
              {it.icon && <Glyph d={it.icon} />}
              {it.label}
            </button>
          ))}
        </div>
      ))}
    </div>,
    document.body,
  )
}

function Find({ api }: { api: API }) {
  const [open, setOpen] = React.useState(false)
  const [text, setText] = React.useState("")
  const [scope, setScope] = React.useState<Scope>("all")
  const [matchCase, setMatchCase] = React.useState(false)
  const [wholeWords, setWholeWords] = React.useState(false)
  const [menu, setMenu] = React.useState<"filter" | "scope" | null>(null)
  const [active, setActive] = React.useState(0)
  const root = React.useRef<HTMLDivElement>(null)
  const input = React.useRef<HTMLInputElement>(null)
  const filterBtn = React.useRef<HTMLButtonElement>(null)
  const scopeBtn = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    document.documentElement.dataset.vvFind = open ? "open" : "closed"
  }, [open])

  const entries = React.useMemo(
    () => (open ? (Object.values(api.getIndex()?.entries ?? {}) as unknown as Entry[]) : []),
    [api, open],
  )
  const { results, re } = React.useMemo(() => find(entries, text, scope, matchCase, wholeWords), [entries, text, scope, matchCase, wholeWords])
  const shown = results.slice(0, 100)
  const filtered = matchCase || wholeWords
  const scopeLabel = scope === "all" ? "All sections" : "This section"

  const close = () => {
    setOpen(false)
    setText("")
    setMenu(null)
    setActive(0)
  }
  const go = (r: Result) => api.navigate(`/docs/${r.id}`)

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); close() }
    else if ((e.key === "ArrowDown" || e.key === "ArrowUp") && shown.length) {
      e.preventDefault()
      setActive((active + (e.key === "ArrowDown" ? 1 : -1) + shown.length) % shown.length)
    } else if (e.key === "Enter" && shown[active]) {
      e.preventDefault()
      go(shown[active])
    }
  }

  // Leaving an empty search returns to the tree; a search with text stays up.
  const onBlur = (e: React.FocusEvent) => {
    const to = e.relatedTarget as Node | null
    if (!text.trim() && !menu && !root.current?.contains(to) && !(to as Element | null)?.closest?.(".vv-find-menu")) setOpen(false)
  }

  return (
    <div ref={root} className="vv-find" onBlur={onBlur}>
      <div className="vv-find__bar">
        <label className="vv-find__field">
          <Glyph d={SEARCH} />
          <input
            ref={input}
            role="combobox"
            aria-label="Find"
            aria-expanded={open && shown.length > 0}
            aria-controls={open ? "vv-find-results" : undefined}
            aria-activedescendant={shown[active] ? `vv-find-${shown[active].id}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
            placeholder="Find..."
            value={text}
            onFocus={() => setOpen(true)}
            onChange={(e) => { setText(e.target.value); setOpen(true); setActive(0) }}
            onKeyDown={onKey}
          />
        </label>
        <button
          ref={filterBtn}
          type="button"
          className="vv-find__icon"
          data-on={menu === "filter" || filtered || undefined}
          aria-label="Filters"
          aria-haspopup="menu"
          aria-expanded={menu === "filter"}
          onClick={() => { setOpen(true); setMenu(menu === "filter" ? null : "filter") }}
        >
          <Glyph d={SLIDERS} />
        </button>
        {open ? (
          <button type="button" className="vv-find__icon" aria-label="Close search" onClick={close}>
            <Glyph d={CLOSE} />
          </button>
        ) : (
          <button type="button" className="vv-find__icon" aria-label="Hide menu" title="Hide menu" onClick={() => setNavOpen(false)}>
            <PanelIcon open />
          </button>
        )}
      </div>

      {open && text.trim() && (
        <div className="vv-find__status">
          <span role="status">{results.length === 0 ? "No results" : `${results.length} ${results.length === 1 ? "result" : "results"}`}</span>
          <span aria-hidden="true">·</span>
          <button ref={scopeBtn} type="button" aria-haspopup="menu" aria-expanded={menu === "scope"} onClick={() => setMenu(menu === "scope" ? null : "scope")}>
            {scopeLabel}
            <Glyph d={CHEVRON} size={12} />
          </button>
        </div>
      )}

      {open && (
        <ul id="vv-find-results" role="listbox" aria-label="Results" className="vv-find__results">
          {shown.map((r, i) => (
            <li
              key={r.id}
              id={`vv-find-${r.id}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => go(r)}
            >
              <Glyph d={PAGE} />
              <span>
                <span className="vv-find__label"><Mark text={r.label} re={re} /></span>
                <span className="vv-find__path">{r.path}</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {menu === "filter" && filterBtn.current && (
        <DarkMenu
          anchor={filterBtn.current}
          label="Filters"
          onClose={() => setMenu(null)}
          groups={[
            [
              { label: "Match case", role: "menuitemcheckbox", on: matchCase, onPick: () => setMatchCase(!matchCase) },
              { label: "Whole words", role: "menuitemcheckbox", on: wholeWords, onPick: () => setWholeWords(!wholeWords) },
            ],
          ]}
        />
      )}
      {menu === "scope" && scopeBtn.current && (
        <DarkMenu
          anchor={scopeBtn.current}
          label="Where to search"
          onClose={() => setMenu(null)}
          groups={[[
            { label: "This section", role: "menuitemradio", on: scope === "section", onPick: () => { setScope("section"); setMenu(null); input.current?.focus() } },
            { label: "All sections", role: "menuitemradio", on: scope === "all", onPick: () => { setScope("all"); setMenu(null); input.current?.focus() } },
          ]]}
        />
      )}
    </div>
  )
}

/** Keeps the search in place: Storybook remounts the sidebar on phones and
 *  when the layout changes, so the host goes back in whenever it falls out. */
export function mountSearch(api: API) {
  const host = document.createElement("div")
  host.id = "vv-find"
  createRoot(host).render(<Find api={api} />)
  const place = () => {
    const native = document.querySelector(".search-field")
    const anchor = native?.closest("form") ?? native
    if (anchor?.parentNode && host.nextSibling !== anchor) anchor.parentNode.insertBefore(host, anchor)
    // When the index fails, the page itself explains it; Storybook's own note goes.
    const tree = document.querySelector<HTMLElement>("#storybook-explorer-tree")
    if (tree && tree.childElementCount < 4 && tree.textContent?.includes("Something went wrong")) tree.style.display = "none"
  }
  new MutationObserver(place).observe(document.body, { childList: true, subtree: true })
  place()
}
