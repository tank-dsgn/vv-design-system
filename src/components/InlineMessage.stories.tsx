import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, Stack, Reasons } from "../docs/specimen.js"
import { Field } from "./Input.js"
import { InlineMessage, type InlineMessageTone } from "./InlineMessage.js"

const meta = {
  id: "components-inlinemessage",
  title: "Components/Feedback/InlineMessage",
  tags: ["!dev"],
  component: InlineMessage,
  args: { tone: "critical", children: "Add the last two digits of the order number" },
  argTypes: { tone: { control: "inline-radio", options: ["critical", "success", "warning", "info", "neutral"] } },
  parameters: {
    docs: {
      description: {
        component:
          "A one-line message attached to a field or a small block of content. Errors are announced immediately; " +
          "other tones are read in place. For page-level messages, use Banner.",
      },
    },
  },
} satisfies Meta<typeof InlineMessage>

export default meta
type Story = StoryObj<typeof meta>

const TEXT: Record<InlineMessageTone, string> = {
  critical: "Add the last two digits of the order number",
  success: "Address verified",
  warning: "This address is outside the carrier's usual area",
  info: "Pickup slots are shown in the warehouse's time zone",
  neutral: "ORD followed by four digits",
}

export const Playground: Story = {}

export const Tones: Story = {
  render: () => (
    <Stack gap={12}>
      {(Object.keys(TEXT) as InlineMessageTone[]).map((t) => <InlineMessage key={t} tone={t}>{TEXT[t]}</InlineMessage>)}
      <Reasons label="Tone" rows={[
        ["critical", "The value blocks the next step", "Announced at once, because it follows something the person just did and silence would go unnoticed."],
        ["warning", "Allowed, but with a consequence", "Doesn't block, so it doesn't interrupt."],
        ["success", "A check passed", "Only where a check was in doubt. A tick on every field is noise."],
        ["info", "Context that prevents a mistake", "An icon marks it as a note, not as part of the value."],
        ["neutral", "How to fill the field", "No icon: it's part of the field's quiet furniture, shown before anything has gone wrong."],
      ]} />
    </Stack>
  ),
}

/** Field has its own error and hint lines. Use InlineMessage for a note under anything else, such as a value that passed but deserves a warning. */
export const UnderAField: Story = {
  name: "Under a field",
  render: () => (
    <Narrow>
      <Stack gap={8}>
        <Field label="Delivery address" defaultValue="14 Dock Road, Aberdeen" />
        <InlineMessage tone="warning">This address is outside the carrier’s usual area</InlineMessage>
      </Stack>
    </Narrow>
  ),
}
