import { forwardRef, useId, type TextareaHTMLAttributes } from "react"
import "./Input.css"
import "./Textarea.css"

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {
  label: string
  labelHidden?: boolean
  hint?: string
  error?: string
}

/** Multi-line text with its label, hint and error — the same contract as
 *  `Field`, so forms built from both read alike to a screen reader. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, labelHidden = false, hint, error, id, ...props },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`
  return (
    <div className="vv-field">
      <label className={labelHidden ? "vv-textarea__label--hidden" : "vv-field__label"} htmlFor={inputId}>
        {label}
      </label>
      <textarea
        ref={ref}
        id={inputId}
        className="vv-textarea__input"
        aria-invalid={error ? true : undefined}
        aria-describedby={[error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined}
        {...props}
      />
      {hint && !error && <span className="vv-field__hint" id={hintId}>{hint}</span>}
      {error && <span className="vv-field__error" id={errorId} role="alert">{error}</span>}
    </div>
  )
})
