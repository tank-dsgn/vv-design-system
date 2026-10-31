import { useId, useState, type ReactNode } from "react"
import { Icon } from "./Icon.js"
import "./Collapsible.css"

export type CollapsibleProps = {
  /** The trigger's text. */
  title: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  /** Shown on the right of the trigger: a count, a status. */
  meta?: ReactNode
  disabled?: boolean
}

/** One section that opens in place. */
export function Collapsible({ title, children, defaultOpen = false, meta, disabled = false }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className="vv-collapsible">
      <button type="button" className="vv-collapsible__trigger" aria-expanded={open} aria-controls={id} disabled={disabled} onClick={() => setOpen(!open)}>
        <span className="vv-collapsible__icon" data-open={open}><Icon name="chevron-down-sm" size={16} /></span>
        <span className="vv-collapsible__title">{title}</span>
        {meta && <span className="vv-collapsible__meta">{meta}</span>}
      </button>
      <div id={id} className="vv-collapsible__body" hidden={!open}>{children}</div>
    </div>
  )
}
