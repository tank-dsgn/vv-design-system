import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { Sources } from "./Sources.js"

const meta = {
  id: "components-sources",
  title: "Components/AI/Sources",
  component: Sources,
  tags: ["new"],
  args: { defaultOpen: true, items: [{ title: "North Line rate card, Q4", href: "#a", site: "northline.example" }, { title: "Baltic lanes report", href: "#b", site: "transport.example" }] },
  argTypes: { items: { control: false } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "What a generated answer was based on, in one list under it. The numbers match the InlineCitation marks in the text." } } },
} satisfies Meta<typeof Sources>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked pressed={false} rows={[{ label: "Link", node: <Sources defaultOpen items={[{ title: "North Line rate card", href: "#a", site: "northline.example" }]} /> }]} />
  ),
}
