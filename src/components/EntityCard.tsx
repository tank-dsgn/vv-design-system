import type { ReactNode } from "react"
import { Avatar } from "./Avatar.js"
import "./EntityCard.css"

export type EntityFact = { label: string; value: ReactNode }

export type EntityCardProps = {
  name: string
  /** What kind of thing it is, or a line about it. */
  subtitle?: string
  /** A Badge with its status. */
  status?: ReactNode
  /** Two to four facts that tell one entity from another. */
  facts?: EntityFact[]
  /** Buttons or links at the foot. */
  actions?: ReactNode
  shape?: "circle" | "rounded"
}

/** A person, a company or a vehicle at a glance: Card with the layout decided. */
export function EntityCard({ name, subtitle, status, facts, actions, shape = "rounded" }: EntityCardProps) {
  return (
    <article className="vv-entity-card" aria-label={name}>
      <header className="vv-entity-card__head">
        <Avatar name={name} shape={shape} tone="blue" />
        <div className="vv-entity-card__name">
          <h3>{name}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {status}
      </header>
      {facts && (
        <dl className="vv-entity-card__facts">
          {facts.map((f) => (
            <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
          ))}
        </dl>
      )}
      {actions && <footer className="vv-entity-card__actions">{actions}</footer>}
    </article>
  )
}
