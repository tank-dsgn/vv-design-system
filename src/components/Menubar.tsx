import { useRef, useState } from "react"
import { Kbd } from "./Kbd.js"
import "./Menubar.css"

export type MenubarItem = { id: string; label: string; shortcut?: string; disabled?: boolean }
export type MenubarMenu = { label: string; items: MenubarItem[] }

export type MenubarProps = {
  /** Names the bar for screen readers. */
  label: string
  menus: MenubarMenu[]
  onSelect: (id: string) => void
  /** Index of a menu to start open, for documentation. */
  defaultOpen?: number
}

/** A row of menus, as at the top of a desktop tool. Follows the WAI-ARIA menubar
 *  pattern: one tab stop, ←/→ between menus, ↓ opens, ↑/↓ inside, Esc closes. */
export function Menubar({ label, menus, onSelect, defaultOpen }: MenubarProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null)
  const [focus, setFocus] = useState(defaultOpen ?? 0)
  const root = useRef<HTMLDivElement>(null)

  const top = (i: number) => root.current?.querySelectorAll<HTMLButtonElement>('[role="menubar"] > button')[i]
  const inner = () => Array.from(root.current?.querySelectorAll<HTMLButtonElement>('[role="menu"] button:not(:disabled)') ?? [])
  const moveTop = (i: number) => {
    const n = (i + menus.length) % menus.length
    setFocus(n)
    top(n)?.focus()
    if (open !== null) setOpen(n)
  }
  const openAt = (i: number) => { setOpen(i); setFocus(i); requestAnimationFrame(() => inner()[0]?.focus()) }

  return (
    <div ref={root} className="vv-menubar-wrap" onBlur={(e) => { if (!root.current?.contains(e.relatedTarget as Node)) setOpen(null) }}>
      <div role="menubar" aria-label={label} className="vv-menubar">
      {menus.map((m, i) => (
        <button
          key={m.label}
          type="button"
          role="menuitem"
          aria-haspopup="menu"
          aria-expanded={open === i}
          tabIndex={focus === i ? 0 : -1}
          className="vv-menubar__top"
          onClick={() => (open === i ? setOpen(null) : openAt(i))}
          onMouseEnter={() => { if (open !== null && open !== i) { setOpen(i); setFocus(i) } }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); moveTop(i + 1) }
            else if (e.key === "ArrowLeft") { e.preventDefault(); moveTop(i - 1) }
            else if (e.key === "ArrowDown") { e.preventDefault(); openAt(i) }
          }}
        >
          {m.label}
        </button>
      ))}
      </div>
      {open !== null && (
        <div
          role="menu"
          aria-label={menus[open].label}
          className="vv-menubar__menu"
          style={{ left: top(open)?.offsetLeft }}
          onKeyDown={(e) => {
            const list = inner()
            const i = list.indexOf(document.activeElement as HTMLButtonElement)
            if (e.key === "ArrowDown") { e.preventDefault(); list[(i + 1) % list.length]?.focus() }
            else if (e.key === "ArrowUp") { e.preventDefault(); list[(i - 1 + list.length) % list.length]?.focus() }
            else if (e.key === "Escape") { e.preventDefault(); setOpen(null); top(focus)?.focus() }
            else if (e.key === "ArrowRight") { e.preventDefault(); const n = (open + 1) % menus.length; top(n)?.focus(); openAt(n) }
            else if (e.key === "ArrowLeft") { e.preventDefault(); const n = (open - 1 + menus.length) % menus.length; top(n)?.focus(); openAt(n) }
          }}
        >
          {menus[open].items.map((it) => (
            <button key={it.id} type="button" role="menuitem" tabIndex={-1} disabled={it.disabled} className="vv-menubar__item" onClick={() => { onSelect(it.id); setOpen(null); top(focus)?.focus() }}>
              <span>{it.label}</span>
              {it.shortcut && <Kbd>{it.shortcut}</Kbd>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
