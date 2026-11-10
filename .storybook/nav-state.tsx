import * as React from "react"

/* Whether the sidebar is full or folded to its icon rail. Shared by the button in
   the search row, the rail, and manager-head.html through a data attribute. */
const KEY = "vv-nav"
const read = () => {
  try { return localStorage.getItem(KEY) !== "closed" } catch { return true }
}

let open = read()
const listeners = new Set<() => void>()
document.documentElement.dataset.vvNav = open ? "open" : "closed"

export function setNavOpen(next: boolean) {
  open = next
  try { localStorage.setItem(KEY, next ? "open" : "closed") } catch { /* the choice just won't persist */ }
  const root = document.documentElement
  root.dataset.vvNav = next ? "open" : "closed"
  root.dataset.vvNavMoving = "true"
  window.setTimeout(() => delete root.dataset.vvNavMoving, 260)
  listeners.forEach((l) => l())
}

export const useNavOpen = () =>
  React.useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => { listeners.delete(l) }
    },
    () => open,
  )

/* Phosphor's sidebar-simple with a caret drawn at Phosphor's weight (16 on its 256 grid), so it
   matches the menu icons. The caret shows which way the panel goes. `right` is the phone's panel,
   which slides in from the right: the same drawing, mirrored. */
const SIDEBAR = "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H80V200H40ZM216,200H96V56H216V200Z"
export const PanelIcon = ({ open: on, side = "left" }: { open: boolean; side?: "left" | "right" }) => (
  <svg width={side === "right" ? 18 : 16} height={side === "right" ? 18 : 16} viewBox="0 0 256 256" aria-hidden="true" style={side === "right" ? { transform: "scaleX(-1)" } : undefined}>
    <path d={SIDEBAR} fill="currentColor" />
    <path d={on ? "M172,100l-28,28,28,28" : "M144,100l28,28-28,28"} fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
