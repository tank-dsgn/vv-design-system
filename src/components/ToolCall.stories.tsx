import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { ToolCall } from "./ToolCall.js"

const meta = {
  id: "components-toolcall",
  title: "Components/AI/ToolCall",
  component: ToolCall,
  tags: ["new"],
  args: { name: "Search rate cards", status: "done", defaultOpen: true, input: '{ "lane": "Vilnius-Hamburg", "weight": 1240 }', output: '{ "carriers": 3, "cheapest": "North Line" }' },
  argTypes: { status: { control: "inline-radio", options: ["queued", "running", "paused", "done", "failed"] } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "A tool an assistant used, with what went in and what came out. Closed by default: the status is enough until someone wants to check the work." } } },
} satisfies Meta<typeof ToolCall>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** In progress, nothing has come back yet. */
export const Running: Story = { args: { status: "running", output: undefined, defaultOpen: false } }

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked rows={[{ label: "Trigger", node: <ToolCall name="Search rate cards" status="done" output="3 carriers" /> }]} />
  ),
}
