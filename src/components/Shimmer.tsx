import type { ReactNode } from "react"
import "./Shimmer.css"

export type ShimmerProps = { children: ReactNode }

/** Words that pulse while an assistant works on them. */
export function Shimmer({ children }: ShimmerProps) {
  return <span className="vv-shimmer">{children}</span>
}
