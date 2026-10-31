import type { ReactNode } from "react"
import { Icon, type IconName } from "./Icon.js"
import "./Callout.css"

export type CalloutTone = "note" | "tip" | "warning"

export type CalloutProps = {
  tone?: CalloutTone
  title?: string
  children: ReactNode
}

const ICONS: Record<CalloutTone, IconName> = { note: "information", tip: "star-empty", warning: "warning" }

/** A note set apart inside the content it belongs to. */
export function Callout({ tone = "note", title, children }: CalloutProps) {
  return (
    <aside className={`vv-callout vv-callout--${tone}`}>
      <span className="vv-callout__icon"><Icon name={ICONS[tone]} /></span>
      <div>
        {title && <p className="vv-callout__title">{title}</p>}
        <div className="vv-callout__body">{children}</div>
      </div>
    </aside>
  )
}
