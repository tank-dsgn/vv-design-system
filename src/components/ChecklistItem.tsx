import type { ReactNode } from "react"
import { Checkbox } from "./Checkbox.js"
import "./ChecklistItem.css"

export type ChecklistItemProps = {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  /** A way to do the task from here, e.g. a Link. */
  action?: ReactNode
}

/** One task on a list: its title, what it involves and a way to do it. */
export function ChecklistItem({ label, description, checked, onChange, disabled, action }: ChecklistItemProps) {
  return (
    <div className={checked ? "vv-checklist-item vv-checklist-item--done" : "vv-checklist-item"}>
      <Checkbox label={label} checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      {description && <p className="vv-checklist-item__desc">{description}</p>}
      {action && !checked && <div className="vv-checklist-item__action">{action}</div>}
    </div>
  )
}
