import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { Collapsible } from "./Collapsible.js"

const meta = {
  id: "components-collapsible",
  title: "Components/Content/Collapsible",
  component: Collapsible,
  tags: ["new"],
  args: { title: "Rate breakdown", defaultOpen: true, children: "Base rate €380, fuel €40. VAT is added on the invoice." },
  argTypes: { children: { control: false }, title: { control: "text" }, meta: { control: false } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "A single section that opens in place, for details most people skip. The trigger is a button with `aria-expanded`. For several sections in a stack, use Accordion." } } },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** The meta slot says what is inside before anyone opens it. */
export const WithMeta: Story = { name: "With meta", args: { title: "Documents", meta: "3 files", defaultOpen: false, children: "Invoice, packing list, declaration." } }

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked rows={[{ label: "Closed", node: <Collapsible title="Rate breakdown">Base rate €380.</Collapsible>, disabled: <Collapsible title="Rate breakdown" disabled>Base rate €380.</Collapsible> }]} />
  ),
}
