import {
  cloneElement,
  useEffect,
  useId,
  useLayoutEffect,
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

  // A narrow screen or a clipping container gets a narrower panel, 16px clear of its edge.
  // It is measured again whenever that container changes size.
  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!open || !panel) return
    let clip: HTMLElement | null = panel.parentElement
    while (clip && getComputedStyle(clip).overflowX === "visible") clip = clip.parentElement
    const fit = () => {
      const box = clip?.getBoundingClientRect()
      const left = Math.max(0, box?.left ?? 0)
      const right = Math.min(document.documentElement.clientWidth, box?.right ?? Infinity)
      const anchor = panel.parentElement!.getBoundingClientRect()
      const s = getComputedStyle(panel)
      const frame = ["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"].reduce((sum, k) => sum + parseFloat(s[k as "paddingLeft"]), 0)
      const room = (align === "start" ? right - 16 - anchor.left : anchor.right - left - 16) - frame
      panel.style.maxWidth = room < width ? `${Math.max(room, 160)}px` : ""
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(clip ?? document.documentElement)
    window.addEventListener("resize", fit)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", fit)
    }
  }, [open, align, width])

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
