import type { ReactNode } from "react"
import "./Card.css"

export type CardProps = {
  title: string
  meta?: ReactNode
  // Figma's Media card also has a video type; the shape is the same, so a
  // video goes in `media` as a node rather than as a second variant.
  /** Image URL for the media slot. For anything else — video, a map — use `media`. */
  image?: string
  media?: ReactNode
  footer?: ReactNode
  children?: ReactNode
  /** Turns the whole card into one button. */
  onClick?: () => void
  selected?: boolean
}

/** One Card for Figma's Product Card, Media card and Category card.
 *
 *  All three are the same structure — media, title, meta, footer — filled with
 *  different content. Shipping three components would mean maintaining one
 *  hover, one focus ring and one radius three times over.
 *
 *  An interactive card renders as a real `<button>`, not a `<div onClick>`:
 *  that is what puts it in the tab order and makes Space and Enter work. */
export function Card({
  title,
  meta,
  image,
  media,
  footer,
  children,
  onClick,
  selected = false,
}: CardProps) {
  const interactive = Boolean(onClick)
  const Tag = interactive ? "button" : "div"

  return (
    <Tag
      className={[
        "vv-card",
        interactive ? "vv-card--interactive" : "",
        selected ? "vv-card--selected" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      type={interactive ? "button" : undefined}
      aria-pressed={interactive ? selected : undefined}
    >
      {media ??
        (image && (
          // Decorative: the title right below already names the thing.
          <img className="vv-card__media" src={image} alt="" />
        ))}
      <div className="vv-card__body">
        <span className="vv-card__title">{title}</span>
        {meta && <span className="vv-card__meta">{meta}</span>}
        {children}
      </div>
      {footer && <div className="vv-card__footer">{footer}</div>}
    </Tag>
  )
}
