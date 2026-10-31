import { useEffect, useRef, useState } from "react"
import { Button } from "./Button.js"
import { Table, type Column } from "./Table.js"
import "./BarChart.css"

export type BarSeries = { key: string; label: string; color: string }
export type BarDatum = { label: string; values: Record<string, number> }

export type BarChartProps = {
  /** Names the chart for assistive tech and the table view. */
  title: string
  series: BarSeries[]
  data: BarDatum[]
  format?: (n: number) => string
  height?: number
}

const MAX_BAR = 24
const GAP = 2
const RADIUS = 4
const M = { top: 24, right: 8, bottom: 28, left: 44 }

/** Round a maximum up to a clean axis end: 1, 2, 2.5, 5 or 10 × 10ⁿ. */
function niceMax(v: number) {
  if (v <= 0) return 1
  const p = 10 ** Math.floor(Math.log10(v))
  const f = v / p
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p
}

/** A column with a rounded top and a square foot, as a path. */
function topRounded(x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, h, w / 2)
  return `M${x},${y + h} V${y + rr} Q${x},${y} ${x + rr},${y} H${x + w - rr} Q${x + w},${y} ${x + w},${y + rr} V${y + h} Z`
}

/** Stacked columns for ordered series (aging buckets, stages).
 *
 *  Not ported from Figma: the file's Charts page is a pasted shadcn/Recharts
 *  kit. This is a small SVG chart that follows the dataviz method instead —
 *  a legend is always shown, each column is one keyboard stop with the same
 *  tooltip as hover, and every value is reachable without hovering through
 *  the table view. */
export function BarChart({
  title,
  series,
  data,
  format = (n) => n.toLocaleString("en-US"),
  height = 260,
}: BarChartProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(560)
  const [active, setActive] = useState<number | null>(null)
  const [showTable, setShowTable] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(240, entry.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const totals = data.map((d) => series.reduce((s, se) => s + (d.values[se.key] ?? 0), 0))
  const top = niceMax(Math.max(...totals, 0))
  const innerW = width - M.left - M.right
  const innerH = height - M.top - M.bottom
  const band = innerW / Math.max(1, data.length)
  const barW = Math.min(MAX_BAR, band * 0.5)
  const y = (v: number) => M.top + innerH - (v / top) * innerH
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * top)

  const tableColumns: Column<BarDatum & { total: number }>[] = [
    { key: "label", header: "Period", cell: (r) => r.label },
    ...series.map((s) => ({ key: s.key, header: s.label, cell: (r: BarDatum) => format(r.values[s.key] ?? 0) })),
    { key: "total", header: "Total", cell: (r) => format(r.total) },
  ]

  return (
    <div className="vv-bar" ref={wrapRef}>
      <ul className="vv-bar__legend" aria-label={`${title}, legend`}>
        {series.map((s) => (
          <li key={s.key}>
            <span className="vv-bar__swatch" style={{ background: s.color }} aria-hidden="true" />
            {s.label}
          </li>
        ))}
      </ul>

      <svg className="vv-bar__svg" width={width} height={height} role="group" aria-label={title}>
        {ticks.map((t) => (
          <g key={t}>
            <line className={t === 0 ? "vv-bar__baseline" : "vv-bar__grid"} x1={M.left} x2={width - M.right} y1={y(t)} y2={y(t)} />
            <text className="vv-bar__tick" x={M.left - 8} y={y(t)} dy="0.32em" textAnchor="end" aria-hidden="true">
              {format(t)}
            </text>
          </g>
        ))}

        {data.map((d, i) => {
          const cx = M.left + band * i + band / 2
          const x = cx - barW / 2
          let acc = 0
          const visible = series.filter((s) => (d.values[s.key] ?? 0) > 0)
          return (
            <g
              key={d.label}
              className={`vv-bar__column${active !== null && active !== i ? " vv-bar__column--dim" : ""}`}
              tabIndex={0}
              role="img"
              aria-label={`${d.label}: ${series.map((s) => `${s.label} ${format(d.values[s.key] ?? 0)}`).join(", ")}; total ${format(totals[i])}`}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              {/* The hit target is the whole band, not the painted column. */}
              <rect className="vv-bar__hit" x={M.left + band * i} y={M.top} width={band} height={innerH} />
              {visible.map((s, k) => {
                const v = d.values[s.key] ?? 0
                const y0 = y(acc)
                acc += v
                const y1 = y(acc)
                const isTop = k === visible.length - 1
                // The gap is carved out of each upper segment, not stroked on.
                const h = Math.max(0, y0 - y1 - (k > 0 ? GAP : 0))
                const yy = y1
                return isTop ? (
                  <path key={s.key} className="vv-bar__segment" d={topRounded(x, yy, barW, h, RADIUS)} fill={s.color} />
                ) : (
                  <rect key={s.key} className="vv-bar__segment" x={x} y={yy} width={barW} height={h} fill={s.color} />
                )
              })}
              <text className="vv-bar__total" x={cx} y={y(totals[i]) - 6} textAnchor="middle" aria-hidden="true">
                {format(totals[i])}
              </text>
              <text className="vv-bar__category" x={cx} y={height - 8} textAnchor="middle" aria-hidden="true">
                {d.label}
              </text>
            </g>
          )
        })}
      </svg>

      {active !== null && (
        <div
          className="vv-bar__tooltip"
          style={{ left: M.left + band * active + band / 2, top: y(totals[active]) + 28 }}
          aria-hidden="true"
        >
          <div className="vv-bar__tooltip-title">{data[active].label}</div>
          {[...series].reverse().map((s) => (
            <div className="vv-bar__tooltip-row" key={s.key}>
              <span className="vv-bar__tooltip-key" style={{ background: s.color }} />
              <span className="vv-bar__tooltip-label">{s.label}</span>
              <span className="vv-bar__tooltip-value">{format(data[active].values[s.key] ?? 0)}</span>
            </div>
          ))}
          <div className="vv-bar__tooltip-row">
            <span className="vv-bar__tooltip-key" />
            <span className="vv-bar__tooltip-label">Total</span>
            <span className="vv-bar__tooltip-value">{format(totals[active])}</span>
          </div>
        </div>
      )}

      <div className="vv-bar__table-toggle">
        <Button variant="link" size="sm" aria-expanded={showTable} onClick={() => setShowTable((v) => !v)}>
          {showTable ? "Hide table" : "View as table"}
        </Button>
      </div>
      {showTable && (
        <Table
          caption={title}
          columns={tableColumns}
          rows={data.map((d, i) => ({ ...d, total: totals[i] }))}
          rowKey={(r) => r.label}
        />
      )}
    </div>
  )
}
