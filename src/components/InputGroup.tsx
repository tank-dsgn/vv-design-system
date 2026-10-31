import type { ReactNode } from "react"
import "./InputGroup.css"

export type InputGroupProps = {
  /** Names the group for screen readers. */
  label: string
  /** An Input, Select or Button in the order they read. */
  children: ReactNode
}

/** Controls joined into one line that work as a single answer. */
export function InputGroup({ label, children }: InputGroupProps) {
  return <div role="group" aria-label={label} className="vv-input-group">{children}</div>
}
