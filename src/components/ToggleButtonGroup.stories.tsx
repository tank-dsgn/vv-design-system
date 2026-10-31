import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Icon } from "./Icon.js"
import { ToggleButtonGroup, type ToggleButtonGroupItem } from "./ToggleButtonGroup.js"
import { StateMatrix, pseudoParams } from "../docs/specimen.js"

const LAYERS: ToggleButtonGroupItem[] = [{ value: "depots", label: "Depots" }, { value: "routes", label: "Routes" }, { value: "traffic", label: "Traffic" }]

function Demo({ items = LAYERS, initial = ["routes"] }: { items?: ToggleButtonGroupItem[]; initial?: string[] }) {
  const [v, setV] = useState(initial)
  return <ToggleButtonGroup label="Map layers" items={items} value={v} onChange={setV} />
}

const meta = {
  id: "components-togglebuttongroup",
  title: "Components/Actions/ToggleButtonGroup",
  component: ToggleButtonGroup,
  tags: ["new"],
  args: { label: "Map layers", items: LAYERS, value: ["routes"], onChange: () => {} },
  argTypes: { items: { control: false } },
  parameters: { docs: { description: { component: "Toggles joined in one row when any number of them can be on: map layers, text formatting. If exactly one must be on, use SegmentedControl." } } },
} satisfies Meta<typeof ToggleButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { render: () => <Demo /> }

/** Icon-only items keep their label as the accessible name. */
export const Icons: Story = {
  render: () => <Demo initial={["pin"]} items={[{ value: "pin", label: "Pin", icon: <Icon name="pin" />, iconOnly: true }, { value: "flag", label: "Flag", icon: <Icon name="flag" />, iconOnly: true }, { value: "star", label: "Favourite", icon: <Icon name="star-empty" />, iconOnly: true }]} />,
}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix colWidth="minmax(190px, auto)" rows={[{ label: "Toggles", node: <ToggleButtonGroup label="Map layers" items={LAYERS} value={["routes"]} onChange={() => {}} />, disabled: <ToggleButtonGroup label="Map layers" items={LAYERS.map((l) => ({ ...l, disabled: true }))} value={["routes"]} onChange={() => {}} /> }]} />
  ),
}
