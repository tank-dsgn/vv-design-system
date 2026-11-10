import { useId, type KeyboardEvent } from "react"
import { IconButton } from "./IconButton.js"
import { InlineMessage } from "./InlineMessage.js"
import { Icon } from "./Icon.js"
import "./NumberInput.css"

export type NumberInputProps = {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  /** Unit after the number, e.g. "kg". */
  unit?: string
  hint?: string
  error?: string
  disabled?: boolean
  size?: "sm" | "md"
}



/** An exact number with a step — quantity, pallets, weight. Arrows and
 *  the − / + buttons step by `step`; the value is clamped to min and max.
 *  The field is a `spinbutton`, so screen readers announce the value and range. */
export function NumberInput({ label, value, onChange, min = -Infinity, max = Infinity, step = 1, unit, hint, error, disabled, size = "md" }: NumberInputProps) {
  const id = useId()
  const clamp = (n: number) => Math.min(max, Math.max(min, n))
  const set = (n: number) => !Number.isNaN(n) && onChange(clamp(n))
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") { e.preventDefault(); set(value + step) }
    if (e.key === "ArrowDown") { e.preventDefault(); set(value - step) }
    if (e.key === "Home" && min > -Infinity) { e.preventDefault(); set(min) }
    if (e.key === "End" && max < Infinity) { e.preventDefault(); set(max) }
  }
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined
  return (
    <div className="vv-number">
      <label htmlFor={id} className="vv-number__label">{label}</label>
      <div className={`vv-number__field vv-number__field--${size}${error ? " vv-number__field--invalid" : ""}${disabled ? " vv-number__field--disabled" : ""}`}>
        <IconButton variant="ghost" size={size === "md" ? "sm" : "xs"} icon={<Icon name="minus" size={16} />} label={`Decrease ${label}`} disabled={disabled || value <= min} onClick={() => set(value - step)} tabIndex={-1} />
        <input
          id={id}
          role="spinbutton"
          inputMode="decimal"
          className="vv-number__input"
          value={value}
          disabled={disabled}
          aria-valuenow={value}
          aria-valuemin={min > -Infinity ? min : undefined}
          aria-valuemax={max < Infinity ? max : undefined}
          aria-valuetext={unit ? `${value} ${unit}` : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onKeyDown={onKey}
          onChange={(e) => set(Number(e.target.value.replace(",", ".")))}
        />
        {unit && <span className="vv-number__unit" aria-hidden="true">{unit}</span>}
        <IconButton variant="ghost" size={size === "md" ? "sm" : "xs"} icon={<Icon name="plus" size={16} />} label={`Increase ${label}`} disabled={disabled || value >= max} onClick={() => set(value + step)} tabIndex={-1} />
      </div>
      {hint && !error && <span id={`${id}-hint`} className="vv-number__hint">{hint}</span>}
      {error && <div id={`${id}-error`}><InlineMessage tone="critical">{error}</InlineMessage></div>}
    </div>
  )
}
