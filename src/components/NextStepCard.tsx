import type { ReactNode } from "react"
import "./NextStepCard.css"

export type NextStepCardProps = {
  /** The step, as an action: "Confirm the pickup time". */
  title: string
  /** Why now, or what it unblocks. */
  description?: string
  /** One Button. */
  action: ReactNode
}

/** The single next thing to do, set apart so it cannot be missed. */
export function NextStepCard({ title, description, action }: NextStepCardProps) {
  return (
    <section className="vv-next-step" aria-label="Next step">
      <div className="vv-next-step__text">
        <p className="vv-next-step__eyebrow">Next step</p>
        <h3>{title}</h3>
        {description && <p className="vv-next-step__desc">{description}</p>}
      </div>
      <div className="vv-next-step__action">{action}</div>
    </section>
  )
}
