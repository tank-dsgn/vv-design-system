import type { Meta, StoryObj } from "@storybook/react-vite"
import { InlineCitation } from "./InlineCitation.js"
import { StateMatrix, pseudoParams } from "../docs/specimen.js"

const meta = {
  id: "components-inlinecitation",
  title: "Components/AI/InlineCitation",
  component: InlineCitation,
  tags: ["new"],
  args: { index: 1, title: "North Line rate card, Q4", href: "#source", excerpt: "Vilnius to Hamburg, €0.34 per kilo." },
  parameters: { docs: { description: { component: "A numbered link to a source inside a sentence of a generated answer, with a preview on hover and focus. Its name includes the source's title, so it reads as more than a number." } } },
} satisfies Meta<typeof InlineCitation>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  decorators: [(Story) => <div style={{ minHeight: 130, fontSize: "var(--font-size-sm)", lineHeight: "var(--line-height-sm)", color: "var(--color-text-primary)" }}>The lane costs €0.34 per kilo <Story />, the lowest of the 12 carriers.</div>],
}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix pressed={false} rows={[{ label: "Mark", node: <InlineCitation index={1} title="North Line rate card" href="#source" /> }]} />
  ),
}
