import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, Stack } from "../docs/specimen.js"
import { Field } from "./Input.js"

const meta = {
  id: "components-field",
  title: "Components/Forms/Field",
  component: Field,
  tags: ["new"],
  args: { label: "Order number", placeholder: "ORD-0000", hint: "On the top right of the carrier's invoice." },
  decorators: [(Story) => <Narrow><Story /></Narrow>],
  parameters: { docs: { description: { component: "An Input with its visible label, hint and error, wired together for screen readers. Every field in a form is a Field; a bare Input is for places where the label is already on screen." } } },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Label, hint, error: the error replaces the hint and is announced. */
export const Parts: Story = {
  render: () => (
    <Stack>
      <Field label="Reference" />
      <Field label="Order number" hint="On the top right of the carrier's invoice." />
      <Field label="Order number" defaultValue="4417" error="Enter ORD followed by four digits" />
    </Stack>
  ),
}
