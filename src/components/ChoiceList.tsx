import { useId } from "react"
import { Checkbox } from "./Checkbox.js"
import { InlineMessage } from "./InlineMessage.js"
import { Radio } from "./Radio.js"
import "./ChoiceList.css"

export type Choice = {
  value: string
  label: string
  /** A line of help under the label. */
  description?: string
  disabled?: boolean
}

export type ChoiceListProps = {
  /** The question. Always required: it names the group for screen readers. */
  title: string
  /** Hides the title visually when the context already says it. */
  titleHidden?: boolean
  choices: Choice[]
  selected: string[]
  onChange: (selected: string[]) => void
  /** Checkboxes instead of radios: any number of choices. */
  allowMultiple?: boolean
  /** Shown under the list and announced. */
  error?: string
  name?: string
}

/** A group of related choices under one question: radios for one answer,
 *  checkboxes for several. */
export function ChoiceList({
  title,
  titleHidden = false,
  choices,
  selected,
  onChange,
  allowMultiple = false,
  error,
  name,
}: ChoiceListProps) {
  const auto = useId()
  const group = name ?? auto
  const errorId = `${auto}-error`
  return (
    <fieldset className="vv-choices" aria-describedby={error ? errorId : undefined} aria-invalid={error ? true : undefined}>
      <legend className={titleHidden ? "vv-choices__title vv-choices__title--hidden" : "vv-choices__title"}>{title}</legend>
      <div className="vv-choices__list">
        {choices.map((c) => {
          const descId = c.description ? `${auto}-${c.value}-desc` : undefined
          const checked = selected.includes(c.value)
          return (
            <div key={c.value} className="vv-choices__item">
              {allowMultiple ? (
                <Checkbox
                  label={c.label}
                  name={group}
                  value={c.value}
                  checked={checked}
                  disabled={c.disabled}
                  aria-describedby={descId}
                  onChange={(e) => onChange(e.target.checked ? [...selected, c.value] : selected.filter((v) => v !== c.value))}
                />
              ) : (
                <Radio
                  label={c.label}
                  name={group}
                  value={c.value}
                  checked={checked}
                  disabled={c.disabled}
                  aria-describedby={descId}
                  onChange={() => onChange([c.value])}
                />
              )}
              {c.description && <p id={descId} className="vv-choices__desc">{c.description}</p>}
            </div>
          )
        })}
      </div>
      {error && <div id={errorId}><InlineMessage tone="critical">{error}</InlineMessage></div>}
    </fieldset>
  )
}
