import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { CodeBlock } from "./CodeBlock.js"

const meta = {
  id: "components-codeblock",
  title: "Components/Content/CodeBlock",
  component: CodeBlock,
  tags: ["new", "!dev"],
  args: { title: "tokens.css", code: ":root {\n  --brand-500: #3b82f6;\n  --brand-600: #2563eb;\n}" },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "Code to read and copy: an API example, a config, a tool's output. It scrolls sideways rather than wrapping, because wrapped code reads wrong." } } },
} satisfies Meta<typeof CodeBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** A long line scrolls inside the block; Tab reaches it, arrows scroll it. */
export const LongLine: Story = { name: "Long line", args: { title: "Terminal", code: "curl -X POST https://api.example.com/v1/shipments --data '{\"origin\":\"Vilnius\",\"destination\":\"Hamburg\",\"weight\":1240}'" } }

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked pressed={false} rows={[{ label: "Block", node: <CodeBlock title="tokens.css" code="--brand-500: #3b82f6;" /> }]} />
  ),
}
