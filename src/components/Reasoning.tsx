import type { ReactNode } from "react"
import { Collapsible } from "./Collapsible.js"
import { Shimmer } from "./Shimmer.js"
import "./Reasoning.css"

export type ReasoningProps = {
  /** The reasoning is still being written. */
  streaming?: boolean
  /** How long it took, shown once finished: "12 s". */
  duration?: string
  children: ReactNode
  defaultOpen?: boolean
}

/** How an assistant reached its answer, closed by default. */
export function Reasoning({ streaming = false, duration, children, defaultOpen = false }: ReasoningProps) {
  return (
    <div className="vv-reasoning">
      <Collapsible defaultOpen={defaultOpen} title={streaming ? <Shimmer>Thinking</Shimmer> : duration ? `Thought for ${duration}` : "Reasoning"}>
        <div className="vv-reasoning__body">{children}</div>
      </Collapsible>
    </div>
  )
}
