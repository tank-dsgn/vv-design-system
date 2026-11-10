import * as React from "react"
import { ICONS, type IconName } from "../src/icons/icons"
import { NAV_ICONS, type NavIconName } from "./nav-icons.gen"

/* One icon per menu item, shared by the sidebar, its folded rail and the phone menu.
   Phosphor Regular at 16px, from scripts/build-icons.py. */

export const PAGE_ICONS: Record<string, NavIconName> = {
  Tokens: "brackets-curly",
  Colors: "palette",
  Typography: "text-t",
  "Spacing & Size": "ruler",
  "Border and Corner": "square",
  "Shadows & Elevation": "stack",
  "Breakpoints & Grids": "squares-four",
  Motion: "lightning",
  Icons: "shapes",
  Theming: "swatches",
}

export const GROUP_ICONS: Record<string, NavIconName> = {
  Actions: "cursor-click",
  Forms: "textbox",
  Navigation: "compass",
  Feedback: "bell",
  Overlays: "stack-simple",
  Content: "list-dashes",
  Data: "chart-bar",
}

// The manager's bundle needs React in scope, so it draws the icons itself instead of importing Icon.
export const NavIcon = ({ name, size = 16 }: { name: NavIconName | IconName; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" dangerouslySetInnerHTML={{ __html: name in NAV_ICONS ? NAV_ICONS[name as NavIconName] : ICONS[name as IconName] }} />
)

/** The sidebar's label: Storybook's own icon per node type is hidden in manager-head.html. */
export function navLabel(item: { id: string; name: string; type: string }) {
  const icon = item.type === "group" ? GROUP_ICONS[item.name] : item.id.startsWith("components-") ? "diamonds-four" : PAGE_ICONS[item.name]
  if (!icon) return undefined
  return (
    <span className="vv-nav-label">
      <NavIcon name={icon} />
      {item.name}
    </span>
  )
}
