import { useId, type InputHTMLAttributes } from "react"
import "./Slider.css"

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className" | "value" | "onChange"> & {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  /** Show the current value next to the label. */
  showValue?: boolean
  /** Formats the shown value and what a screen reader hears. */
  format?: (value: number) => string
}

/** Picks a value from a continuous range where the exact number matters less
 *  than the position — a radius, a threshold. Built on the native range input:
 *  arrows, Page Up/Down and Home/End work. For an exact number, NumberInput. */
export function Slider({ label, value, onChange, min = 0, max = 100, step = 1, showValue = true, format = String, id, disabled, ...rest }: SliderProps) {
  const auto = useId()
  const inputId = id ?? auto
  return (
    <div className={`vv-slider${disabled ? " vv-slider--disabled" : ""}`}>
      <div className="vv-slider__head">
        <label htmlFor={inputId} className="vv-slider__label">{label}</label>
        {showValue && <output htmlFor={inputId} className="vv-slider__value">{format(value)}</output>}
      </div>
      <input
        id={inputId}
        type="range"
        className="vv-slider__input"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-valuetext={format(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        {...rest}
      />
      <div className="vv-slider__range" aria-hidden="true"><span>{format(min)}</span><span>{format(max)}</span></div>
    </div>
  )
}
