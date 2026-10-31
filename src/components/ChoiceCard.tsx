import type { ChangeEventHandler, ReactNode } from "react"
import "./ChoiceCard.css"

export type ChoiceCardProps = {
  /** `radio` when one card can be chosen, `checkbox` when several can. */
  type?: "radio" | "checkbox"
  name: string
  value: string
  title: string
  description?: string
  /** A price, a date: what tells the options apart at a glance. */
  meta?: ReactNode
  checked?: boolean
  disabled?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}

/** A radio or checkbox that needs room to explain itself. */
export function ChoiceCard({ type = "radio", title, description, meta, ...input }: ChoiceCardProps) {
  return (
    <label className={input.disabled ? "vv-choice-card vv-choice-card--disabled" : "vv-choice-card"}>
      <input type={type} className="vv-choice-card__input" {...input} />
      <span className="vv-choice-card__text">
        <span className="vv-choice-card__title">{title}</span>
        {description && <span className="vv-choice-card__desc">{description}</span>}
      </span>
      {meta && <span className="vv-choice-card__meta">{meta}</span>}
    </label>
  )
}
