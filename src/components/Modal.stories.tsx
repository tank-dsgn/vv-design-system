import type { Meta, StoryObj } from "@storybook/react-vite"
import { useRef, useState } from "react"
import { Row, Reasons } from "../docs/specimen.js"
import { Button } from "./Button.js"
import { Field } from "./Input.js"
import { Modal, type ModalSize } from "./Modal.js"

const meta = {
  id: "components-modal",
  title: "Components/Overlays/Modal",
  tags: ["!dev"],
  component: Modal,
  args: { open: false, title: "Delete shipment?", onClose: () => {}, size: "small", placement: "center" },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "large", "fullscreen"] },
    placement: { control: "inline-radio", options: ["center", "right"] },
    footer: { control: false },
    headerActions: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Interrupts the flow for a decision or a short task that must be finished before going on. Focus is " +
          "trapped inside while it is open and returns to the trigger when it closes; Esc and the scrim close it. " +
          "For an irreversible action, pass `initialFocusRef` to the safe button so a stray Enter does no harm. " +
          "`placement=\"right\"` turns it into a side drawer.",
      },
      story: { inline: false, height: "420px" },
    },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

function Confirm({ size }: { size?: ModalSize }) {
  const [open, setOpen] = useState(false)
  const cancelRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>Delete shipment</Button>
      <Modal
        open={open}
        size={size}
        title="Delete shipment ORD-4417?"
        onClose={() => setOpen(false)}
        initialFocusRef={cancelRef}
        footer={
          <>
            <Button ref={cancelRef} variant="outlined" onClick={() => setOpen(false)}>Keep shipment</Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        The shipment and its documents will be removed. The carrier is notified automatically. This cannot be undone.
      </Modal>
    </>
  )
}

/** A confirmation for an irreversible action. Focus starts on the safe choice. */
export const Confirmation: Story = { render: () => <Confirm /> }

/** A short form in a larger modal. */
export const Form: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Add stop</Button>
        <Modal
          open={open}
          size="large"
          title="Add a stop"
          onClose={() => setOpen(false)}
          footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Add stop</Button></>}
        >
          <div style={{ display: "grid", gap: 16 }}>
            <Field label="Address" placeholder="Street, city" />
            <Field label="Contact on site" placeholder="Name and phone" hint="The driver calls this person on arrival" />
          </div>
        </Modal>
      </>
    )
  },
}

/** A side drawer for detail that keeps the list visible behind it. */
export const Drawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="outlined" onClick={() => setOpen(true)}>Open details</Button>
        <Modal open={open} placement="right" title="ORD-4417" onClose={() => setOpen(false)}>
          North warehouse → Port terminal · 1,240 kg · North Line
        </Modal>
      </>
    )
  },
}

/** The three widths: 384, 672 and 1024px. */
export const Sizes: Story = {
  parameters: { docs: { wide: true } },
  render: () => {
    const [size, setSize] = useState<ModalSize | null>(null)
    return (
      <>
        <Row>{(["small", "large", "fullscreen"] as const).map((s) => <Button key={s} variant="outlined" onClick={() => setSize(s)}>Open {s}</Button>)}</Row>
        <Reasons label="Size" rows={[
          ["small · 384", "Confirmations", "Narrow enough to read in one glance; nothing else fits, which keeps it honest."],
          ["large · 672", "Short forms", "One comfortable column of fields. Longer than a screen means it should be a page."],
          ["fullscreen · 1024", "Focused tasks with their own structure", "For previews and multi-part tasks, where the page behind would only distract."],
        ]} />
        <Modal open={size !== null} size={size ?? "small"} title={`${size} modal`} onClose={() => setSize(null)} footer={<Button onClick={() => setSize(null)}>Done</Button>}>
          Content area. The width is fixed per size; the height follows the content up to the viewport.
        </Modal>
      </>
    )
  },
}
