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

export const PanelIcon = ({ open: on }: { open: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
    <rect x="1.5" y="2.5" width="13" height="11" rx="2" />
    <path d="M6 2.5v11" />
    {on && <path d="M1.5 4.5a2 2 0 0 1 2-2H6v11H3.5a2 2 0 0 1-2-2z" fill="currentColor" />}
  </svg>
)
