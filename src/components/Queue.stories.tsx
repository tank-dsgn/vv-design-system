import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { Queue } from "./Queue.js"

const meta = {
  id: "components-queue",
  title: "Components/AI/Queue",
  component: Queue,
  tags: ["new"],
  args: { label: "Queued requests", onRemove: () => {}, items: [{ id: "a", title: "Compare carrier rates", running: true }, { id: "b", title: "Draft the booking" }, { id: "c", title: "Notify the depot" }] },
  argTypes: { items: { control: false } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "Work waiting its turn, in order: queued prompts, batch jobs, a print list. The item in progress cannot be removed; the rest can." } } },
} satisfies Meta<typeof Queue>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked pressed={false} rows={[{ label: "Remove button", node: <Queue label="Queued requests" onRemove={() => {}} items={[{ id: "b", title: "Draft the booking" }]} /> }]} />
  ),
}
