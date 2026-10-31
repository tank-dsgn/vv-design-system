import "./Suggestion.css"

export type SuggestionProps = {
  /** Names the group. */
  label?: string
  items: string[]
  onSelect: (text: string) => void
  disabled?: boolean
}

/** Ready-made prompts: what an assistant can do here, one click away. */
export function Suggestion({ label = "Suggested questions", items, onSelect, disabled = false }: SuggestionProps) {
  return (
    <div role="group" aria-label={label} className="vv-suggestions">
      {items.map((t) => <button key={t} type="button" className="vv-suggestion" disabled={disabled} onClick={() => onSelect(t)}>{t}</button>)}
    </div>
  )
}
