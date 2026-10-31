import { useEffect, useRef, useState } from "react"
import { Icon } from "./Icon.js"
import "./NavigationMenu.css"

export type NavigationLink = { label: string; href: string; description?: string }
export type NavigationEntry = { label: string; href?: string; current?: boolean; links?: NavigationLink[] }

export type NavigationMenuProps = {
  /** Names the landmark. */
  label: string
  entries: NavigationEntry[]
}

/** Site navigation with panels of links. An entry with links is a disclosure
 *  button: it opens on click, Esc closes it and returns focus. */
export function NavigationMenu({ label, entries }: NavigationMenuProps) {
  const [open, setOpen] = useState<string | null>(null)
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(null) }
    document.addEventListener("pointerdown", onDown)
    return () => document.removeEventListener("pointerdown", onDown)
  }, [open])

  return (
    <nav ref={root} aria-label={label} className="vv-navmenu">
      <ul className="vv-navmenu__list">
        {entries.map((e) => (
          <li
            key={e.label}
            className="vv-navmenu__entry"
            onKeyDown={(k) => {
              if (k.key === "Escape" && open === e.label) { setOpen(null); (k.currentTarget.querySelector("button") as HTMLButtonElement)?.focus() }
            }}
          >
            {e.links ? (
              <>
                <button type="button" className="vv-navmenu__top" aria-expanded={open === e.label} onClick={() => setOpen(open === e.label ? null : e.label)}>
                  {e.label}
                  <Icon name="chevron-down-sm" size={16} />
                </button>
                {open === e.label && (
                  <ul className="vv-navmenu__panel">
                    {e.links.map((l) => (
                      <li key={l.label}>
                        <a href={l.href} className="vv-navmenu__link">
                          <span className="vv-navmenu__link-title">{l.label}</span>
                          {l.description && <span className="vv-navmenu__link-desc">{l.description}</span>}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <a href={e.href} className="vv-navmenu__top" aria-current={e.current ? "page" : undefined}>{e.label}</a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
