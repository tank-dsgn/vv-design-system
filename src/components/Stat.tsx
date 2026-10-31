import "./Stat.css"

export type StatProps = {
  label: string
  value: string
  /** The line under the number: a comparison or a caveat. */
  note?: string
  /** Whether the change in `note` is good or bad news.
   *
   *  Direction alone cannot decide this: "+44 findings" is bad, "+44 resolved"
   *  is good. So the caller says what it means, and colour follows. The sign
   *  stays in the text either way — colour is never the only carrier. */
  sentiment?: "good" | "bad" | "neutral"
}

export function Stat({ label, value, note, sentiment = "neutral" }: StatProps) {
  return (
    <div className="vv-stat">
      <dt className="vv-stat__label">{label}</dt>
      <dd className="vv-stat__value">{value}</dd>
      {note && (
        <dd
          className={`vv-stat__note${
            sentiment === "neutral" ? "" : ` vv-stat__note--${sentiment}`
          }`}
          style={{ margin: 0 }}
        >
          {note}
        </dd>
      )}
    </div>
  )
}
