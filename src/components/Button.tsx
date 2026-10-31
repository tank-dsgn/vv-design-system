import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"
import "./Button.css"

/** Variants mirror Figma's `Type`, renamed to SPEC.md's canonical values.
 *  `Critical` in the tokens and `Destructive` on the component are the same
 *  thing; the clash is settled in favour of `destructive`. See MAPPING.md. */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "destructive"
  | "outlined"
  | "ghost"
  | "link"

/** Four sizes, as in Figma: 24 / 32 / 40 / 48.
 *  SPEC.md defines three — the deviation is recorded in MAPPING.md. */
export type ButtonSize = "xs" | "sm" | "md" | "lg"

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> & {
  variant?: ButtonVariant
  size?: ButtonSize
  // Figma: state=loading. SPEC.md: loading cancels hover and pressed.
  /** Replaces the label with a spinner and disables the button until the
   *  action finishes. */
  loading?: boolean
  iconLeading?: ReactNode
  iconTrailing?: ReactNode
  children?: ReactNode
}

/** The ref is forwarded deliberately.
 *
 *  Without it the button cannot be focused programmatically — which is exactly
 *  what a confirmation of an irreversible action needs, where focus must land
 *  on the safe choice. A component you cannot focus simply does not fit that
 *  flow. Found while building the prototype. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    iconLeading,
    iconTrailing,
    children,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`vv-button vv-button--${variant} vv-button--${size}`}
      disabled={disabled || loading}
      // Loading is not only a picture: without aria-busy a screen reader
      // says nothing about it.
      aria-busy={loading || undefined}
      type="button"
      {...props}
    >
      {loading ? (
        <span className="vv-button__spinner" aria-hidden="true" />
      ) : (
        iconLeading
      )}
      {children}
      {!loading && iconTrailing}
    </button>
  )
})
