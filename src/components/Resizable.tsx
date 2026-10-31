import { useRef, useState, type ReactNode } from "react"
import "./Resizable.css"

export type ResizableProps = {
  /** Names the handle for screen readers: what it resizes. */
  label: string
  first: ReactNode
  second: ReactNode
  direction?: "horizontal" | "vertical"
  /** The first pane's share, in percent. */
  defaultSize?: number
  min?: number
  max?: number
  /** Height of the whole control in px. */
  height?: number
}

/** Two panes with a handle between them. Drag it, or focus it and use arrows;
 *  Home and End jump to the limits. */
export function Resizable({ label, first, second, direction = "horizontal", defaultSize = 50, min = 20, max = 80, height = 240 }: ResizableProps) {
  const [size, setSize] = useState(defaultSize)
  const root = useRef<HTMLDivElement>(null)
  const clamp = (v: number) => Math.round(Math.min(max, Math.max(min, v)))
  const horizontal = direction === "horizontal"

  const onMove = (e: React.PointerEvent) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId) || !root.current) return
    const r = root.current.getBoundingClientRect()
    setSize(clamp(horizontal ? ((e.clientX - r.left) / r.width) * 100 : ((e.clientY - r.top) / r.height) * 100))
  }

  const onKey = (e: React.KeyboardEvent) => {
    const back = horizontal ? "ArrowLeft" : "ArrowUp"
    const forward = horizontal ? "ArrowRight" : "ArrowDown"
    if (e.key === back) setSize(clamp(size - 5))
    else if (e.key === forward) setSize(clamp(size + 5))
    else if (e.key === "Home") setSize(min)
    else if (e.key === "End") setSize(max)
    else return
    e.preventDefault()
  }

  return (
    <div ref={root} className={`vv-resizable vv-resizable--${direction}`} style={{ height }}>
      <div className="vv-resizable__pane" style={{ flexBasis: `${size}%` }}>{first}</div>
      <div
        role="separator"
        tabIndex={0}
        aria-label={label}
        aria-orientation={horizontal ? "vertical" : "horizontal"}
        aria-valuenow={size}
        aria-valuemin={min}
        aria-valuemax={max}
        className="vv-resizable__handle"
        onPointerDown={(e) => e.currentTarget.setPointerCapture(e.pointerId)}
        onPointerMove={onMove}
        onKeyDown={onKey}
      />
      <div className="vv-resizable__pane vv-resizable__pane--rest">{second}</div>
    </div>
  )
}
