import type { ReactNode } from "react"
import "./ScrollArea.css"

export type ScrollAreaProps = {
  /** Names the region: it takes keyboard focus so it can scroll with arrows. */
  label: string
  /** Height of the visible area in px. */
  maxHeight?: number
  children: ReactNode
}

/** A region with its own scroll, reachable from the keyboard. */
export function ScrollArea({ label, maxHeight = 240, children }: ScrollAreaProps) {
  return <div role="region" aria-label={label} tabIndex={0} className="vv-scroll-area" style={{ maxHeight }}>{children}</div>
}
