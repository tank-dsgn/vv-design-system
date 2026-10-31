import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Avatar } from "./Avatar.js"
import { Button } from "./Button.js"
import { ChatComposer, ChatMessage, ChatTyping } from "./Chat.js"
import { Icon } from "./Icon.js"

const meta: Meta = { id: "components-chat",
  title: "Components/AI/Chat",
  parameters: { docs: { description: { component: "A conversation thread: messages, a typing indicator and a composer. Each message is an `article` named by its author and time, so screen readers move message by message. Built from Avatar, Button and Textarea." } } } }
export default meta
type Story = StoryObj

/** Each message is an `article` named by author and
 *  time, so a screen reader moves message by message. */
export const Messages: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 640 }}>
      <ChatMessage role="user" author="You" time="Thursday 11:40am">Top 5 customers by overdue balance</ChatMessage>
      <ChatMessage
        role="assistant"
        author="VV assistant"
        time="Thursday 11:40am"
        avatar={<Avatar size="sm" tone="blue" icon={<Icon name="ai" size={16} />} />}
        actions={<Button size="sm" variant="outlined" iconLeading={<Icon name="copy" size={16} />}>Copy</Button>}
      >
        Kestrel Labs leads with $32,500 across two invoices.
      </ChatMessage>
      <ChatTyping who="VV assistant" />
    </div>
  ),
}

/** A real form: Enter sends. While a reply is on its way the send button is
 *  `aria-disabled`, so keyboard focus never drops off it. */
export const Composer: Story = {
  render: () => {
    const [sent, setSent] = useState<string[]>([])
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 640 }}>
        {sent.map((t, i) => <ChatMessage key={i} role="user" author="You" time="now">{t}</ChatMessage>)}
        <ChatComposer onSend={(t) => setSent((s) => [...s, t])} onAttach={() => {}} />
      </div>
    )
  },
}
