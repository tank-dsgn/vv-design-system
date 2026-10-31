import { forwardRef, type ReactNode } from "react"
import { Button, type ButtonProps, type ButtonSize } from "./Button.js"
import "./IconButton.css"

/** Five types from Figma. `link` is not ported: an underlined icon with no
 *  text says nothing, and without the underline `link` is indistinguishable
 *  from `ghost`. Figma omits it too — a coincidence here, not a deviation. */
export type IconButtonVariant =
  | "primary"
  | "secondary"
  | "destructive"
  | "outlined"
  | "ghost"

export type IconButtonProps = Omit<
  ButtonProps,
  "variant" | "iconLeading" | "iconTrailing" | "children"
> & {
  variant?: IconButtonVariant
  size?: ButtonSize
  icon: ReactNode
  /** Required label.
   *
   *  A button with no text has no accessible name: a screen reader announces
   *  it as plain "button". Hence a required prop rather than an option — a
   *  component that can be used wrongly eventually will be. */
  label: string
}

/** IconButton built on top of Button.
 *
 *  There is deliberately no separate implementation: variant colours, states
 *  and the focus ring must match Button byte for byte. Copied styles drift
 *  apart on the first edit — which is exactly how the source Figma file ended
 *  up with five different dropdowns.
 *
 *  Figma gives Icon Button three sizes (24/32/40) against Button's four. Four
 *  here: an icon button sits in a row with a regular one, and without 48px the
 *  row does not line up. See MAPPING.md, decision #5. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ icon, label, size = "md", loading, ...props }, ref) {
    return (
      <Button
        ref={ref}
        size={size}
        loading={loading}
        // Hook for the geometry in IconButton.css. Button refuses a className
        // prop by design — a data attribute rides through ...props without
        // opening its styles to the outside.
        data-icon-only=""
        // The name arrives here: the button holds an icon and no text.
        aria-label={label}
        // Native tooltip, for anyone hovering who does not know the icon.
        title={label}
        {...props}
      >
        {!loading && (
          <span className="vv-icon-button__glyph" aria-hidden="true">
            {icon}
          </span>
        )}
      </Button>
    )
  },
)
