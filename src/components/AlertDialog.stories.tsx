import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { AlertDialog } from "./AlertDialog.js"
import { Button } from "./Button.js"

function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>Delete shipment</Button>
      <AlertDialog open={open} title="Delete shipment ORD-4417?" confirmLabel="Delete shipment" cancelLabel="Keep shipment" onConfirm={() => setOpen(false)} onClose={() => setOpen(false)}>
        The shipment and its documents will be removed. The carrier is notified. This cannot be undone.
      </AlertDialog>
    </>
  )
}

const meta = {
  id: "components-alertdialog",
  title: "Components/Overlays/AlertDialog",
  component: AlertDialog,
  tags: ["new"],
  args: { open: false, title: "Delete shipment ORD-4417?", children: "This cannot be undone.", confirmLabel: "Delete shipment", cancelLabel: "Keep shipment", onConfirm: () => {}, onClose: () => {} },
  argTypes: { children: { control: false } },
  parameters: { docs: { description: { component: "Asks one question before something irreversible. Both buttons say what they do, and focus starts on the safe one. It is a Modal with these rules already applied." }, story: { inline: false, height: "320px" } } },
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { render: () => <Demo /> }

/** Open, with focus inside it. */
export const Open: Story = { render: () => <AlertDialog open title="Delete shipment ORD-4417?" confirmLabel="Delete shipment" cancelLabel="Keep shipment" onConfirm={() => {}} onClose={() => {}}>The shipment and its documents will be removed.</AlertDialog> }
