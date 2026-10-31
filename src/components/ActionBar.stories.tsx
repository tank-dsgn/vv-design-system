import type { Meta, StoryObj } from "@storybook/react-vite"
import { ActionBar } from "./ActionBar.js"
import { Icon } from "./Icon.js"
import { StateMatrix, pseudoParams } from "../docs/specimen.js"

const meta = {
  id: "components-actionbar",
  title: "Components/AI/ActionBar",
  component: ActionBar,
  tags: ["new"],
  args: {
    label: "Message actions",
    onSelect: () => {},
    items: [
      { id: "copy", label: "Copy message", icon: <Icon name="copy" size={16} /> },
      { id: "retry", label: "Regenerate answer", icon: <Icon name="redo" size={16} /> },
      { id: "reply", label: "Reply to message", icon: <Icon name="reply" size={16} /> },
    ],
  },
  argTypes: { items: { control: false } },
  parameters: { docs: { description: { component: "A compact row of icon actions under a message or a block of content. Every action has a tooltip and an accessible name, and stays visible: hover-only actions do not exist on touch." } } },
} satisfies Meta<typeof ActionBar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix pressed={false} colWidth="minmax(120px, auto)" rows={[{ label: "Actions", node: <ActionBar label="Message actions" onSelect={() => {}} items={[{ id: "copy", label: "Copy message", icon: <Icon name="copy" size={16} /> }]} />, disabled: <ActionBar label="Message actions" onSelect={() => {}} items={[{ id: "copy", label: "Copy message", icon: <Icon name="copy" size={16} />, disabled: true }]} /> }]} />
  ),
}
