import type { ReactNode } from "react"
import "./ButtonGroup.css"

export type ButtonGroupProps = {
  /** Names the group for screen readers. */
  label: string
  /** `Button` or `IconButton` elements of one variant. */
  children: ReactNode
}

/** Related actions joined into one control. */
export function ButtonGroup({ label, children }: ButtonGroupProps) {
  return <div role="group" aria-label={label} className="vv-button-group">{children}</div>
}
