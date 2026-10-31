import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react"
import "./Input.css"

/** Four sizes, matching Button.
 *
 *  Figma gives Input two (32/40) and Button four (24/32/40/48). SPEC.md's
 *  control-sizes section requires one scale across Button, Input and
 *  Select: otherwise a field and a button sitting side by side in a form do
 *  not line up. Unified here. See MAPPING.md, decision #2. */
export type InputSize = "xs" | "sm" | "md" | "lg"

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "size" | "prefix"
> & {
  size?: InputSize
  // Figma: State=Error — a flag here, since an error combines with any content.
  /** Marks the value as invalid: red border and `aria-invalid`. */
  invalid?: boolean
  // Figma: the private `.search text` sub-component.
  /** An icon before the value, e.g. search. */
  iconLeading?: ReactNode
  // Figma: Prefix / Postfix on the canvas.
  /** Fixed text before the value, such as a country code. */
  prefix?: ReactNode
  suffix?: ReactNode
}

/** Placeholder / Typing / Filled are deliberately absent from the props.
 *
 *  Figma models them as three variants, but in code they differ only by
 *  whether a value is present and whether the field has focus — already
 *  expressed by `value` and `:focus-within`. A `state="filled"` prop would
 *  have to be kept in sync with `value` by hand, and would drift on the first
 *  real form. See MAPPING.md, decision #1. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = "md",
    invalid = false,
    disabled = false,
    iconLeading,
    prefix,
    suffix,
    ...props
  },
  ref,
) {
  return (
    <div
      className={[
        "vv-input",
        `vv-input--${size}`,
        invalid ? "vv-input--invalid" : "",
        disabled ? "vv-input--disabled" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {iconLeading && (
        <span className="vv-input__icon" aria-hidden="true">
          {iconLeading}
        </span>
      )}
      {prefix && <span className="vv-input__affix">{prefix}</span>}
      <input
        ref={ref}
        className="vv-input__field"
        disabled={disabled}
        // Without this a screen reader never learns about the error: it
        // cannot see the red border.
        aria-invalid={invalid || undefined}
        {...props}
      />
      {suffix && <span className="vv-input__affix">{suffix}</span>}
    </div>
  )
})

export type FieldProps = InputProps & {
  label: string
  hint?: string
  /** Error text. Its presence turns on `invalid` by itself: keeping two
   *  sources of truth for one fact is how they fall out of sync. */
  error?: string
}

/** Field wrapper: label, hint, error.
 *
 *  Figma has none of this — only the field itself is drawn. Built from
 *  SPEC.md's `FormField` molecule, because a field without a label cannot go
 *  into a form: the label is not decoration, it is how the field introduces
 *  itself to a screen reader. */
export function Field({ label, hint, error, id, ...props }: FieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`

  return (
    <div className="vv-field">
      <label className="vv-field__label" htmlFor={inputId}>
        {label}
      </label>
      <Input
        id={inputId}
        invalid={Boolean(error) || props.invalid}
        // A screen reader announces hint and error only if the field points
        // at them.
        aria-describedby={
          [error ? errorId : null, hint && !error ? hintId : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        {...props}
      />
      {hint && !error && (
        <span className="vv-field__hint" id={hintId}>
          {hint}
        </span>
      )}
      {error && (
        <span className="vv-field__error" id={errorId} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
