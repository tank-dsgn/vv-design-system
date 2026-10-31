import { useId, useRef, useState } from "react"
import { Icon } from "./Icon.js"
import { Input } from "./Input.js"
import { Label } from "./Label.js"
import "./Combobox.css"

export type ComboboxOption = { value: string; label: string }

export type ComboboxProps = {
  label: string
  options: ComboboxOption[]
  value: string | null
  onChange: (value: string | null) => void
  placeholder?: string
  /** Start open, for documentation. */
  defaultOpen?: boolean
  disabled?: boolean
  /** Replaces the list's silence: says what to fix, and is announced. */
  error?: string
}

/** A text field that filters a list as you type.
 *
 *  Follows the WAI-ARIA combobox pattern: focus stays in the field and
 *  `aria-activedescendant` marks the highlighted option. ↑/↓ move, Enter picks,
 *  Esc closes; leaving the field restores the chosen value's label. */
export function Combobox({ label, options, value, onChange, placeholder, defaultOpen = false, disabled = false, error }: ComboboxProps) {
  const id = useId()
  const listId = `${id}-list`
  const chosen = options.find((o) => o.value === value)?.label ?? ""
  const [text, setText] = useState(chosen)
  const [typing, setTyping] = useState(false)
  const [open, setOpen] = useState(defaultOpen)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const shown = typing ? options.filter((o) => o.label.toLowerCase().includes(text.toLowerCase())) : options
  const pick = (o: ComboboxOption) => {
    onChange(o.value)
    setText(o.label)
    setTyping(false)
    setOpen(false)
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      if (!open) { setOpen(true); return }
      if (shown.length) setActive((active + (e.key === "ArrowDown" ? 1 : -1) + shown.length) % shown.length)
    } else if (e.key === "Enter" && open && shown[active]) {
      e.preventDefault()
      pick(shown[active])
    } else if (e.key === "Escape" && open) {
      e.preventDefault()
      setOpen(false)
    }
  }

  return (
    <div className="vv-combobox">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        ref={inputRef}
        role="combobox"
        disabled={disabled}
        invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open && shown[active] ? `${id}-${shown[active].value}` : undefined}
        autoComplete="off"
        placeholder={placeholder}
        value={text}
        onChange={(e) => { setText(e.target.value); setTyping(true); setOpen(true); setActive(0) }}
        onClick={() => setOpen(true)}
        onKeyDown={onKey}
        onBlur={() => { setOpen(false); setTyping(false); setText(chosen) }}
      />
      {error && <p id={`${id}-error`} role="alert" className="vv-combobox__error">{error}</p>}
      {open && (
        <ul id={listId} role="listbox" aria-label={label} className="vv-combobox__list">
          {shown.map((o, i) => (
            <li
              key={o.value}
              id={`${id}-${o.value}`}
              role="option"
              aria-selected={o.value === value}
              className={i === active ? "vv-combobox__option vv-combobox__option--active" : "vv-combobox__option"}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => { e.preventDefault(); pick(o) }}
            >
              {o.label}
              {o.value === value && <Icon name="check" size={16} />}
            </li>
          ))}
          {shown.length === 0 && <li role="option" aria-selected={false} aria-disabled="true" className="vv-combobox__empty">Nothing matches “{text}”</li>}
        </ul>
      )}
    </div>
  )
}
