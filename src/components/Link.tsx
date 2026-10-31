import type { AnchorHTMLAttributes, ReactNode } from "react"
import "./Link.css"

export type LinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className"
> & {
  children: ReactNode
}

/** A link, not a button.
 *
 *  The underline stays. It is the only cue that survives for a reader who
 *  cannot separate the link colour from the body colour, and this system's
 *  accent is a mid blue on white — well inside the range where that happens.
 *
 *  Anything that acts on the current page is a `Button` with `variant="link"`,
 *  not this. The difference is not visual: a link is followed with Enter and
 *  offers "open in new tab", a button is pressed with Space and does not. */
export function Link({ children, target, rel, ...props }: LinkProps) {
  return (
    <a
      className="vv-link"
      target={target}
      // A new tab hands the opened page a handle on this one unless it is cut.
      rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
      {...props}
    >
      {children}
    </a>
  )
}
