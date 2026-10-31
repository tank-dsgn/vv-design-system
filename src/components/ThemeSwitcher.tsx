import { SegmentedControl } from "./SegmentedControl.js"

export type Theme = "light" | "dark" | "system"

export type ThemeSwitcherProps = {
  value: Theme
  onChange: (theme: Theme) => void
  size?: "sm" | "md"
}

const OPTIONS = [{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }, { value: "system", label: "System" }]

/** Picks the interface theme. Applying it is the app's job: put `.dark` on
 *  `<html>`, or leave it to the system preference. */
export function ThemeSwitcher({ value, onChange, size }: ThemeSwitcherProps) {
  return <SegmentedControl aria-label="Theme" options={OPTIONS} value={value} onChange={(v) => onChange(v as Theme)} size={size} />
}
