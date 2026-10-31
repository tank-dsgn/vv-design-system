import { Icon, type IconName } from "./Icon.js"
import "./Plan.css"

export type PlanStepStatus = "done" | "current" | "todo"
export type PlanStep = { title: string; detail?: string; status: PlanStepStatus }

export type PlanProps = {
  title: string
  steps: PlanStep[]
}

const ICONS: Record<PlanStepStatus, IconName> = { done: "oval-check", current: "status-indeterminate", todo: "oval-empty" }
const WORDS: Record<PlanStepStatus, string> = { done: "Done", current: "In progress", todo: "To do" }

/** What an assistant intends to do, step by step, before and while it does it. */
export function Plan({ title, steps }: PlanProps) {
  return (
    <section className="vv-plan" aria-label={title}>
      <h3>{title}</h3>
      <ol>
        {steps.map((s) => (
          <li key={s.title} className={`vv-plan__step vv-plan__step--${s.status}`} aria-current={s.status === "current" ? "step" : undefined}>
            <span className="vv-plan__icon"><Icon name={ICONS[s.status]} size={16} label={WORDS[s.status]} /></span>
            <div>
              <p className="vv-plan__title">{s.title}</p>
              {s.detail && <p className="vv-plan__detail">{s.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
