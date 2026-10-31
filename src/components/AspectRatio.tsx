import type { ReactNode } from "react"
import "./AspectRatio.css"

export type AspectRatioProps = {
  /** Width divided by height: `16 / 9`, `1`. */
  ratio?: number
  children: ReactNode
}

/** Holds a box at a fixed shape while its content loads or changes. */
export function AspectRatio({ ratio = 16 / 9, children }: AspectRatioProps) {
  return <div className="vv-aspect" style={{ aspectRatio: String(ratio) }}>{children}</div>
}
