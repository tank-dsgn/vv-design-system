import type { ReactNode } from "react"
import "./TopNav.css"

export type TopNavItem = {
  id: string
  label: string
  icon?: ReactNode
}

export type TopNavProps = {
  items: TopNavItem[]
  current: string
  onNavigate: (id: string) => void
  "aria-label": string
}

/** Primary navigation across the top of the app.
 *
 *  A `nav` with a list of buttons, not a tablist: these switch whole pages,
 *  and a screen reader should announce "navigation, 5 items" rather than
 *  promise tab panels that are not there. The current page is marked with
 *  `aria-current="page"` — the pill is only its picture. */
export function TopNav({
  items,
  current,
  onNavigate,
  "aria-label": ariaLabel,
}: TopNavProps) {
  return (
    <nav aria-label={ariaLabel}>
      <ul className="vv-topnav__list">
        {items.map((item) => (
          <li key={item.id}>
            <button
              className="vv-topnav__item"
              type="button"
              aria-current={item.id === current ? "page" : undefined}
              // Narrow screens hide the text label; this keeps the name.
              aria-label={item.label}
              onClick={() => onNavigate(item.id)}
            >
              {item.icon}
              <span className="vv-topnav__label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
