import { useId, useState, type ReactNode } from "react"
import "./FilterList.css"

export type FilterItem = {
  id: string
  label: string
  count?: number
}

export type FilterSection = {
  id: string
  label: string
  icon?: ReactNode
  items: FilterItem[]
  defaultOpen?: boolean
}

export type FilterListProps = {
  title: string
  sections: FilterSection[]
  value: string
  onChange: (id: string) => void
  /** Chevron glyphs, passed in so this component does not import the icon set
   *  and stays usable with any. */
  chevronOpen?: ReactNode
  chevronClosed?: ReactNode
}

/** A filter tree: collapsible sections of mutually exclusive filters.
 *
 *  Filters are buttons with `aria-pressed`, not links — choosing one changes
 *  what this page shows, it does not go anywhere. An item with a count of zero
 *  is disabled rather than hidden: the reader still learns the category exists
 *  and that nothing is in it, instead of wondering where it went. */
export function FilterList({
  title,
  sections,
  value,
  onChange,
  chevronOpen = "▴",
  chevronClosed = "▾",
}: FilterListProps) {
  const baseId = useId()
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.map((s) => [s.id, s.defaultOpen ?? false])),
  )
  const titleId = `${baseId}-title`

  return (
    <section className="vv-filters" aria-labelledby={titleId}>
      <h2 className="vv-filters__title" id={titleId}>
        {title}
      </h2>
      {sections.map((section) => {
        const panelId = `${baseId}-${section.id}`
        const isOpen = open[section.id]
        return (
          <div key={section.id}>
            <button
              className="vv-filters__section-toggle"
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen((o) => ({ ...o, [section.id]: !o[section.id] }))}
            >
              {section.icon}
              <span className="vv-filters__section-label">{section.label}</span>
              <span aria-hidden="true">{isOpen ? chevronOpen : chevronClosed}</span>
            </button>
            {/* `hidden`, not unmounted: aria-controls must point at an element
                that exists. */}
            <ul className="vv-filters__items" id={panelId} hidden={!isOpen}>
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    className="vv-filters__item"
                    type="button"
                    aria-pressed={item.id === value}
                    disabled={item.count === 0}
                    onClick={() => onChange(item.id)}
                  >
                    {item.label}
                    {item.count !== undefined && (
                      <span className="vv-filters__count">{item.count}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </section>
  )
}
