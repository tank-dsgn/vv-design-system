import type { ReactNode } from "react"
import "./Tabs.css"

export type TabsSize = "sm" | "md"

export type TabItem = {
  id: string
  label: string
  // Figma: Type=icon left / icon right — two slots instead of six variant
  // combinations (SPEC.md §4).
  /** An icon before the label. */
  iconLeading?: ReactNode
  iconTrailing?: ReactNode
  // Figma: Type=text+counter.
  /** The number of items in this view. */
  counter?: number
  disabled?: boolean
}

export type TabsProps = {
  items: TabItem[]
  value: string
  onChange: (id: string) => void
  size?: TabsSize
  "aria-label": string
}

export function Tabs({
  items,
  value,
  onChange,
  size = "md",
  "aria-label": ariaLabel,
}: TabsProps) {
  /* Arrow keys move between tabs — expected tablist behaviour, and absent from
     all 40 Figma variants, which draw appearance only. Disabled tabs are
     skipped, or the keyboard gets stuck on them. */
  const move = (dir: 1 | -1, from: number) => {
    const n = items.length
    for (let step = 1; step <= n; step++) {
      const next = items[(from + dir * step + n * step) % n]
      if (next && !next.disabled) {
        onChange(next.id)
        return
      }
    }
  }

  return (
    <div className="vv-tabs" role="tablist" aria-label={ariaLabel}>
      {items.map((item, i) => (
        <button
          key={item.id}
          className={`vv-tab vv-tab--${size}`}
          role="tab"
          type="button"
          aria-selected={item.id === value}
          // Roving tabindex: Tab reaches one tab, arrows do the rest.
          tabIndex={item.id === value ? 0 : -1}
          disabled={item.disabled}
          onClick={() => onChange(item.id)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") move(1, i)
            if (e.key === "ArrowLeft") move(-1, i)
          }}
        >
          {item.iconLeading}
          {item.label}
          {item.counter !== undefined && (
            <span className="vv-tab__counter">{item.counter}</span>
          )}
          {item.iconTrailing}
        </button>
      ))}
    </div>
  )
}
