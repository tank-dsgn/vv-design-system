import type { CSSProperties } from "react"
import "./Skeleton.css"

export type SkeletonShape = "text" | "rect" | "circle"

export type SkeletonProps = {
  shape?: SkeletonShape
  /** Any CSS length. Text defaults to the full line. */
  width?: CSSProperties["width"]
  /** Rect and circle only. Text takes the line height of its size. */
  height?: CSSProperties["height"]
  /** Text only: number of lines; the last one is shorter, as real text is. */
  lines?: number
}

/** A placeholder in the shape of content that is still loading.
 *
 *  Skeletons are decoration: they are hidden from assistive tech. Mark the
 *  region that is loading with `aria-busy="true"` instead. */
export function Skeleton({ shape = "text", width, height, lines = 1 }: SkeletonProps) {
  if (shape === "text") {
    return (
      <span className="vv-skeleton-lines" aria-hidden="true" style={{ width }}>
        {Array.from({ length: lines }, (_, i) => (
          <span
            key={i}
            className="vv-skeleton vv-skeleton--text"
            style={{ width: lines > 1 && i === lines - 1 ? "60%" : undefined }}
          />
        ))}
      </span>
    )
  }
  return (
    <span
      className={`vv-skeleton vv-skeleton--${shape}`}
      aria-hidden="true"
      style={{ width, height: shape === "circle" ? width : height }}
    />
  )
}
