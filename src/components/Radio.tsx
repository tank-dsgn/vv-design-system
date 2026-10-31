import { useId, type InputHTMLAttributes } from "react"
import "./Radio.css"

export type RadioProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "type"
> & {
  label: string
}

/** A single radio.
 *
 *  Figma models this four different ways at once, one of which spells the
 *  states as five booleans (`Active`, `Hover`, `Pressed`, `Label`,
 *  `Disabled`). That shape allows `Hover=Yes` together with `Disabled=Yes` —
 *  a combination that cannot happen, and which `SPEC.md` rules out explicitly.
 *  Here hover, pressed and focus are CSS; only `checked` and `disabled` are
 *  props, because only those two are real state. See MAPPING.md §9. */
export function Radio({ label, id, ...props }: RadioProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <label className="vv-radio" htmlFor={inputId}>
      <input className="vv-radio__input" id={inputId} type="radio" {...props} />
      {label}
    </label>
  )
}

export type RadioOption = {
  value: string
  label: string
  disabled?: boolean
}

export type RadioGroupProps = {
  legend: string
  name: string
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  orientation?: "vertical" | "horizontal"
}

/** The group is a `fieldset` with a `legend` on purpose.
 *
 *  A screen reader announces the legend before each option, so the listener
 *  knows what the choice is about. Wrapping the same radios in a `div` with a
 *  heading above them loses that connection entirely. */
export function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
  orientation = "vertical",
}: RadioGroupProps) {
  return (
    <fieldset
      className={`vv-radio-group${
        orientation === "horizontal" ? " vv-radio-group--horizontal" : ""
      }`}
      style={{ border: 0, padding: 0, margin: 0 }}
    >
      <legend className="vv-radio-group__legend">{legend}</legend>
      {options.map((o) => (
        <Radio
          key={o.value}
          name={name}
          label={o.label}
          value={o.value}
          disabled={o.disabled}
          checked={value === o.value}
          onChange={() => onChange(o.value)}
        />
      ))}
    </fieldset>
  )
}
