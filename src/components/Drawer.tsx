import type { ReactNode } from "react"
import { Modal } from "./Modal.js"

export type DrawerProps = {
  open: boolean
  title: string
  onClose: () => void
  children?: ReactNode
  footer?: ReactNode
  headerActions?: ReactNode
}

/** A panel from the right edge, over the page. A Modal in its side placement:
 *  the same focus trap, focus return and Esc. */
export function Drawer(props: DrawerProps) {
  return <Modal {...props} placement="right" />
}
