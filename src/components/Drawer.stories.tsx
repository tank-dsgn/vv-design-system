import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Button } from "./Button.js"
import { DescriptionList } from "./DescriptionList.js"
import { Drawer } from "./Drawer.js"

function Demo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>View shipment</Button>
      <Drawer open={open} title="Shipment ORD-4417" onClose={() => setOpen(false)} footer={<Button onClick={() => setOpen(false)}>Close details</Button>}>
        <DescriptionList items={[{ term: "Carrier", description: "North Line" }, { term: "Weight", description: "1,240 kg" }, { term: "Pickup", description: "12 Nov 2026" }]} />
      </Drawer>
    </>
  )
}

const meta = {
  id: "components-drawer",
  title: "Components/Overlays/Drawer",
  component: Drawer,
  tags: ["new", "!dev"],
  args: { open: false, title: "Shipment ORD-4417", onClose: () => {} },
  argTypes: { children: { control: false }, footer: { control: false }, headerActions: { control: false } },
  parameters: { docs: { description: { component: "A panel from the right edge for an object's details or a longer form, keeping the list behind it in view. Esc and a click on the scrim close it, and focus returns to the trigger." }, story: { inline: false, height: "420px" } } },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { render: () => <Demo /> }

/** Open, with focus inside it. */
export const Open: Story = { render: () => <Drawer open title="Shipment ORD-4417" onClose={() => {}}>Carrier: North Line</Drawer> }
