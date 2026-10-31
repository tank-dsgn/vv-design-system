import { HoverCard } from "./HoverCard.js"
import "./InlineCitation.css"

export type InlineCitationProps = {
  /** The source's number in the answer. */
  index: number
  title: string
  href: string
  /** A line from the source. */
  excerpt?: string
  defaultOpen?: boolean
}

/** A numbered link to a source, inside a sentence, with a preview on hover. */
export function InlineCitation({ index, title, href, excerpt, defaultOpen }: InlineCitationProps) {
  return (
    <HoverCard
      defaultOpen={defaultOpen}
      trigger={<a className="vv-citation" href={href} aria-label={`Source ${index}: ${title}`}>{index}</a>}
    >
      <b>{title}</b>
      {excerpt && <><br />{excerpt}</>}
    </HoverCard>
  )
}
