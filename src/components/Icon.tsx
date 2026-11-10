import { ICONS, ICONS_FILLED, type IconName } from "../icons/icons.js"

export type { IconName }

export type IconProps = {
  name: IconName
  /** Rendered size in px. The source artwork is drawn on a 20px grid. */
  size?: 16 | 20 | 24
  /** The Fill style: for a selected or active state, such as the current page
   *  in navigation. Icons outside our set have no fill and stay outlined. */
  filled?: boolean
  /** Give a label only when the icon is the sole carrier of meaning. Next to
   *  visible text an icon is decoration, and announcing it again is noise. */
  label?: string
}

/** An icon from the VV Foundations set, drawn by Phosphor in two styles.
 *
 *  The markup is one path in `currentColor`, so an icon always matches the
 *  text it sits beside, in both themes, without a colour prop. */
export function Icon({ name, size = 20, filled = false, label }: IconProps) {
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
      dangerouslySetInnerHTML={{ __html: (filled && ICONS_FILLED[name]) || ICONS[name] }}
    />
  )
}
