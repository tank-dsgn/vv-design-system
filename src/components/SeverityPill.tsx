import "./SeverityPill.css"

export type Severity = "low" | "medium" | "high" | "critical"

export type SeverityPillProps = { severity: Severity }

const LEVEL: Record<Severity, number> = { low: 1, medium: 2, high: 3, critical: 4 }
const WORD: Record<Severity, string> = { low: "Low", medium: "Medium", high: "High", critical: "Critical" }

/** How serious something is, on a fixed scale of four. Bars and word say it
 *  together, so it survives without colour. */
export function SeverityPill({ severity }: SeverityPillProps) {
  return (
    <span className={`vv-severity vv-severity--${severity}`}>
      <span className="vv-severity__bars" aria-hidden="true">
        {[1, 2, 3, 4].map((n) => <span key={n} className={n <= LEVEL[severity] ? "vv-severity__bar vv-severity__bar--on" : "vv-severity__bar"} />)}
      </span>
      {WORD[severity]}
    </span>
  )
}
