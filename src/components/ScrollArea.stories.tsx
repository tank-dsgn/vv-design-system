import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { ScrollArea } from "./ScrollArea.js"

const LINES = Array.from({ length: 24 }, (_, i) => <p key={i} style={{ margin: 0, padding: "8px 12px", fontSize: "var(--font-size-sm)", color: "var(--color-text-primary)" }}>Stop {i + 1}: depot {100 + i}</p>)

const meta = {
  id: "components-scrollarea",
  title: "Components/Content/ScrollArea",
  component: ScrollArea,
  tags: ["new"],
  args: { label: "Route stops", maxHeight: 200, children: LINES },
  argTypes: { children: { control: false } },
  decorators: [(Story) => <Narrow><Story /></Narrow>],
  parameters: { docs: { description: { component: "A region with its own scroll inside a fixed layout: a side panel, a long list in a popover. It takes keyboard focus, so arrows scroll it without a mouse." } } },
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked pressed={false} rows={[{ label: "Region", node: <ScrollArea label="Route stops" maxHeight={96}>{LINES}</ScrollArea> }]} />
  ),
}
