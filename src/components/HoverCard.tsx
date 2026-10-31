import { useEffect, useId, useRef, useState, type ReactNode } from "react"
import "./HoverCard.css"

export type HoverCardProps = {
  /** A link or a name in text. */
  trigger: ReactNode
  /** A preview of what the trigger points to. Nothing essential or clickable. */
  children: ReactNode
  /** Start open, for documentation. */
  defaultOpen?: boolean
}

/** A preview of a linked object on hover and keyboard focus, after a brief
 *  pause. Esc hides it. */
export function HoverCard({ trigger, children, defaultOpen = false }: HoverCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  const timer = useRef<number | undefined>(undefined)
  const show = () => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(true), 300) }
  const hide = () => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(false), 100) }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])
  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <span className="vv-hover-card" onMouseEnter={show} onMouseLeave={hide} onFocus={() => setOpen(true)} onBlur={hide} aria-describedby={open ? id : undefined}>
      {trigger}
      {open && <span id={id} role="tooltip" className="vv-hover-card__panel">{children}</span>}
    </span>
  )
}
