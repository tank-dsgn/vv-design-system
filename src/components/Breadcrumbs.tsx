import { useState } from "react"
import { Icon } from "./Icon.js"
import "./Breadcrumbs.css"

export type Crumb = { label: string; href?: string }

export type BreadcrumbsProps = {
  /** From the root to the current page. The last item is the current page. */
  items: Crumb[]
  /** Above this many, middle items fold into an expandable "…". */
  maxItems?: number
}

const Sep = () => (
  <span className="vv-crumbs__sep" aria-hidden="true"><Icon name="chevron-right" size={16} /></span>
)

/** Where the page sits in the hierarchy, with a way back up. */
export function Breadcrumbs({ items, maxItems = 4 }: BreadcrumbsProps) {
  const [expanded, setExpanded] = useState(false)
  const folded = !expanded && items.length > maxItems
  const shown: (Crumb | "fold")[] = folded ? [items[0], "fold", ...items.slice(-(maxItems - 2))] : items
  return (
    <nav aria-label="Breadcrumb" className="vv-crumbs">
      <ol>
        {shown.map((c, i) => {
          const last = i === shown.length - 1
          return (
            <li key={c === "fold" ? "fold" : `${c.label}-${i}`}>
              {c === "fold" ? (
                <button type="button" className="vv-crumbs__fold" aria-label="Show all levels" onClick={() => setExpanded(true)}>…</button>
              ) : last ? (
                <span aria-current="page" className="vv-crumbs__current">{c.label}</span>
              ) : (
                <a href={c.href ?? "#"} className="vv-crumbs__link">{c.label}</a>
              )}
              {!last && <Sep />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
