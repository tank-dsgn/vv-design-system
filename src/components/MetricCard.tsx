import "./MetricCard.css"

export type MetricCardProps = {
  label: string
  value: string
  /** Signed change, e.g. "+32%". The sign stays in the text. */
  delta: string
  /** The comparison period, e.g. "vs 2 weeks ago". */
  period: string
  /** Whether the change is good or bad news. Direction cannot decide this —
   *  "+54% overdue" is bad, "+54% collected" is good. */
  sentiment?: "good" | "bad" | "neutral"
}

/** A headline number with its change.
 *
 *  The status dot repeats the sentiment for scanning a row of cards; the
 *  words "up"/"down" and the sign carry it for everyone else, so colour is
 *  never the only signal. Renders a `dl`. */
export function MetricCard({ label, value, delta, period, sentiment = "neutral" }: MetricCardProps) {
  const tone = sentiment === "neutral" ? "" : ` vv-metric__dot--${sentiment}`
  return (
    <dl className="vv-metric">
      <dt className="vv-metric__label">
        <span className={`vv-metric__dot${tone}`} aria-hidden="true" />
        {label}
      </dt>
      <dd className="vv-metric__value">{value}</dd>
      <dd className="vv-metric__change">
        <span className={`vv-metric__delta${sentiment === "neutral" ? "" : ` vv-metric__delta--${sentiment}`}`}>
          {delta}
        </span>
        {period}
      </dd>
    </dl>
  )
}
