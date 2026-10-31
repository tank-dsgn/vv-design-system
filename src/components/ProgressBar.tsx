import "./ProgressBar.css"

export type ProgressBarProps = {
  /** 0–100. Values outside the range are clamped rather than drawn past the
   *  track. */
  value: number
  /** What is progressing. The bar has no visible label of its own, so this is
   *  the only name a screen reader gets. */
  label: string
  /** Print the percentage beside the bar. On by default: a bar alone is hard
   *  to read to the nearest ten percent, and a table of them is harder. */
  showValue?: boolean
}

export function ProgressBar({ value, label, showValue = true }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div className={`vv-progress${pct === 100 ? " vv-progress--complete" : ""}`}>
      {showValue && (
        // The number is already announced through aria-valuenow.
        <span className="vv-progress__value" aria-hidden="true">
          {pct}%
        </span>
      )}
      <div
        className="vv-progress__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div className="vv-progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
