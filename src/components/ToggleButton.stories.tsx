import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Matrix, Row, State, pseudoParams } from "../docs/specimen.js"
import { Icon } from "./Icon.js"
import { ToggleButton } from "./ToggleButton.js"

function Demo() {
  const [on, setOn] = useState(true)
  return <ToggleButton pressed={on} onChange={setOn} icon={<Icon name="map" size={16} />}>Show map</ToggleButton>
}

const meta = {
  id: "components-togglebutton",
  title: "Components/Actions/ToggleButton",
  component: ToggleButton,
  tags: ["new", "!dev"],
  args: { pressed: false, onChange: () => {}, children: "Show map" },
  argTypes: { icon: { control: false }, children: { control: "text" }, size: { control: "inline-radio", options: ["sm", "md"] } },
  parameters: { docs: { description: { component: "A button that stays on until pressed again: show a map, pin a panel, bold text. Screen readers announce it as pressed or not pressed. For the sliding on and off control, use Switch." } } },
} satisfies Meta<typeof ToggleButton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { render: () => <Demo /> }

/** An icon-only toggle needs `aria-label`. */
export const Sizes: Story = {
  render: () => (
    <Row>
      <ToggleButton size="sm" pressed onChange={() => {}} aria-label="Pin panel" icon={<Icon name="pin" size={16} />} />
      <ToggleButton size="md" pressed={false} onChange={() => {}} aria-label="Pin panel" icon={<Icon name="pin" size={20} />} />
    </Row>
  ),
}

export const States: Story = {
  parameters: pseudoParams,
  render: () => (
    <Matrix
      colWidth="minmax(110px, auto)"
      columns={["Rest", "Hover", "Focus", "Disabled"]}
      rows={[
        { label: "Off", cells: [<ToggleButton pressed={false} onChange={() => {}}>Map</ToggleButton>, <State is="hover"><ToggleButton pressed={false} onChange={() => {}}>Map</ToggleButton></State>, <State is="focus"><ToggleButton pressed={false} onChange={() => {}}>Map</ToggleButton></State>, <ToggleButton pressed={false} disabled onChange={() => {}}>Map</ToggleButton>] },
        { label: "On", cells: [<ToggleButton pressed onChange={() => {}}>Map</ToggleButton>, <State is="hover"><ToggleButton pressed onChange={() => {}}>Map</ToggleButton></State>, <State is="focus"><ToggleButton pressed onChange={() => {}}>Map</ToggleButton></State>, <ToggleButton pressed disabled onChange={() => {}}>Map</ToggleButton>] },
      ]}
    />
  ),
}
