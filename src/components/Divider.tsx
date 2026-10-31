import "./Divider.css"

export type DividerProps = {
  orientation?: "horizontal" | "vertical"
  /** Text in the middle of a horizontal divider, e.g. "or". */
  label?: string
  /** Space around the line. */
  spacing?: "none" | "sm" | "md"
}

/** A hairline between groups, for when spacing alone does not separate them. */
export function Divider({ orientation = "horizontal", label, spacing = "md" }: DividerProps) {
  if (label && orientation === "horizontal") {
    return (
      <div role="separator" aria-label={label} className={`vv-divider vv-divider--label vv-divider--${spacing}`}>
        <span aria-hidden="true">{label}</span>
      </div>
    )
  }
  return <div role="separator" aria-orientation={orientation} className={`vv-divider vv-divider--${orientation} vv-divider--${spacing}`} />
}
