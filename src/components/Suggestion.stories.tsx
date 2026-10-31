import type { Meta, StoryObj } from "@storybook/react-vite"
import { Suggestion } from "./Suggestion.js"
import { StateMatrix, pseudoParams } from "../docs/specimen.js"

const meta = {
  id: "components-suggestion",
  title: "Components/AI/Suggestion",
  component: Suggestion,
  tags: ["new"],
  args: { onSelect: () => {}, items: ["Which carrier is cheapest to Hamburg?", "Show late shipments", "Draft a delay notice"] },
  argTypes: { items: { control: false } },
  parameters: { docs: { description: { component: "Ready-made prompts that show what an assistant can do here, one click away. Written as the person would ask, and specific to this screen and its data." } } },
} satisfies Meta<typeof Suggestion>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked rows={[{ label: "Prompt", node: <Suggestion onSelect={() => {}} items={["Show late shipments"]} />, disabled: <Suggestion onSelect={() => {}} items={["Show late shipments"]} disabled /> }]} />
  ),
}
