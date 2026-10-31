import { Icon } from "./Icon.js"
import { IconButton } from "./IconButton.js"
import { Spinner } from "./Spinner.js"
import "./Queue.css"

export type QueueItem = { id: string; title: string; running?: boolean }

export type QueueProps = {
  /** Names the list. */
  label: string
  items: QueueItem[]
  /** Shows a remove button on items that have not started. */
  onRemove?: (id: string) => void
}

/** Work waiting its turn, in order. */
export function Queue({ label, items, onRemove }: QueueProps) {
  return (
    <ol className="vv-queue" aria-label={label}>
      {items.map((it, i) => (
        <li key={it.id} className="vv-queue__item">
          <span className="vv-queue__pos">{it.running ? <Spinner size="sm" label={`Running ${it.title}`} /> : i + 1}</span>
          <span className="vv-queue__title">{it.title}</span>
          {onRemove && !it.running && <IconButton variant="ghost" size="xs" label={`Remove ${it.title}`} icon={<Icon name="close" size={16} />} onClick={() => onRemove(it.id)} />}
        </li>
      ))}
    </ol>
  )
}
