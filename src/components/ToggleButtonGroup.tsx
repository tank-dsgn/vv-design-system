import type { ReactNode } from "react"
import { ToggleButton } from "./ToggleButton.js"
import "./ToggleButtonGroup.css"

export type ToggleButtonGroupItem = { value: string; label: string; icon?: ReactNode; iconOnly?: boolean; disabled?: boolean }

export type ToggleButtonGroupProps = {
  /** Names the group for screen readers. */
  label: string
  items: ToggleButtonGroupItem[]
  /** Pressed values. Any number can be on, or off. */
  value: string[]
  onChange: (value: string[]) => void
  size?: "sm" | "md"
}

/** Toggles joined in one row, each on or off independently. */
export function ToggleButtonGroup({ label, items, value, onChange, size = "md" }: ToggleButtonGroupProps) {
  return (
    <div role="group" aria-label={label} className="vv-toggle-group">
      {items.map((it) => (
        <ToggleButton
          key={it.value}
          size={size}
          icon={it.icon}
          disabled={it.disabled}
          aria-label={it.iconOnly ? it.label : undefined}
          pressed={value.includes(it.value)}
          onChange={(on) => onChange(on ? [...value, it.value] : value.filter((v) => v !== it.value))}
        >
          {it.iconOnly ? null : it.label}
        </ToggleButton>
      ))}
    </div>
  )
}
