import type { ReactNode } from "react"
import { Icon, type IconName } from "./Icon.js"
import "./OutcomeBanner.css"

export type Outcome = "success" | "partial" | "failed"

export type OutcomeBannerProps = {
  outcome: Outcome
  /** What happened, in plain words. */
  title: string
  /** What it means for the reader, including what did not happen. */
  children?: ReactNode
  /** The way forward: a Button or two. */
  actions?: ReactNode
}

const ICONS: Record<Outcome, IconName> = { success: "success", partial: "warning", failed: "error" }

/** The result of a finished process at the top of its results. */
export function OutcomeBanner({ outcome, title, children, actions }: OutcomeBannerProps) {
  return (
    <section className={`vv-outcome vv-outcome--${outcome}`} role="status">
      <span className="vv-outcome__icon"><Icon name={ICONS[outcome]} size={24} /></span>
      <div className="vv-outcome__text">
        <h3>{title}</h3>
        {children && <div className="vv-outcome__body">{children}</div>}
        {actions && <div className="vv-outcome__actions">{actions}</div>}
      </div>
    </section>
  )
}
