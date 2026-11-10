import type { ReactNode } from "react"
import { Icon } from "./Icon.js"
import "./Toast.css"

export type ToastTone = "neutral" | "success" | "critical"

export type ToastProps = {
  tone?: ToastTone
  children: ReactNode
  /** One short action, e.g. Undo. */
  action?: { label: string; onClick: () => void }
  onDismiss?: () => void
}

const Glyph = ({ tone }: { tone: ToastTone }) =>
  tone === "neutral" ? null : (
    <span className="vv-toast__glyph"><Icon name={tone === "success" ? "success" : "error"} /></span>
  )

/** A brief confirmation of something the user just did. */
export function Toast({ tone = "neutral", children, action, onDismiss }: ToastProps) {
  return (
    <div className={`vv-toast vv-toast--${tone}`}>
      <Glyph tone={tone} />
      <div className="vv-toast__text">{children}</div>
      {action && (
        <button type="button" className="vv-toast__action" onClick={action.onClick}>
          {action.label}
        </button>
      )}
      {onDismiss && (
        <button type="button" className="vv-toast__dismiss" onClick={onDismiss} aria-label="Dismiss">
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  )
}

/** Where toasts live: bottom-left of the viewport, newest last.
 *
 *  The region is a polite live region that exists before any toast arrives —
 *  a live region created together with its content is not announced. */
export function ToastRegion({ children }: { children?: ReactNode }) {
  return (
    <div className="vv-toast-region" role="status" aria-live="polite" aria-relevant="additions">
      {children}
    </div>
  )
}
