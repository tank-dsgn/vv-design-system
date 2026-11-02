import * as React from "react"
import { ICONS, type IconName } from "../src/icons/icons"

/* One icon per menu item, shared by the sidebar, its folded rail and the phone menu.
   All Lucide at 16px, the weight of the panel and search icons above them. */

export const PAGE_ICONS: Record<string, IconName> = {
  Tokens: "braces",
  Colors: "palette",
  Theming: "swatch-book",
  Typography: "type",
  "Spacing & Size": "ruler",
  "Border and Corner": "square",
  "Shadows & Elevation": "layers",
  "Breakpoints & Grids": "layout-grid",
  Motion: "zap",
  Icons: "shapes",
  "Theme mode": "moon",
}

export const GROUP_ICONS: Record<string, IconName> = {
  Actions: "mouse-pointer-click",
  Forms: "text-cursor-input",
  Navigation: "compass",
  Feedback: "bell",
  Overlays: "layers-2",
  Content: "layout-list",
  Data: "chart-column",
}

// The manager's bundle needs React in scope, so it draws the set itself instead of importing Icon.
export const NavIcon = ({ name }: { name: IconName }) => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[name] }} />
)

/** The sidebar's label: Storybook's own icon per node type is hidden in manager-head.html. */
export function navLabel(item: { id: string; name: string; type: string }) {
  const icon = item.type === "group" ? GROUP_ICONS[item.name] : item.id.startsWith("components-") ? "component" : PAGE_ICONS[item.name]
  if (!icon) return undefined
  return (
    <span className="vv-nav-label">
      <NavIcon name={icon} />
      {item.name}
    </span>
  )
}
