import { Collapsible } from "./Collapsible.js"
import "./Sources.css"

export type Source = { title: string; href: string; site?: string }

export type SourcesProps = {
  items: Source[]
  defaultOpen?: boolean
}

/** What a generated answer was based on, collapsed under it. */
export function Sources({ items, defaultOpen = false }: SourcesProps) {
  return (
    <Collapsible defaultOpen={defaultOpen} title={`${items.length} ${items.length === 1 ? "source" : "sources"}`}>
      <ol className="vv-sources">
        {items.map((s) => (
          <li key={s.href}>
            <a href={s.href}>{s.title}</a>
            {s.site && <span className="vv-sources__site"> {s.site}</span>}
          </li>
        ))}
      </ol>
    </Collapsible>
  )
}
