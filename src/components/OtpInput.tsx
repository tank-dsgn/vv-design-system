import { useRef } from "react"
import "./OtpInput.css"

export type OtpInputProps = {
  /** Names the whole code for screen readers. */
  label: string
  length?: number
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
}

/** A one-time code, one box per digit. Typing advances, Backspace returns,
 *  arrows move, and pasting the whole code fills every box. */
export function OtpInput({ label, length = 6, value, onChange, error, disabled }: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const focus = (i: number) => refs.current[Math.max(0, Math.min(length - 1, i))]?.focus()

  const setAt = (i: number, d: string) => {
    const chars = value.padEnd(length, " ").split("")
    chars[i] = d || " "
    onChange(chars.join("").trimEnd())
  }

  return (
    <div>
      <div role="group" aria-label={label} className="vv-otp">
        {Array.from({ length }, (_, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el }}
            className={error ? "vv-otp__box vv-otp__box--error" : "vv-otp__box"}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            maxLength={1}
            aria-label={`Digit ${i + 1} of ${length}`}
            aria-invalid={error ? true : undefined}
            disabled={disabled}
            value={value[i]?.trim() ?? ""}
            onChange={(e) => {
              const d = e.target.value.replace(/\D/g, "").slice(-1)
              setAt(i, d)
              if (d) focus(i + 1)
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !value[i]?.trim()) { e.preventDefault(); setAt(i - 1, ""); focus(i - 1) }
              else if (e.key === "ArrowLeft") { e.preventDefault(); focus(i - 1) }
              else if (e.key === "ArrowRight") { e.preventDefault(); focus(i + 1) }
            }}
            onPaste={(e) => {
              e.preventDefault()
              const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
              onChange(digits)
              focus(digits.length)
            }}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
      {error && <p role="alert" className="vv-otp__error">{error}</p>}
    </div>
  )
}
