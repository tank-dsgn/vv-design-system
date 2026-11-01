import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Narrow } from "../docs/specimen.js"
import { Button } from "./Button.js"
import { Command, type CommandGroup } from "./Command.js"
import { Icon } from "./Icon.js"
import { Modal } from "./Modal.js"

const GROUPS: CommandGroup[] = [
  { title: "Shipments", items: [{ id: "new", label: "Book shipment", icon: <Icon name="plus" size={16} />, shortcut: "N" }, { id: "track", label: "Track shipment", icon: <Icon name="location" size={16} /> }] },
  { title: "Go to", items: [{ id: "dash", label: "Open dashboard", icon: <Icon name="dashboard" size={16} /> }, { id: "settings", label: "Open settings", icon: <Icon name="settings" size={16} />, shortcut: "S" }] },
]

const meta = {
  id: "components-command",
  title: "Components/Actions/Command",
  component: Command,
  tags: ["new", "!dev"],
  args: { groups: GROUPS, onSelect: () => {} },
  argTypes: { groups: { control: false } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "A search field over everything the app can do, for people who know what they want and prefer the keyboard. Focus stays in the field; arrows move, Enter runs." } } },
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

function InModal() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>Open command menu</Button>
      <Modal open={open} title="Command menu" onClose={() => setOpen(false)}>
        <Command groups={GROUPS} onSelect={() => setOpen(false)} />
      </Modal>
    </>
  )
}

/** Usually opened by a shortcut, inside a Modal. */
export const InADialog: Story = { name: "In a dialog", render: () => <InModal />, parameters: { docs: { story: { inline: false, height: "460px" } } } }
