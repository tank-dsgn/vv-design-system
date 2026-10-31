import type { ReactNode } from "react"
import { Button } from "./Button.js"
import "./Confirmation.css"

export type ConfirmationState = "pending" | "approved" | "denied"

export type ConfirmationProps = {
  /** What is about to happen, with the object's name. */
  title: string
  /** The details that decide it. */
  children?: ReactNode
  state?: ConfirmationState
  approveLabel: string
  denyLabel: string
  onApprove: () => void
  onDeny: () => void
}

const RESULT: Record<Exclude<ConfirmationState, "pending">, string> = { approved: "Approved", denied: "Denied" }

/** An assistant asks before acting. It stays in the conversation, and after the
 *  answer it records what was decided. */
export function Confirmation({ title, children, state = "pending", approveLabel, denyLabel, onApprove, onDeny }: ConfirmationProps) {
  return (
    <section className="vv-confirmation" aria-label={title}>
      <h3>{title}</h3>
      {children && <div className="vv-confirmation__body">{children}</div>}
      {state === "pending" ? (
        <div className="vv-confirmation__actions">
          <Button size="sm" onClick={onApprove}>{approveLabel}</Button>
          <Button size="sm" variant="outlined" onClick={onDeny}>{denyLabel}</Button>
        </div>
      ) : (
        <p role="status" className="vv-confirmation__result">{RESULT[state]}</p>
      )}
    </section>
  )
}
