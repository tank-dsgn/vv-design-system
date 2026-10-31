import {
  cloneElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react"
import "./Menu.css"

export type MenuItem = {
  id: string
  label: string
  icon?: ReactNode
  /** Shown on the right, e.g. `⌘D`. Display only — wiring the key is the app's job. */
  shortcut?: string
  destructive?: boolean
  disabled?: boolean
}

export type MenuSection = { title?: string; items: MenuItem[] }

export type MenuProps = {
  /** A button that opens the menu. It receives the ref, the click handler
   *  and the ARIA attributes. */
  trigger: ReactElement<Record<string, unknown>>
  sections: MenuSection[]
  onSelect: (id: string) => void
  align?: "start" | "end"
  /** Start open, for documentation. */
  defaultOpen?: boolean
}

/** A list of actions behind a button.
 *
 *  Follows the WAI-ARIA menu button pattern: Enter, Space or ↓ open it with
 *  focus on the first item; ↑/↓ move, Home/End jump, typing a letter jumps to
 *  the next item starting with it; Esc closes and returns focus to the
 *  trigger; Tab closes it and moves on. Disabled items are skipped. */
export function Menu({ trigger, sections, onSelect, align = "start", defaultOpen = false }: MenuProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  const triggerRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const items = () =>
    Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? [])

  const focusAt = (i: number) => {
    const list = items()
    if (!list.length) return
    list[(i + list.length) % list.length].focus()
  }

  const close = (returnFocus = true) => {
    setOpen(false)
    if (returnFocus) triggerRef.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    if (!defaultOpen || document.activeElement === triggerRef.current) focusAt(0)
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (!listRef.current?.contains(t) && !triggerRef.current?.contains(t)) close(false)
    }
    document.addEventListener("pointerdown", onDown)
    return () => document.removeEventListener("pointerdown", onDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onListKey = (e: React.KeyboardEvent) => {
    const list = items()
    const i = list.indexOf(document.activeElement as HTMLButtonElement)
    if (e.key === "ArrowDown") { e.preventDefault(); focusAt(i + 1) }
    else if (e.key === "ArrowUp") { e.preventDefault(); focusAt(i - 1) }
    else if (e.key === "Home") { e.preventDefault(); focusAt(0) }
    else if (e.key === "End") { e.preventDefault(); focusAt(list.length - 1) }
    else if (e.key === "Escape") { e.preventDefault(); close() }
    else if (e.key === "Tab") close(false)
    else if (e.key.length === 1 && /\S/.test(e.key)) {
      const k = e.key.toLowerCase()
      const order = [...list.slice(i + 1), ...list.slice(0, i + 1)]
      order.find((el) => el.textContent?.trim().toLowerCase().startsWith(k))?.focus()
    }
  }

  const triggerEl = cloneElement(trigger, {
    ref: triggerRef as Ref<HTMLElement>,
    "aria-haspopup": "menu",
    "aria-expanded": open,
    "aria-controls": id,
    onClick: () => setOpen((o) => !o),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault()
        setOpen(true)
      }
    },
  })

  return (
    <span className="vv-menu-anchor">
      {triggerEl}
      {open && (
        <div
          ref={listRef}
          id={id}
          role="menu"
          aria-orientation="vertical"
          className={`vv-menu vv-menu--${align}`}
          onKeyDown={onListKey}
        >
          {sections.map((s, si) => (
            <div key={si} role="group" aria-label={s.title} className="vv-menu__section">
              {s.title && <div className="vv-menu__title" aria-hidden="true">{s.title}</div>}
              {s.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="menuitem"
                  tabIndex={-1}
                  disabled={item.disabled}
                  className={`vv-menu__item${item.destructive ? " vv-menu__item--destructive" : ""}`}
                  onClick={() => {
                    onSelect(item.id)
                    close()
                  }}
                >
                  {item.icon && <span className="vv-menu__icon" aria-hidden="true">{item.icon}</span>}
                  <span className="vv-menu__label">{item.label}</span>
                  {item.shortcut && <span className="vv-menu__shortcut" aria-hidden="true">{item.shortcut}</span>}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </span>
  )
}
