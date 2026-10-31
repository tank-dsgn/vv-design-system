import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, Stack } from "../docs/specimen.js"
import { Input } from "./Input.js"
import { Label } from "./Label.js"

const meta = {
  id: "components-label",
  title: "Components/Forms/Label",
  component: Label,
  tags: ["new"],
  args: { children: "Order number", optional: false, htmlFor: "label-demo" },
  argTypes: { children: { control: "text" } },
  decorators: [(Story) => <Narrow><Story /></Narrow>],
  parameters: { docs: { description: { component: "The visible name of a control, tied to it with `htmlFor` so a click on the label focuses the field. Field, Textarea and Combobox already include one." } } },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { render: (args) => <Stack gap={4}><Label {...args} /><Input id="label-demo" /></Stack> }

/** Mark the optional field; required is the default and carries no mark. */
export const Optional: Story = { render: () => <Stack gap={4}><Label htmlFor="label-opt" optional>Reference</Label><Input id="label-opt" /></Stack> }
