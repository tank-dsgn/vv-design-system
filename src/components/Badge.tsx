import type { ReactNode } from "react"
import "./Badge.css"

/** Tones, condensed from Figma's thirteen.
 *
 *  Figma lists `default, info, info-strong, success, success-strong,
 *  attention, attention-strong, warning, warning-strong, critical,
 *  critical-strong, enabled, read only, new`. Five of those are the `-strong`
 *  twin of another, which is emphasis, not a different meaning — so `strong`
 *  is a separate boolean here and the tone list halves.
 *
 *  `enabled`, `read only` and `new` are not tones at all: they are three
 *  specific labels that happened to get their own variant. They render as
 *  `neutral` with that text. See MAPPING.md §9. */
export type BadgeTone =
  | "neutral"
  | "info"
  | "success"
  | "attention"
  | "warning"
  | "critical"

export type BadgeSize = "md" | "lg"

export type BadgeProps = {
  tone?: BadgeTone
  size?: BadgeSize
  // Figma: the `-strong` tones.
  /** A filled, higher-contrast badge. Emphasis, not a different meaning. */
  strong?: boolean
  // Figma: Progress Indicator=true.
  /** A dot in the tone's colour before the label. */
  dot?: boolean
  icon?: ReactNode
  children: ReactNode
}

export function Badge({
  tone = "neutral",
  size = "md",
  strong = false,
  dot = false,
  icon,
  children,
}: BadgeProps) {
  return (
    <span
      className={[
        "vv-badge",
        `vv-badge--${tone}`,
        `vv-badge--${size}`,
        strong ? "vv-badge--strong" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Colour alone never carries the meaning: the label does. The dot and
          the icon are decoration on top of it, so both are hidden from
          assistive tech. */}
      {dot && <span className="vv-badge__dot" aria-hidden="true" />}
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </span>
  )
}
