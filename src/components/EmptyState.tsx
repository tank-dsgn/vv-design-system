import type { ReactNode } from "react"
import "./EmptyState.css"

export type EmptyStateProps = {
  /** A 24px icon that names the missing thing. */
  icon?: ReactNode
  title: string
  /** One sentence: why it is empty, and what to do next. */
  description?: string
  /** One primary way forward, optionally one secondary. */
  actions?: ReactNode
  size?: "sm" | "md"
}

/** What a list, table or page shows when there is nothing in it yet —
 *  or nothing that matches. Always says why and offers the next step. */
export function EmptyState({ icon, title, description, actions, size = "md" }: EmptyStateProps) {
  return (
    <div className={`vv-empty vv-empty--${size}`}>
      {icon && <span className="vv-empty__icon" aria-hidden="true">{icon}</span>}
      <p className="vv-empty__title">{title}</p>
      {description && <p className="vv-empty__desc">{description}</p>}
      {actions && <div className="vv-empty__actions">{actions}</div>}
    </div>
  )
}
