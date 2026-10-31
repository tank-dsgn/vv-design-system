import type { ReactNode } from "react"
import { IconButton } from "./IconButton.js"
import "./ActionBar.css"

export type ActionBarItem = { id: string; label: string; icon: ReactNode; disabled?: boolean }

export type ActionBarProps = {
  /** Names the group: "Message actions". */
  label: string
  items: ActionBarItem[]
  onSelect: (id: string) => void
}

/** A compact row of icon actions under a message or a block of content. */
export function ActionBar({ label, items, onSelect }: ActionBarProps) {
  return (
    <div role="group" aria-label={label} className="vv-action-bar">
      {items.map((it) => (
        <IconButton key={it.id} variant="ghost" size="sm" label={it.label} icon={it.icon} disabled={it.disabled} onClick={() => onSelect(it.id)} />
      ))}
    </div>
  )
}
