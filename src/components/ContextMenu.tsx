import { useEffect, useRef, useState, type ReactNode } from "react"
import "./ContextMenu.css"

export type ContextMenuItem = { id: string; label: string; destructive?: boolean; disabled?: boolean }

export type ContextMenuProps = {
  /** Names the area the menu belongs to. */
  label: string
  items: ContextMenuItem[]
  onSelect: (id: string) => void
  children: ReactNode
  /** Start open, for documentation. */
  defaultOpen?: boolean
}

/** A menu on right click in an area. The area is focusable, so the Menu key and
 *  Shift+F10 open it too. ↑/↓ move, Esc closes and returns focus. */
export function ContextMenu({ label, items, onSelect, children, defaultOpen = false }: ContextMenuProps) {
  const [at, setAt] = useState<{ x: number; y: number } | null>(defaultOpen ? { x: 16, y: 16 } : null)
  const zone = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLDivElement>(null)

  const buttons = () => Array.from(list.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? [])
  const close = (refocus = true) => { setAt(null); if (refocus) zone.current?.focus() }

  useEffect(() => {
    if (!at) return
    if (!defaultOpen) buttons()[0]?.focus()
    const onDown = (e: PointerEvent) => { if (!list.current?.contains(e.target as Node)) setAt(null) }
    document.addEventListener("pointerdown", onDown)
    return () => document.removeEventListener("pointerdown", onDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [at])

  const onListKey = (e: React.KeyboardEvent) => {
    const b = buttons()
    const i = b.indexOf(document.activeElement as HTMLButtonElement)
    if (e.key === "ArrowDown") { e.preventDefault(); b[(i + 1) % b.length]?.focus() }
    else if (e.key === "ArrowUp") { e.preventDefault(); b[(i - 1 + b.length) % b.length]?.focus() }
    else if (e.key === "Escape") { e.preventDefault(); close() }
    else if (e.key === "Tab") close(false)
  }

  return (
    <div
      ref={zone}
      role="group"
      aria-label={label}
      tabIndex={0}
      className="vv-context-zone"
      onContextMenu={(e) => {
        e.preventDefault()
        const r = zone.current!.getBoundingClientRect()
        setAt({ x: e.clientX - r.left, y: e.clientY - r.top })
      }}
      onKeyDown={(e) => {
        if (e.target === zone.current && (e.key === "ContextMenu" || (e.shiftKey && e.key === "F10"))) { e.preventDefault(); setAt({ x: 16, y: 16 }) }
      }}
    >
      {children}
      {at && (
        <div ref={list} role="menu" aria-label={label} className="vv-context-menu" style={{ left: at.x, top: at.y }} onKeyDown={onListKey}>
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              role="menuitem"
              disabled={it.disabled}
              className={it.destructive ? "vv-context-menu__item vv-context-menu__item--destructive" : "vv-context-menu__item"}
              onClick={() => { onSelect(it.id); close() }}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
