import type { ReactNode } from "react"
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
    <svg className="vv-toast__glyph" viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.8" />
      {tone === "success" ? (
        <path d="M6.8 10.2l2.2 2.2 4.2-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M10 6.2v4.6M10 13.6v.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      )}
    </svg>
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
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
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
