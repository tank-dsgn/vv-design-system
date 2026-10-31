import { Icon, type IconName } from "./Icon.js"
import { IconButton } from "./IconButton.js"
import "./Attachments.css"

export type Attachment = { id: string; name: string; size?: string; kind?: "file" | "image" | "pdf" }

export type AttachmentsProps = {
  items: Attachment[]
  /** Shows a remove button on each item. */
  onRemove?: (id: string) => void
}

const ICONS: Record<NonNullable<Attachment["kind"]>, IconName> = { file: "file", image: "image", pdf: "pdf" }

/** Files added to a message, before and after sending. */
export function Attachments({ items, onRemove }: AttachmentsProps) {
  return (
    <ul className="vv-attachments" aria-label="Attachments">
      {items.map((a) => (
        <li key={a.id} className="vv-attachment">
          <Icon name={ICONS[a.kind ?? "file"]} size={16} />
          <span className="vv-attachment__name">{a.name}</span>
          {a.size && <span className="vv-attachment__size">{a.size}</span>}
          {onRemove && <IconButton variant="ghost" size="xs" label={`Remove ${a.name}`} icon={<Icon name="close" size={16} />} onClick={() => onRemove(a.id)} />}
        </li>
      ))}
    </ul>
  )
}
