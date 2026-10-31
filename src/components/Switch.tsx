import { useId, type InputHTMLAttributes } from "react"
import "./Switch.css"

export type SwitchSize = "sm" | "lg"

export type SwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "type" | "size"
> & {
  size?: SwitchSize
  label: string
}

/** A switch on a native checkbox.
 *
 *  Figma's `Type` property mixes three orthogonal things — size (`Small` /
 *  `Big`), colour (`Colored`) and whether a glyph rides in the knob (`Icon`) —
 *  so it carries six values that should have been three properties. Its
 *  `State` then folds on/off together with hover and disabled, which is why
 *  the file has both `State=Default` and `State=On Default`.
 *
 *  Here: `size` is a prop, on/off is `checked`, and hover and focus are CSS.
 *  See MAPPING.md §9. */
export function Switch({ size = "lg", label, id, ...props }: SwitchProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <label className="vv-switch" htmlFor={inputId}>
      <input
        className={`vv-switch__input vv-switch__input--${size}`}
        id={inputId}
        type="checkbox"
        // role="switch" makes a screen reader say "on/off" rather than
        // "checked/unchecked" — the words that match what the control means.
        role="switch"
        {...props}
      />
      {label}
    </label>
  )
}
