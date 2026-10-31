import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, Stack, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { Task } from "./Task.js"

const meta = {
  id: "components-task",
  title: "Components/AI/Task",
  component: Task,
  tags: ["new"],
  args: { title: "Compare carrier rates", status: "running", defaultOpen: true, children: "Read 12 rate cards. Three serve this lane at this weight." },
  argTypes: { children: { control: false }, status: { control: "inline-radio", options: ["queued", "running", "paused", "done", "failed"] } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "One unit of an assistant's work: its title and status in one line, what it did inside. Several in a column show a long job without a wall of text." } } },
} satisfies Meta<typeof Task>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** A long job, read from the statuses alone. */
export const AJob: Story = {
  name: "A job",
  render: () => (
    <Stack gap={4}>
      <Task title="Read the shipment" status="done">Weight 1,240 kg, Vilnius to Hamburg.</Task>
      <Task title="Compare carrier rates" status="running">Three of 12 carriers serve this lane.</Task>
      <Task title="Draft the booking" status="queued">Waiting for the comparison.</Task>
    </Stack>
  ),
}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked rows={[{ label: "Trigger", node: <Task title="Compare carrier rates" status="running">Three of 12 carriers.</Task> }]} />
  ),
}
