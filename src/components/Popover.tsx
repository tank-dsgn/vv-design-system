import {
  cloneElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react"
import "./Popover.css"

export type PopoverProps = {
  /** The button that opens it. Receives the ref, click handler and ARIA. */
  trigger: ReactElement<Record<string, unknown>>
  /** Names the popover for screen readers; shown as its heading. */
  title: string
  children: ReactNode
  align?: "start" | "end"
  placement?: "bottom" | "top"
  defaultOpen?: boolean
  width?: number
}

/** Rich, interactive content anchored to a button — a filter form, a
 *  colour picker, a short explanation with a link. Non-modal: the page stays
 *  usable. Focus moves in on open; Esc or a click outside closes it and focus
 *  returns to the trigger. For a plain label, use Tooltip; for actions, Menu. */
export function Popover({ trigger, title, children, align = "start", placement = "bottom", defaultOpen = false, width = 320 }: PopoverProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  const triggerRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = (returnFocus = true) => {
    setOpen(false)
    if (returnFocus) triggerRef.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    if (!defaultOpen) panelRef.current?.focus()
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (!panelRef.current?.contains(t) && !triggerRef.current?.contains(t)) close(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    document.addEventListener("pointerdown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onDown)
      document.removeEventListener("keydown", onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <span className="vv-popover-anchor">
      {cloneElement(trigger, {
        ref: triggerRef as Ref<HTMLElement>,
        "aria-haspopup": "dialog",
        "aria-expanded": open,
        "aria-controls": id,
        onClick: () => setOpen((o) => !o),
      })}
      {open && (
        <div
          ref={panelRef}
          id={id}
          role="dialog"
          aria-labelledby={`${id}-title`}
          tabIndex={-1}
          className={`vv-popover vv-popover--${align} vv-popover--${placement}`}
          style={{ width }}
        >
          <p id={`${id}-title`} className="vv-popover__title">{title}</p>
          <div className="vv-popover__body">{children}</div>
        </div>
      )}
    </span>
  )
}
