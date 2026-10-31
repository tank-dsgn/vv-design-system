import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, Stack } from "../docs/specimen.js"
import { ActionBar } from "./ActionBar.js"
import { Icon } from "./Icon.js"
import { Message } from "./Message.js"

const meta = {
  id: "components-message",
  title: "Components/AI/Message",
  component: Message,
  tags: ["new"],
  args: { from: "assistant", author: "Assistant", time: "14:05", children: "North Line is the cheapest on this lane at €420." },
  argTypes: { from: { control: "inline-radio", options: ["user", "assistant"] }, children: { control: false }, actions: { control: false } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "One message of a conversation, for building a thread with parts of your own. For the whole thread with its composer, use Chat." } } },
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** A question and its answer, with actions on the answer. */
export const Exchange: Story = {
  render: () => (
    <Stack>
      <Message from="user" author="Maya Collins" time="14:04">Which carrier is cheapest to Hamburg?</Message>
      <Message from="assistant" author="Assistant" time="14:05" actions={<ActionBar label="Message actions" onSelect={() => {}} items={[{ id: "copy", label: "Copy message", icon: <Icon name="copy" size={16} /> }, { id: "retry", label: "Regenerate answer", icon: <Icon name="redo" size={16} /> }]} />}>
        North Line is the cheapest on this lane at €420.
      </Message>
    </Stack>
  ),
}
