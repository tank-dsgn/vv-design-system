import type { ReactNode } from "react"
import { Icon, type IconName } from "./Icon.js"
import "./Banner.css"

export type BannerTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "critical"

export type BannerProps = {
  tone?: BannerTone
  title?: string
  /** Buttons under the message — usually one, at most two. */
  actions?: ReactNode
  // Figma's note: "Default banners contain lower priority information and
  // should always be dismissible."
  /** Shows a dismiss button. Neutral and info banners should be dismissible;
   *  a critical one usually should not — an error waved away goes unfixed. */
  onDismiss?: () => void
  children: ReactNode
}

const GLYPH: Record<BannerTone, IconName | null> = {
  neutral: null,
  info: "information",
  success: "success",
  warning: "warning",
  critical: "error",
}

export function Banner({
  tone = "info",
  title,
  actions,
  onDismiss,
  children,
}: BannerProps) {
  return (
    <div
      className={`vv-banner vv-banner--${tone}`}
      /* A critical banner interrupts; the rest are read in document order.
         `status` waits for a pause in speech, `alert` does not — the
         difference between "worth knowing" and "stop". */
      role={tone === "critical" ? "alert" : "status"}
    >
      {GLYPH[tone] && (
        <span className="vv-banner__icon" aria-hidden="true">
          <Icon name={GLYPH[tone]!} size={20} />
        </span>
      )}
      <div className="vv-banner__body">
        {title && <span className="vv-banner__title">{title}</span>}
        <span>{children}</span>
        {actions && <div className="vv-banner__actions">{actions}</div>}
      </div>
      {onDismiss && (
        <button
          className="vv-banner__dismiss"
          type="button"
          onClick={onDismiss}
          // Icon-only, so the name has to be spelled out.
          aria-label="Dismiss"
        >
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  )
}
