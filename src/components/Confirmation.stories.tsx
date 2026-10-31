import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, Stack } from "../docs/specimen.js"
import { Confirmation } from "./Confirmation.js"

const base = { title: "Book North Line for ORD-4417?", children: "€420 will be charged to the Vilnius depot account.", approveLabel: "Book shipment", denyLabel: "Keep as draft", onApprove: () => {}, onDeny: () => {} }

const meta = {
  id: "components-confirmation",
  title: "Components/AI/Confirmation",
  component: Confirmation,
  tags: ["new"],
  args: base,
  argTypes: { children: { control: false }, state: { control: "inline-radio", options: ["pending", "approved", "denied"] } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "An assistant asks before an action with consequences. It sits in the conversation without blocking it, and after the answer it records what was decided. For a person's own destructive action, use AlertDialog." } } },
} satisfies Meta<typeof Confirmation>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** The answer stays on record. */
export const States: Story = { render: () => <Stack><Confirmation {...base} /><Confirmation {...base} state="approved" /><Confirmation {...base} state="denied" /></Stack> }
