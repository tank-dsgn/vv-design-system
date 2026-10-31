import type { ReactNode } from "react"
import "./DescriptionList.css"

export type DescriptionItem = { term: string; description: ReactNode }

export type DescriptionListProps = {
  items: DescriptionItem[]
  /** `row`: term beside value, for detail panels. `column`: term above, for narrow spaces. */
  layout?: "row" | "column"
}

/** Facts about one object as label–value pairs — a shipment's details, an
 *  invoice's terms. A real `dl`, so each value stays paired with its label. */
export function DescriptionList({ items, layout = "row" }: DescriptionListProps) {
  return (
    <dl className={`vv-dl vv-dl--${layout}`}>
      {items.map((i) => (
        <div key={i.term} className="vv-dl__row">
          <dt>{i.term}</dt>
          <dd>{i.description}</dd>
        </div>
      ))}
    </dl>
  )
}
