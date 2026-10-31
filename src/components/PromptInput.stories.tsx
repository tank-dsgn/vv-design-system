import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { PromptInput } from "./PromptInput.js"

const meta = {
  id: "components-promptinput",
  title: "Components/AI/PromptInput",
  component: PromptInput,
  tags: ["new"],
  args: { onSend: () => {}, onAttach: () => {}, placeholder: "Ask about a shipment" },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "Where a person asks an assistant. Enter sends, Shift+Enter starts a new line, and the field grows with the text. While an answer is generating, the send button becomes Stop." } } },
} satisfies Meta<typeof PromptInput>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** While an answer is generating, the way to stop it is always there. */
export const Streaming: Story = { args: { streaming: true, onStop: () => {} } }

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked pressed={false} rows={[{ label: "Field", node: <PromptInput onSend={() => {}} onAttach={() => {}} />, disabled: <PromptInput onSend={() => {}} onAttach={() => {}} disabled /> }]} />
  ),
}
