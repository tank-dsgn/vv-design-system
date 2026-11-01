import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Matrix, Stack, State, pseudoParams } from "../docs/specimen.js"
import { Checkbox } from "./Checkbox.js"

const meta = {
  id: "components-checkbox",
  title: "Components/Forms/Checkbox",
  tags: ["!dev"],
  component: Checkbox,
  args: { label: "Notify the receiver" },
  parameters: {
    docs: {
      description: {
        component:
          "Turns an option on or off, independently of the others, and takes effect when the form is submitted. " +
          "For a setting that applies immediately, use Switch. The indeterminate state is for a parent that " +
          "selects a list in which only some items are checked.",
      },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = {
  parameters: pseudoParams,
  render: () => {
    const cell = (props: Partial<React.ComponentProps<typeof Checkbox>>, label: string) => <Checkbox label={label} {...props} />
    return (
      <Matrix
        colWidth="minmax(120px, auto)"
        columns={["Rest", "Hover", "Focus", "Disabled"]}
        rows={[
          { label: "Unchecked", cells: [cell({}, "Option"), <State is="hover">{cell({}, "Option")}</State>, <State is="focus">{cell({}, "Option")}</State>, cell({ disabled: true }, "Option")] },
          { label: "Checked", cells: [cell({ defaultChecked: true }, "Option"), <State is="hover">{cell({ defaultChecked: true }, "Option")}</State>, <State is="focus">{cell({ defaultChecked: true }, "Option")}</State>, cell({ defaultChecked: true, disabled: true }, "Option")] },
          { label: "Indeterminate", cells: [cell({ indeterminate: true }, "Option"), <State is="hover">{cell({ indeterminate: true }, "Option")}</State>, <State is="focus">{cell({ indeterminate: true }, "Option")}</State>, cell({ indeterminate: true, disabled: true }, "Option")] },
        ]}
      />
    )
  },
}

/** Tick some of the children and the parent takes its third state. */
export const SelectAll: Story = {
  render: () => {
    const items = ["North warehouse", "Port terminal", "Retail hub"]
    const [on, setOn] = useState<string[]>([items[0]])
    return (
      <Stack gap={12}>
        <Checkbox
          label="All destinations"
          checked={on.length === items.length}
          indeterminate={on.length > 0 && on.length < items.length}
          onChange={(e) => setOn(e.target.checked ? items : [])}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingLeft: 28 }}>
          {items.map((i) => (
            <Checkbox key={i} label={i} checked={on.includes(i)} onChange={(e) => setOn(e.target.checked ? [...on, i] : on.filter((x) => x !== i))} />
          ))}
        </div>
      </Stack>
    )
  },
}

/** In a table cell the row already says what is being selected; the label is kept for screen readers only. */
export const HiddenLabel: Story = { args: { label: "Select ORD-4417", labelHidden: true } }
