import type { ReactNode } from "react"
import "./Sidebar.css"

export type SidebarItem = {
  id: string
  label: string
  icon?: ReactNode
}

export type SidebarGroup = {
  title?: string
  items: SidebarItem[]
}

export type SidebarProps = {
  groups: SidebarGroup[]
  current: string
  onNavigate: (id: string) => void
  collapsed?: boolean
  "aria-label": string
  /** Above the navigation — usually the product mark. */
  header?: ReactNode
  /** Pinned to the bottom — secondary links and the signed-in user. Kept
   *  outside the `nav`: a profile is not a destination. */
  footer?: ReactNode
}

export function Sidebar({
  groups,
  current,
  onNavigate,
  collapsed = false,
  "aria-label": ariaLabel,
  header,
  footer,
}: SidebarProps) {
  return (
    <div className={`vv-sidebar vv-sidebar--${collapsed ? "collapsed" : "expanded"}`}>
      {header && <div className="vv-sidebar__header">{header}</div>}
      <nav className="vv-sidebar__nav" aria-label={ariaLabel}>
        {groups.map((group, i) => (
          <div className="vv-sidebar__group" key={group.title ?? i}>
            {/* When collapsed the group heading is hidden visually but not from a
                screen reader: groups are how it navigates. */}
            {group.title && !collapsed && (
              <span className="vv-sidebar__group-title">{group.title}</span>
            )}
            {group.items.map((item) => (
              <button
                key={item.id}
                className="vv-sidebar__item"
                type="button"
                aria-current={item.id === current ? "page" : undefined}
                // A collapsed item is an icon with no label. Without title and
                // aria-label it reads as just "button" to mouse and screen
                // reader alike.
                title={collapsed ? item.label : undefined}
                aria-label={collapsed ? item.label : undefined}
                onClick={() => onNavigate(item.id)}
              >
                {item.icon && (
                  <span className="vv-sidebar__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                {!collapsed && item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>
      {footer && <div className="vv-sidebar__footer">{footer}</div>}
    </div>
  )
}
