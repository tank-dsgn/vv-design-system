import { ICONS, type IconName } from "../icons/icons.js"

export type { IconName }

export type IconProps = {
  name: IconName
  /** Rendered size in px. The source artwork is drawn on a 20px grid. */
  size?: 16 | 20 | 24
  /** Give a label only when the icon is the sole carrier of meaning. Next to
   *  visible text an icon is decoration, and announcing it again is noise. */
  label?: string
}

/** An icon from the VV 2.0 icon set.
 *
 *  The markup is the Figma export itself, with its black strokes switched to
 *  `currentColor` — so an icon always matches the text it sits beside, in both
 *  themes, without a colour prop. */
export function Icon({ name, size = 20, label }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      style={{ flex: "none", display: "block" }}
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
    />
  )
}
