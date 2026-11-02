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

/** The panel and an arrow: which way it goes. `right` is the phone's panel, which slides in from the right. */
export const PanelIcon = ({ open: on, side = "left" }: { open: boolean; side?: "left" | "right" }) => side === "right" ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M15 3v18" />
    <path d={on ? "m8 9 3 3-3 3" : "m10 15-3-3 3-3"} />
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18" />
    <path d={on ? "m16 15-3-3 3-3" : "m14 9 3 3-3 3"} />
  </svg>
)
