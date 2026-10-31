import type { ReactNode } from "react"
import "./ListItem.css"

export type ListItemProps = {
  title: string
  description?: string
  /** An Avatar or Icon on the left. */
  media?: ReactNode
  /** A status or a figure on the right. */
  meta?: ReactNode
  /** A control on the far right. It stays outside the row's button. */
  action?: ReactNode
  /** Makes the row a button. */
  onClick?: () => void
  selected?: boolean
  disabled?: boolean
}

/** One row of a list: what it is, a line about it and what can be done. */
export function ListItem({ title, description, media, meta, action, onClick, selected = false, disabled = false }: ListItemProps) {
  const body = (
    <>
      {media && <span className="vv-list-item__media">{media}</span>}
      <span className="vv-list-item__text">
        <span className="vv-list-item__title">{title}</span>
        {description && <span className="vv-list-item__desc">{description}</span>}
      </span>
      {meta && <span className="vv-list-item__meta">{meta}</span>}
    </>
  )
  return (
    <div className={selected ? "vv-list-item vv-list-item--selected" : "vv-list-item"}>
      {onClick ? <button type="button" className="vv-list-item__main" aria-pressed={selected} disabled={disabled} onClick={onClick}>{body}</button> : <div className="vv-list-item__main">{body}</div>}
      {action && <div className="vv-list-item__action">{action}</div>}
    </div>
  )
}
