import { forwardRef, type SelectHTMLAttributes } from "react"
import type { InputSize } from "./Input.js"
import "./Select.css"

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "className" | "size"
> & {
  size?: InputSize
  invalid?: boolean
}

/** One Select instead of five.
 *
 *  Figma's "Dropdown / Select" page holds five independent takes on picking
 *  from a list: `Select` (with Polaris's `Tone=magic`), `Dropdown`,
 *  `DropdownMenu`, `Input dropdown` and `_Dropdown list item`. They are not
 *  variants of one another — they are different components with different
 *  properties.
 *
 *  One here, on a native `<select>`: keyboard support, type-ahead and the
 *  mobile picker come free. A custom listbox is a separate job, and starting
 *  it before Figma settles on one model would just freeze the sprawl into
 *  code. See MAPPING.md §8. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { size = "md", invalid = false, disabled = false, children, ...props },
  ref,
) {
  return (
    <div
      className={[
        "vv-select",
        `vv-select--${size}`,
        invalid ? "vv-select--invalid" : "",
        disabled ? "vv-select--disabled" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <select
        ref={ref}
        className="vv-select__field"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        {...props}
      >
        {children}
      </select>
      <span className="vv-select__chevron" aria-hidden="true">
        ▾
      </span>
    </div>
  )
})
