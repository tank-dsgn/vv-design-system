import { useId, useState, type ReactNode } from "react"
import "./Accordion.css"

export type AccordionItem = {
  id: string
  title: string
  content: ReactNode
  disabled?: boolean
}

export type AccordionProps = {
  items: AccordionItem[]
  /** Let several sections stay open at once. */
  allowMultiple?: boolean
  defaultOpen?: string[]
  /** Heading level of the section titles, to fit the page outline. */
  headingLevel?: 2 | 3 | 4
}

const Chevron = () => (
  <svg className="vv-accordion__chevron" viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true" focusable="false">
    <path d="M6.7 8.3 10 11.6l3.3-3.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** Sections that expand one at a time, to keep a long page scannable.
 *  Each title is a button inside a heading, with `aria-expanded`; the panel
 *  is a labelled region. */
export function Accordion({ items, allowMultiple = false, defaultOpen = [], headingLevel = 3 }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen)
  const base = useId()
  const H = `h${headingLevel}` as "h3"
  const toggle = (id: string) =>
    setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : allowMultiple ? [...o, id] : [id]))
  return (
    <div className="vv-accordion">
      {items.map((it) => {
        const isOpen = open.includes(it.id)
        const btn = `${base}-${it.id}-btn`
        const panel = `${base}-${it.id}-panel`
        return (
          <div key={it.id} className="vv-accordion__item" data-open={isOpen || undefined}>
            <H className="vv-accordion__heading">
              <button
                id={btn}
                type="button"
                className="vv-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panel}
                disabled={it.disabled}
                onClick={() => toggle(it.id)}
              >
                <span>{it.title}</span>
                <Chevron />
              </button>
            </H>
            <div id={panel} role="region" aria-labelledby={btn} className="vv-accordion__panel" hidden={!isOpen}>
              {it.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
