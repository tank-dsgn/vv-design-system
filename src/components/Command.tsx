import { useId, useState, type ReactNode } from "react"
import { Icon } from "./Icon.js"
import { Kbd } from "./Kbd.js"
import "./Command.css"

export type CommandItem = { id: string; label: string; icon?: ReactNode; shortcut?: string }
export type CommandGroup = { title: string; items: CommandItem[] }

export type CommandProps = {
  groups: CommandGroup[]
  onSelect: (id: string) => void
  placeholder?: string
}

/** A search field over everything the app can do. Focus stays in the field;
 *  ↑/↓ move the highlight, Enter runs it. */
export function Command({ groups, onSelect, placeholder = "Type a command" }: CommandProps) {
  const id = useId()
  const [text, setText] = useState("")
  const [active, setActive] = useState(0)
  const q = text.toLowerCase()
  const shown = groups.map((g) => ({ ...g, items: g.items.filter((i) => i.label.toLowerCase().includes(q)) })).filter((g) => g.items.length)
  const flat = shown.flatMap((g) => g.items)

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      if (flat.length) setActive((active + (e.key === "ArrowDown" ? 1 : -1) + flat.length) % flat.length)
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault()
      onSelect(flat[active].id)
    }
  }

  return (
    <div className="vv-command">
      <div className="vv-command__search">
        <Icon name="search" size={16} />
        <input
          role="combobox"
          aria-expanded="true"
          aria-controls={`${id}-list`}
          aria-label="Search commands"
          aria-activedescendant={flat[active] ? `${id}-${flat[active].id}` : undefined}
          placeholder={placeholder}
          value={text}
          onChange={(e) => { setText(e.target.value); setActive(0) }}
          onKeyDown={onKey}
        />
      </div>
      <div id={`${id}-list`} role="listbox" aria-label="Commands" className="vv-command__list">
        {shown.map((g) => (
          <div key={g.title} role="group" aria-label={g.title}>
            <div className="vv-command__group" aria-hidden="true">{g.title}</div>
            {g.items.map((it) => (
              <div
                key={it.id}
                id={`${id}-${it.id}`}
                role="option"
                aria-selected={flat[active]?.id === it.id}
                className="vv-command__item"
                onMouseEnter={() => setActive(flat.indexOf(it))}
                onMouseDown={(e) => { e.preventDefault(); onSelect(it.id) }}
              >
                {it.icon && <span className="vv-command__icon">{it.icon}</span>}
                <span className="vv-command__label">{it.label}</span>
                {it.shortcut && <Kbd>{it.shortcut}</Kbd>}
              </div>
            ))}
          </div>
        ))}
        {flat.length === 0 && <p className="vv-command__empty">No commands match “{text}”</p>}
      </div>
    </div>
  )
}
