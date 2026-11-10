import { Icon } from "./Icon.js"
import "./Stepper.css"

export type Step = { label: string; description?: string }

export type StepperProps = {
  steps: Step[]
  /** Index of the step in progress. Earlier steps are complete. */
  current: number
  orientation?: "horizontal" | "vertical"
}

const Check = () => <Icon name="check" size={16} />

/** Progress through a fixed sequence — a multi-step form, an onboarding.
 *  The current step carries `aria-current="step"`; each step's state is also
 *  written out for screen readers, not only drawn. */
export function Stepper({ steps, current, orientation = "horizontal" }: StepperProps) {
  return (
    <ol className={`vv-stepper vv-stepper--${orientation}`}>
      {steps.map((s, i) => {
        const state = i < current ? "complete" : i === current ? "current" : "upcoming"
        return (
          <li key={s.label} className="vv-stepper__step" data-state={state} aria-current={state === "current" ? "step" : undefined}>
            <span className="vv-stepper__marker" aria-hidden="true">{state === "complete" ? <Check /> : i + 1}</span>
            <span className="vv-stepper__text">
              <span className="vv-stepper__label">{s.label}<span className="vv-stepper__sr">, {state}</span></span>
              {s.description && <span className="vv-stepper__desc">{s.description}</span>}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
