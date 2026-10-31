import "./Spinner.css"

/** Two sizes from Figma, where they are named `large (default)` and `small` —
 *  the word "(default)" ended up inside the variant VALUE instead of being the
 *  order of the list. Here they are `lg` and `sm`, with the default set in
 *  code. */
export type SpinnerSize = "sm" | "lg"

export type SpinnerProps = {
  size?: SpinnerSize
  /** What exactly is loading. An unlabelled spinner is announced as "loading"
   *  with no object, and that tells the listener nothing about what to wait
   *  for. */
  label?: string
}

export function Spinner({ size = "lg", label = "Loading" }: SpinnerProps) {
  return (
    <span
      className={`vv-spinner vv-spinner--${size}`}
      role="status"
      aria-label={label}
    />
  )
}
