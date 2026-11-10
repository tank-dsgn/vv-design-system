import { useEffect, useId, useRef, useState } from "react"
import { Calendar, type CalendarProps } from "./Calendar.js"
import { Icon } from "./Icon.js"
import { InlineMessage } from "./InlineMessage.js"
import "./DatePicker.css"

export type DatePickerProps = Omit<CalendarProps, "onChange" | "autoFocus"> & {
  label: string
  onChange: (date: Date | null) => void
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  /** Start with the calendar open, for documentation. */
  defaultOpen?: boolean
}

/** A field that opens a Calendar. The field shows the date in words, so it
 *  cannot be misread as day-first or month-first. Esc closes the calendar and
 *  returns focus to the field. */
export function DatePicker({ label, value, onChange, placeholder = "Choose a date", hint, error, disabled, defaultOpen = false, locale = "en-GB", ...calendar }: DatePickerProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  const btnRef = useRef<HTMLButtonElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const text = value ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(value) : ""

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => !wrapRef.current?.contains(e.target as Node) && setOpen(false)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btnRef.current?.focus() }
    }
    document.addEventListener("pointerdown", onDown)
    document.addEventListener("keydown", onKey)
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey) }
  }, [open])

  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined
  return (
    <div className="vv-datepicker" ref={wrapRef}>
      <span id={`${id}-label`} className="vv-datepicker__label">{label}</span>
      <button
        ref={btnRef}
        type="button"
        className={`vv-datepicker__field${error ? " vv-datepicker__field--invalid" : ""}`}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-describedby={describedBy}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
      >
        <span id={`${id}-value`} className={value ? undefined : "vv-datepicker__placeholder"}>{text || placeholder}</span>
        <Icon name="calendar" size={16} />
      </button>
      {hint && !error && <span id={`${id}-hint`} className="vv-datepicker__hint">{hint}</span>}
      {error && <div id={`${id}-error`}><InlineMessage tone="critical">{error}</InlineMessage></div>}
      {open && (
        <div role="dialog" aria-label={`${label}: calendar`} className="vv-datepicker__popover">
          <Calendar
            {...calendar}
            locale={locale}
            value={value}
            autoFocus={!defaultOpen}
            onChange={(d) => { onChange(d); setOpen(false); btnRef.current?.focus() }}
          />
        </div>
      )}
    </div>
  )
}
