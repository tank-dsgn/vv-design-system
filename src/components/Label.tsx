import type { LabelHTMLAttributes, ReactNode } from "react"
import "./Label.css"

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode
  /** Marks the rarer case: most fields in a good form are required. */
  optional?: boolean
}

/** The visible name of a control. */
export function Label({ children, optional = false, ...props }: LabelProps) {
  return (
    <label className="vv-label" {...props}>
      {children}
      {optional && <span className="vv-label__optional"> (optional)</span>}
    </label>
  )
}
