import {
  cloneElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react"
import "./Tooltip.css"

export type TooltipPlacement = "top" | "bottom" | "left" | "right"

export type TooltipProps = {
  /** Supplementary text. Never the only place important information lives. */
  content: ReactNode
  placement?: TooltipPlacement
  /** A single focusable element: a button, a link, an icon button. */
  children: ReactElement<Record<string, unknown>>
  /** Show it now, regardless of hover and focus. For documentation. */
  open?: boolean
}

/** A short label that appears on hover and on keyboard focus.
 *
 *  The text is linked to the trigger with `aria-describedby`, so a screen
 *  reader hears it after the trigger's name. Esc hides it without moving
 *  focus. It opens after a short rest of the pointer, so sweeping across a
 *  toolbar does not flash a row of tooltips. */
export function Tooltip({ content, placement = "top", children, open }: TooltipProps) {
  const id = useId()
  const [shown, setShown] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const visible = open ?? shown

  const delay = () => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--delay-tooltip")
    return parseFloat(raw) || 400
  }
  const show = (now = false) => {
    window.clearTimeout(timer.current)
    if (now) setShown(true)
    else timer.current = window.setTimeout(() => setShown(true), delay())
  }
  const hide = () => {
    window.clearTimeout(timer.current)
    setShown(false)
  }

  useEffect(() => () => window.clearTimeout(timer.current), [])
  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && hide()
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [visible])

  const describedBy = [children.props["aria-describedby"], id].filter(Boolean).join(" ")

  return (
    <span
      className="vv-tooltip-anchor"
      onPointerEnter={() => show()}
      onPointerLeave={hide}
      onFocus={() => show(true)}
      onBlur={hide}
    >
      {cloneElement(children, { "aria-describedby": describedBy, title: undefined })}
      <span
        id={id}
        role="tooltip"
        className={`vv-tooltip vv-tooltip--${placement}`}
        data-open={visible || undefined}
      >
        {content}
      </span>
    </span>
  )
}
