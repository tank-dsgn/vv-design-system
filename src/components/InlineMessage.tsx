import type { ReactNode } from "react"
import { Icon, type IconName } from "./Icon.js"
import "./InlineMessage.css"

/** The five tones, named as Badge and Banner name them. */
export type InlineMessageTone =
  | "critical"
  | "success"
  | "warning"
  | "info"
  | "neutral"

export type InlineMessageProps = {
  tone?: InlineMessageTone
  children: ReactNode
}

const GLYPH: Record<InlineMessageTone, IconName | null> = {
  critical: "error",
  success: "success",
  warning: "warning",
  info: "information",
  neutral: null,
}

export function InlineMessage({
  tone = "neutral",
  children,
}: InlineMessageProps) {
  return (
    <span
      className={`vv-inline-message vv-inline-message--${tone}`}
      /* An error must interrupt: it appears after the user has already acted,
         and a silent one is never noticed. The rest are read in document
         order, so they need no live region. */
      role={tone === "critical" ? "alert" : undefined}
    >
      {GLYPH[tone] && (
        <span className="vv-inline-message__icon" aria-hidden="true">
          <Icon name={GLYPH[tone]!} size={16} />
        </span>
      )}
      {children}
    </span>
  )
}
