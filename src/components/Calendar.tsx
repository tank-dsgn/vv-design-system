import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { IconButton } from "./IconButton.js"
import { Icon } from "./Icon.js"
import "./Calendar.css"

export type CalendarProps = {
  value?: Date | null
  onChange: (date: Date) => void
  min?: Date
  max?: Date
  /** Month shown first; defaults to the value or today. */
  defaultMonth?: Date
  /** Days that cannot be picked, e.g. weekends. */
  isDisabled?: (date: Date) => boolean
  /** Moves focus to the selected day on mount — used inside DatePicker. */
  autoFocus?: boolean
  locale?: string
}

const DAY = 86400000
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const sameDay = (a?: Date | null, b?: Date | null) => !!a && !!b && a.toDateString() === b.toDateString()
const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, Math.min(d.getDate(), 28))

const Chevron = ({ dir }: { dir: "left" | "right" }) => <Icon name={dir === "left" ? "chevron-left" : "chevron-right"} />

/** A month grid for picking one date. Follows the WAI-ARIA date grid:
 *  arrows move by day and week, Home/End to the week's start and end,
 *  Page Up/Down by month; Enter or Space selects. Weeks start on Monday. */
export function Calendar({ value, onChange, min, max, defaultMonth, isDisabled, autoFocus = false, locale = "en-GB" }: CalendarProps) {
  const today = startOfDay(new Date())
  const [focus, setFocus] = useState<Date>(startOfDay(value ?? defaultMonth ?? today))
  const gridRef = useRef<HTMLTableElement>(null)
  const moved = useRef(autoFocus)

  useEffect(() => {
    if (!moved.current) return
    gridRef.current?.querySelector<HTMLButtonElement>('button[tabindex="0"]')?.focus()
  }, [focus])

  const off = (d: Date) => (min && d < startOfDay(min)) || (max && d > startOfDay(max)) || !!isDisabled?.(d)
  const first = new Date(focus.getFullYear(), focus.getMonth(), 1)
  const lead = (first.getDay() + 6) % 7
  const gridStart = new Date(first.getTime() - lead * DAY)
  const days = Array.from({ length: 42 }, (_, i) => new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i))
  const weeks = Array.from({ length: 6 }, (_, w) => days.slice(w * 7, w * 7 + 7))
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "short" })
  const full = new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" })
  const monthName = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(focus)

  const go = (d: Date) => { moved.current = true; setFocus(startOfDay(d)) }
  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, () => Date> = {
      ArrowLeft: () => new Date(focus.getTime() - DAY),
      ArrowRight: () => new Date(focus.getTime() + DAY),
      ArrowUp: () => new Date(focus.getTime() - 7 * DAY),
      ArrowDown: () => new Date(focus.getTime() + 7 * DAY),
      Home: () => new Date(focus.getTime() - ((focus.getDay() + 6) % 7) * DAY),
      End: () => new Date(focus.getTime() + (6 - ((focus.getDay() + 6) % 7)) * DAY),
      PageUp: () => addMonths(focus, -1),
      PageDown: () => addMonths(focus, 1),
    }
    if (map[e.key]) { e.preventDefault(); go(map[e.key]()) }
  }

  return (
    <div className="vv-calendar">
      <div className="vv-calendar__head">
        <IconButton variant="ghost" size="sm" icon={<Chevron dir="left" />} label="Previous month" onClick={() => setFocus(addMonths(focus, -1))} />
        <span className="vv-calendar__month" aria-live="polite">{monthName}</span>
        <IconButton variant="ghost" size="sm" icon={<Chevron dir="right" />} label="Next month" onClick={() => setFocus(addMonths(focus, 1))} />
      </div>
      <table ref={gridRef} role="grid" aria-label={monthName} className="vv-calendar__grid" onKeyDown={onKey}>
        <thead>
          <tr>
            {weeks[0].map((d) => (
              <th key={d.getDay()} scope="col" abbr={new Intl.DateTimeFormat(locale, { weekday: "long" }).format(d)}>
                {weekday.format(d).slice(0, 2)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((w, wi) => (
            <tr key={wi}>
              {w.map((d) => {
                const outside = d.getMonth() !== focus.getMonth()
                const selected = sameDay(d, value)
                const disabled = off(d)
                return (
                  <td key={d.toISOString()} role="gridcell" aria-selected={selected || undefined}>
                    <button
                      type="button"
                      tabIndex={sameDay(d, focus) ? 0 : -1}
                      className="vv-calendar__day"
                      data-outside={outside || undefined}
                      data-today={sameDay(d, today) || undefined}
                      data-selected={selected || undefined}
                      disabled={disabled}
                      aria-label={full.format(d)}
                      aria-current={sameDay(d, today) ? "date" : undefined}
                      onClick={() => { go(d); onChange(d) }}
                    >
                      {d.getDate()}
                    </button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
