import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Matrix, State, pseudoParams } from "../docs/specimen.js"
import { Switch } from "./Switch.js"

const meta = {
  id: "components-switch",
  title: "Components/Forms/Switch",
  tags: ["!dev"],
  component: Switch,
  args: { label: "Book immediately", size: "lg" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "lg"] } },
  parameters: {
    docs: {
      description: {
        component:
          "The sliding toggle: turns a setting on or off with immediate effect — no Save button. Screen readers announce it as " +
          "*on / off*. If the change only applies after submitting a form, use Checkbox.",
      },
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const [on, setOn] = useState(false)
    return <Switch {...args} checked={on} onChange={(e) => setOn(e.target.checked)} />
  },
}

export const States: Story = {
  parameters: pseudoParams,
  render: () => (
    <Matrix
      colWidth="minmax(120px, auto)"
      columns={["Rest", "Hover", "Focus", "Disabled"]}
      rows={(["sm", "lg"] as const).flatMap((size) => [
        { label: `Off · ${size}`, cells: [<Switch size={size} label="Setting" />, <State is="hover"><Switch size={size} label="Setting" /></State>, <State is="focus"><Switch size={size} label="Setting" /></State>, <Switch size={size} label="Setting" disabled />] },
        { label: `On · ${size}`, cells: [<Switch size={size} label="Setting" defaultChecked />, <State is="hover"><Switch size={size} label="Setting" defaultChecked /></State>, <State is="focus"><Switch size={size} label="Setting" defaultChecked /></State>, <Switch size={size} label="Setting" disabled defaultChecked />] },
      ])}
    />
  ),
}
