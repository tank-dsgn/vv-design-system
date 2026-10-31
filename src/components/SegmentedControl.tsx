import { useRef, type KeyboardEvent, type ReactNode } from "react"
import "./SegmentedControl.css"

export type Segment = { value: string; label: string; icon?: ReactNode; disabled?: boolean }

export type SegmentedControlProps = {
  "aria-label": string
  options: Segment[]
  value: string
  onChange: (value: string) => void
  size?: "sm" | "md"
  /** Stretch segments to fill the container. */
  fill?: boolean
}

/** Two to five mutually exclusive views or modes, switched in place — List
 *  and Map, Day and Week. A radio group: Tab reaches it once, arrows move. */
export function SegmentedControl({ options, value, onChange, size = "md", fill = false, ...rest }: SegmentedControlProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const enabled = options.filter((o) => !o.disabled)
  const onKey = (e: KeyboardEvent) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const i = enabled.findIndex((o) => o.value === value)
    const next = enabled[(i + dir + enabled.length) % enabled.length]
    onChange(next.value)
    refs.current[options.indexOf(next)]?.focus()
  }
  return (
    <div role="radiogroup" aria-label={rest["aria-label"]} className={`vv-segmented vv-segmented--${size}${fill ? " vv-segmented--fill" : ""}`} onKeyDown={onKey}>
      {options.map((o, i) => {
        const on = o.value === value
        return (
          <button
            key={o.value}
            ref={(el) => { refs.current[i] = el }}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            disabled={o.disabled}
            className="vv-segmented__item"
            onClick={() => onChange(o.value)}
          >
            {o.icon && <span aria-hidden="true" className="vv-segmented__icon">{o.icon}</span>}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
