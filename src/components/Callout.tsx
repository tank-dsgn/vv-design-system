import type { ReactNode } from "react"
import { Icon, type IconName } from "./Icon.js"
import "./Callout.css"

/** The tones Badge and Banner use. A callout has no critical or success tone:
 *  it is an aside in the copy, not a report on what just happened. */

export type CalloutTone = "neutral" | "info" | "warning"

export type CalloutProps = {
  tone?: CalloutTone
  title?: string
  children: ReactNode
}

const ICONS: Record<CalloutTone, IconName> = { neutral: "information", info: "star", warning: "warning" }

/** A note set apart inside the content it belongs to. */
export function Callout({ tone = "neutral", title, children }: CalloutProps) {
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
