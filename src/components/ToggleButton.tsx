import type { ButtonHTMLAttributes, ReactNode } from "react"
import "./ToggleButton.css"

export type ToggleButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "className" | "aria-pressed"> & {
  pressed: boolean
  onChange: (pressed: boolean) => void
  icon?: ReactNode
  size?: "sm" | "md"
  /** Required when the toggle shows only an icon. */
  "aria-label"?: string
}

/** A button that stays on until pressed again. */
export function ToggleButton({ pressed, onChange, icon, size = "md", children, ...props }: ToggleButtonProps) {
  return (
    <button type="button" aria-pressed={pressed} className={`vv-toggle vv-toggle--${size}`} onClick={() => onChange(!pressed)} {...props}>
      {icon && <span className="vv-toggle__icon">{icon}</span>}
      {children}
    </button>
  )
}
