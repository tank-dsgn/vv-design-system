import { useEffect, useId, useRef, type InputHTMLAttributes } from "react"
import "./Checkbox.css"

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "type"
> & {
  label: string
  /** Hides the label visually, keeping it for assistive tech. For a checkbox
   *  in a table cell, where the row already says what it is. */
  labelHidden?: boolean
  /** The third state, for a "select all" that covers only part of a list.
   *  It is not an attribute in HTML — only a DOM property — so it has to be
   *  set on the node after render. */
  indeterminate?: boolean
}

export function Checkbox({
  label,
  labelHidden = false,
  indeterminate = false,
  id,
  ...props
}: CheckboxProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <label className="vv-checkbox" htmlFor={inputId}>
      <input
        ref={ref}
        className="vv-checkbox__input"
        id={inputId}
        type="checkbox"
        {...props}
      />
      <span className={labelHidden ? "vv-checkbox__label--hidden" : undefined}>
        {label}
      </span>
    </label>
  )
}
