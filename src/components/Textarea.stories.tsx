import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, Stack, State, pseudoParams } from "../docs/specimen.js"
import { Textarea } from "./Textarea.js"

const meta = {
  id: "components-textarea",
  title: "Components/Forms/Textarea",
  tags: ["!dev"],
  component: Textarea,
  args: { label: "Delivery notes", placeholder: "Gate number, contact on site, loading hours" },
  parameters: {
    docs: {
      description: {
        component:
          "Multi-line text: notes, descriptions, comments. Carries its own label, hint and error, like Field. " +
          "Use Input when the answer fits on one line.",
      },
    },
  },
  decorators: [(Story) => <Narrow><Story /></Narrow>],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = {
  parameters: pseudoParams,
  render: (args) => (
    <Stack>
      <Textarea {...args} hint="Visible to the driver" />
      <State is="hover"><Textarea {...args} label="Hover" /></State>
      <State is="focus"><Textarea {...args} label="Focus" defaultValue="Gate 4, call ahead" /></State>
      <Textarea {...args} label="Invalid" defaultValue="" error="Add at least the gate number" />
      <Textarea {...args} label="Disabled" disabled defaultValue="Locked after dispatch" />
    </Stack>
  ),
}
