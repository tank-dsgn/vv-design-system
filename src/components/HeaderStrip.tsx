import type { ReactNode } from "react"
import { Icon } from "./Icon.js"
import { IconButton } from "./IconButton.js"
import "./HeaderStrip.css"

export type HeaderStripProps = {
  children: ReactNode
  /** A Link. */
  action?: ReactNode
  /** Shows a close button. */
  onDismiss?: () => void
}

/** A one-line strip above the app header, about the whole session. */
export function HeaderStrip({ children, action, onDismiss }: HeaderStripProps) {
  return (
    <div className="vv-header-strip">
      <p>{children}</p>
      {action}
      {onDismiss && <IconButton variant="ghost" size="xs" label="Dismiss" icon={<Icon name="close" size={16} />} onClick={onDismiss} />}
    </div>
  )
}
