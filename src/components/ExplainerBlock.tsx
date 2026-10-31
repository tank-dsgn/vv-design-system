import type { ReactNode } from "react"
import "./ExplainerBlock.css"

export type ExplainerBlockProps = {
  /** The question the block answers. */
  title: string
  children: ReactNode
  /** How it works, in order. */
  steps?: string[]
  /** A Link to the full explanation. */
  link?: ReactNode
}

/** A short answer to "how does this work?", next to the feature it explains. */
export function ExplainerBlock({ title, children, steps, link }: ExplainerBlockProps) {
  return (
    <section className="vv-explainer" aria-label={title}>
      <h3>{title}</h3>
      <div className="vv-explainer__body">{children}</div>
      {steps && <ol>{steps.map((s) => <li key={s}>{s}</li>)}</ol>}
      {link && <p className="vv-explainer__link">{link}</p>}
    </section>
  )
}
