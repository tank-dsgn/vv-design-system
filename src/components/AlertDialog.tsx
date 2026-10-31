import { useRef, type ReactNode } from "react"
import { Button } from "./Button.js"
import { Modal } from "./Modal.js"

export type AlertDialogProps = {
  open: boolean
  /** The question, with the object's name in it. */
  title: string
  /** What will be lost. */
  children: ReactNode
  /** What the confirming button does: "Delete shipment", never "Yes". */
  confirmLabel: string
  /** What the safe button does: "Keep shipment", never "No". */
  cancelLabel: string
  destructive?: boolean
  onConfirm: () => void
  onClose: () => void
}

/** A Modal that asks one question before something irreversible. Focus starts
 *  on the safe button, so a stray Enter cancels. */
export function AlertDialog({ open, title, children, confirmLabel, cancelLabel, destructive = true, onConfirm, onClose }: AlertDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      initialFocusRef={cancelRef}
      footer={
        <>
          <Button ref={cancelRef} variant="outlined" onClick={onClose}>{cancelLabel}</Button>
          <Button variant={destructive ? "destructive" : "primary"} onClick={onConfirm}>{confirmLabel}</Button>
        </>
      }
    >
      {children}
    </Modal>
  )
}
