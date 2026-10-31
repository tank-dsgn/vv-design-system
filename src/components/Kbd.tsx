import type { ReactNode } from "react"
import "./Kbd.css"

export type KbdSize = "sm" | "md"

export type KbdProps = {
  /** One key or a short chord, e.g. `⌘K`. */
  children: ReactNode
  size?: KbdSize
}

/** A keyboard key or shortcut, shown inline next to the action it triggers. */
export function Kbd({ children, size = "md" }: KbdProps) {
  return <kbd className={`vv-kbd vv-kbd--${size}`}>{children}</kbd>
}
