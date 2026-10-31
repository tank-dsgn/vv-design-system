import type { ReactNode } from "react"
import { Icon, type IconName } from "./Icon.js"
import "./InlineMessage.css"

/** Figma's five `message` values, kept as they are. */
export type InlineMessageTone =
  | "error"
  | "success"
  | "warning"
  | "information"
  | "hint"

export type InlineMessageProps = {
  tone?: InlineMessageTone
  children: ReactNode
}

const GLYPH: Record<InlineMessageTone, IconName | null> = {
  error: "error",
  success: "success",
  warning: "warning",
  information: "information",
  hint: null,
}

export function InlineMessage({
  tone = "hint",
  children,
}: InlineMessageProps) {
  return (
    <span
      className={`vv-inline-message vv-inline-message--${tone}`}
      /* An error must interrupt: it appears after the user has already acted,
         and a silent one is never noticed. The rest are read in document
         order, so they need no live region. */
      role={tone === "error" ? "alert" : undefined}
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
