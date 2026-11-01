import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Matrix, State, pseudoParams } from "../docs/specimen.js"
import { Radio, RadioGroup } from "./Radio.js"

const meta = {
  id: "components-radio",
  title: "Components/Forms/Radio",
  tags: ["!dev"],
  component: RadioGroup,
  args: {
    legend: "Vehicle type",
    name: "vehicle",
    value: "truck",
    onChange: () => {},
    orientation: "vertical",
    options: [
      { value: "truck", label: "Truck" },
      { value: "van", label: "Van" },
      { value: "rail", label: "Rail platform" },
    ],
  },
  argTypes: { orientation: { control: "inline-radio", options: ["vertical", "horizontal"] } },
  parameters: {
    docs: {
      description: {
        component:
          "Picks exactly one option from a short list (two to five) that the user should see all at once. " +
          "The group is a `fieldset` whose legend is read before each option; arrow keys move the selection. " +
          "For longer lists, use Select.",
      },
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return <RadioGroup {...args} value={value} onChange={setValue} />
  },
}

export const Horizontal: Story = {
  render: (args) => {
    const [value, setValue] = useState("van")
    return <RadioGroup {...args} name="vehicle-h" orientation="horizontal" value={value} onChange={setValue} />
  },
}

export const States: Story = {
  parameters: pseudoParams,
  render: () => (
    <Matrix
      colWidth="minmax(120px, auto)"
      columns={["Rest", "Hover", "Focus", "Disabled"]}
      rows={[
        { label: "Unselected", cells: [<Radio name="s1" label="Option" />, <State is="hover"><Radio name="s2" label="Option" /></State>, <State is="focus"><Radio name="s3" label="Option" /></State>, <Radio name="s4" label="Option" disabled />] },
        { label: "Selected", cells: [<Radio name="s5" label="Option" defaultChecked />, <State is="hover"><Radio name="s6" label="Option" defaultChecked /></State>, <State is="focus"><Radio name="s7" label="Option" defaultChecked /></State>, <Radio name="s8" label="Option" disabled defaultChecked />] },
      ]}
    />
  ),
}

/** An unavailable option stays visible and says why, rather than disappearing. */
export const WithDisabledOption: Story = {
  render: (args) => {
    const [value, setValue] = useState("truck")
    return (
      <RadioGroup
        {...args}
        name="vehicle-d"
        value={value}
        onChange={setValue}
        options={[...args.options.slice(0, 2), { value: "rail", label: "Rail platform — not on this route", disabled: true }]}
      />
    )
  },
}
