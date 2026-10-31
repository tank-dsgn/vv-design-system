import type { ReactNode } from "react"
import "./Avatar.css"

export type AvatarSize = "xs" | "sm" | "md" | "lg"

/** Tones taken from Figma variants. The file spells one `MAngeta`; here it is
 *  `magenta`. */
export type AvatarTone =
  | "neutral"
  | "blue"
  | "magenta"
  | "orange"
  | "purple"
  | "green"
  | "red"

/** From the second Avatar in the file, which carries `form=square | cirkle`
 *  (the file's own spelling of "circle", across all twelve variants). */
export type AvatarShape = "circle" | "rounded"

export type AvatarProps = {
  size?: AvatarSize
  tone?: AvatarTone
  shape?: AvatarShape
  // Figma: Type=picture.
  /** Image URL. Shown instead of initials when it loads. */
  src?: string
  // Figma: Type=text. Initials are derived, never passed: two sources of
  // truth about one person drift apart.
  /** Full name. Gives the accessible name and the initials. */
  name?: string
  // Figma: Type=icon.
  /** An icon instead of initials, for a team, a bot or an unknown user. */
  icon?: ReactNode
}

/** Figma's `Type=logos` is deliberately not ported.
 *
 *  In the file it is 12 variants carrying real customer logos, baked into the
 *  design system. A customer's logo is data, not a component: it changes
 *  without a system release and should not require editing one. Pass it as
 *  `src`. See MAPPING.md §8. */
export function Avatar({
  size = "md",
  tone = "neutral",
  shape = "circle",
  src,
  name,
  icon,
}: AvatarProps) {
  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("")
    : ""

  return (
    <span
      className={`vv-avatar vv-avatar--${size} vv-avatar--${tone} vv-avatar--${shape}`}
      // An avatar with no name is decoration; there is nothing for a screen
      // reader to announce.
      role={name ? "img" : undefined}
      aria-label={name || undefined}
      aria-hidden={name ? undefined : true}
    >
      {src ? (
        <img className="vv-avatar__image" src={src} alt="" />
      ) : (
        icon ?? initials
      )}
    </span>
  )
}
