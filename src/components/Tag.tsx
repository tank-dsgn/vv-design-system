import type { ReactNode } from "react"
import { Icon } from "./Icon.js"
import "./Tag.css"

export type TagProps = {
  children: string
  icon?: ReactNode
  /** Shows a remove button, named "Remove" plus the tag's label for screen readers. */
  onRemove?: () => void
  /** Makes the tag itself a button, e.g. to filter by it. */
  onClick?: () => void
  disabled?: boolean
}

/** A user-assigned keyword on an object. Removable, optionally clickable. */
export function Tag({ children, icon, onRemove, onClick, disabled = false }: TagProps) {
  const body = (
    <>
      {icon && <span className="vv-tag__icon" aria-hidden="true">{icon}</span>}
      <span className="vv-tag__label">{children}</span>
    </>
  )
  return (
    <span aria-disabled={disabled || undefined} className={["vv-tag", disabled ? "vv-tag--disabled" : "", onRemove ? "vv-tag--removable" : ""].filter(Boolean).join(" ")}>
      {onClick ? (
        <button type="button" className="vv-tag__main" onClick={onClick} disabled={disabled}>{body}</button>
      ) : (
        <span className="vv-tag__main">{body}</span>
      )}
      {onRemove && (
        <button type="button" className="vv-tag__remove" onClick={onRemove} disabled={disabled} aria-label={`Remove ${children}`}>
          <Icon name="close" size={16} />
        </button>
      )}
    </span>
  )
}
