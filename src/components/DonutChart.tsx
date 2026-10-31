import { useState } from "react"
import "./DonutChart.css"

export type DonutSlice = { key: string; label: string; value: number; color: string }

export type DonutChartProps = {
  title: string
  slices: DonutSlice[]
  /** Small line under the total in the centre, e.g. "expected". */
  caption?: string
  format?: (n: number) => string
  size?: number
}

const THICKNESS = 28
const GAP_PX = 2

function arc(cx: number, cy: number, rOuter: number, rInner: number, a0: number, a1: number) {
  const p = (r: number, a: number) => [cx + r * Math.sin(a), cy - r * Math.cos(a)]
  const large = a1 - a0 > Math.PI ? 1 : 0
  const [x0, y0] = p(rOuter, a0)
  const [x1, y1] = p(rOuter, a1)
  const [x2, y2] = p(rInner, a1)
  const [x3, y3] = p(rInner, a0)
  return `M${x0},${y0} A${rOuter},${rOuter} 0 ${large} 1 ${x1},${y1} L${x2},${y2} A${rInner},${rInner} 0 ${large} 0 ${x3},${y3} Z`
}

/** A donut for part-to-whole with at most six slices.
 *
 *  More than six is refused in development: past that, adjacent classes blur
 *  and the honest form is a table. Slices are separated by a 2px surface gap
 *  rather than a stroke. Every value sits in the legend beside the chart, so
 *  nothing is gated behind hover. */
export function DonutChart({
  title,
  slices,
  caption,
  format = (n) => n.toLocaleString("en-US"),
  size = 200,
}: DonutChartProps) {
  const [active, setActive] = useState<string | null>(null)
  if (slices.length > 6 && import.meta.env?.DEV) {
    console.warn(`DonutChart "${title}": ${slices.length} slices — use a table past six.`)
  }

  const total = slices.reduce((s, x) => s + x.value, 0)
  const r = size / 2
  const rIn = r - THICKNESS
  const gapAngle = GAP_PX / (r - THICKNESS / 2)
  let angle = 0

  return (
    <div className={`vv-donut${active ? " vv-donut--active" : ""}`}>
      <div className="vv-donut__figure" style={{ width: size, height: size }}>
        <svg className="vv-donut__svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="group" aria-label={title}>
          {slices.map((s) => {
            const sweep = total === 0 ? 0 : (s.value / total) * Math.PI * 2
            const a0 = angle + gapAngle / 2
            const a1 = angle + sweep - gapAngle / 2
            angle += sweep
            if (a1 <= a0) return null
            const pct = total === 0 ? 0 : Math.round((s.value / total) * 100)
            return (
              <path
                key={s.key}
                className={`vv-donut__slice${active === s.key ? " vv-donut__slice--active" : ""}`}
                d={arc(r, r, r, rIn, a0, a1)}
                fill={s.color}
                tabIndex={0}
                role="img"
                aria-label={`${s.label}: ${format(s.value)}, ${pct}%`}
                onPointerEnter={() => setActive(s.key)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(s.key)}
                onBlur={() => setActive(null)}
              />
            )
          })}
        </svg>
        <div className="vv-donut__center" aria-hidden="true">
          <span className="vv-donut__total">{format(total)}</span>
          {caption && <span className="vv-donut__caption">{caption}</span>}
        </div>
      </div>

      <ul className="vv-donut__legend" aria-label={`${title}, values`}>
        {slices.map((s) => (
          <li
            key={s.key}
            className={`vv-donut__row${active === s.key ? " vv-donut__row--active" : ""}`}
            onPointerEnter={() => setActive(s.key)}
            onPointerLeave={() => setActive(null)}
          >
            <span className="vv-donut__swatch" style={{ background: s.color }} aria-hidden="true" />
            <span className="vv-donut__label">{s.label}</span>
            <span className="vv-donut__value">{format(s.value)}</span>
            <span className="vv-donut__pct">{total === 0 ? "0%" : `${Math.round((s.value / total) * 100)}%`}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
