import type { Meta, StoryObj } from "@storybook/react-vite"
import { Resizable } from "./Resizable.js"
import { StateMatrix, pseudoParams } from "../docs/specimen.js"

const Pane = ({ text }: { text: string }) => <div style={{ padding: 16, fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)" }}>{text}</div>

const meta = {
  id: "components-resizable",
  title: "Components/Content/Resizable",
  component: Resizable,
  tags: ["new"],
  args: { label: "Resize the list and the details", first: <Pane text="Shipment list" />, second: <Pane text="Shipment details" />, defaultSize: 40 },
  argTypes: { first: { control: false }, second: { control: false }, direction: { control: "inline-radio", options: ["horizontal", "vertical"] } },
  parameters: { docs: { description: { component: "Two panes with a handle between them, for tools where people decide how much room each side gets. The handle is a focusable separator: arrows move it, Home and End jump to the limits." } } },
} satisfies Meta<typeof Resizable>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Stacked panes: a map above a table. */
export const Vertical: Story = { args: { direction: "vertical", label: "Resize the map and the table", first: <Pane text="Map" />, second: <Pane text="Table" />, defaultSize: 50 } }

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked pressed={false} rows={[{ label: "Handle", node: <Resizable label="Resize the panes" height={72} first={<Pane text="List" />} second={<Pane text="Details" />} /> }]} />
  ),
}
