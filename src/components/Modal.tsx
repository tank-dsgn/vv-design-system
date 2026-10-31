import { useEffect, useRef, type ReactNode, type RefObject } from "react"
import "./Modal.css"

/** Three sizes from Figma: Size=Small | Large | FullScreen. */
export type ModalSize = "small" | "large" | "fullscreen"

/** `right` turns the dialog into a side panel over the page. Same focus trap,
 *  same focus return, same Esc — one implementation for both shapes. */
export type ModalPlacement = "center" | "right"

export type ModalProps = {
  open: boolean
  title: string
  size?: ModalSize
  /** Esc, a click on the scrim and the cancel button all run one handler:
   *  no exit should behave differently from the others. */
  onClose: () => void
  /** Where focus should land on open.
   *
   *  By default focus goes to the dialog itself: Tab then reaches the first
   *  button, and no action sits armed under Enter. For a dialog carrying an
   *  irreversible action, pass the safe button here — then a stray Enter
   *  cancels rather than confirms. */
  initialFocusRef?: RefObject<HTMLElement | null>
  placement?: ModalPlacement
  /** Extra controls in the header, e.g. "New chat" or "History". */
  headerActions?: ReactNode
  children?: ReactNode
  footer?: ReactNode
}

export function Modal({
  open,
  title,
  size = "small",
  onClose,
  initialFocusRef,
  placement = "center",
  headerActions,
  children,
  footer,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const returnTo = useRef<HTMLElement | null>(null)

  /* onClose is read through a ref, so the effect below depends on `open` alone.
     Callers almost always pass an inline arrow — a new function every render.
     With onClose in the deps, any parent re-render while the dialog was open
     re-ran the effect: its cleanup handed focus back to the trigger, then the
     effect grabbed it again. Toggling a switch inside the dialog threw focus
     off the switch. Found building the dashboard's settings dialog, the first
     dialog in the library with a control inside it. */
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return

    // Remember where we came from: on close, focus must return there, or a
    // keyboard user is dumped at the top of the page.
    returnTo.current = document.activeElement as HTMLElement | null

    /* Without this, focus stays on the button BEHIND the scrim: the dialog is
       visible but the keyboard still drives the page behind it. Found while
       checking in the browser. */
    const target = initialFocusRef?.current ?? dialogRef.current
    target?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current()
      if (e.key !== "Tab") return

      // Focus trap. Without it Tab escapes to the page under the scrim, where
      // everything is visible but nothing is clickable — a state a screen
      // reader cannot get out of.
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      returnTo.current?.focus()
    }
    // Only `open` is a dependency. initialFocusRef means "where to land on
    // open", not a subscription, and onClose is read through onCloseRef —
    // re-running this effect on every render would steal focus from whatever
    // the user is working with inside the dialog.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) return null

  return (
    <div
      className={`vv-modal__overlay vv-modal__overlay--${placement}`}
      // A click on the scrim closes; a click inside does not. We test target
      // itself, or releasing the mouse inside the dialog would close it.
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className={`vv-modal vv-modal--${size} vv-modal--${placement}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        // -1: the dialog is out of the tab order but can take focus in code.
        tabIndex={-1}
      >
        <div className="vv-modal__header">
          <h2 className="vv-modal__title">{title}</h2>
          {headerActions && <div className="vv-modal__header-actions">{headerActions}</div>}
        </div>
        <div className="vv-modal__body">{children}</div>
        {footer && <div className="vv-modal__footer">{footer}</div>}
      </div>
    </div>
  )
}
