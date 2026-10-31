import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { Accordion } from "./Accordion.js"

const ITEMS = [
  { id: "rates", title: "How are rates calculated?", content: "By weight and distance, with a minimum charge per pallet. Fuel surcharges are added on the invoice, not at booking." },
  { id: "cancel", title: "Can I cancel a booked shipment?", content: "Until the carrier confirms pickup. After that, cancelling counts as a failed collection and is charged." },
  { id: "docs", title: "Which documents does the driver need?", content: "A CMR consignment note for every international shipment, plus a commercial invoice outside the EU." },
  { id: "claims", title: "Damage claims", content: "Claims are handled by the carrier.", disabled: true },
]

const meta = {
  id: "components-accordion",
  title: "Components/Content/Accordion",
  component: Accordion,
  tags: ["new"],
  args: { items: ITEMS, allowMultiple: false, defaultOpen: ["rates"], headingLevel: 3 },
  argTypes: { items: { control: false }, headingLevel: { control: "inline-radio", options: [2, 3, 4] } },
  parameters: {
    docs: {
      description: {
        component:
          "Stacks sections that open in place, so a long page — FAQs, settings, details — stays scannable. Titles are buttons " +
          "inside headings, so the page outline and keyboard path stay intact. Do not hide content people need on every visit.",
      },
    },
  },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Opening one section closes the others — the default, for reading one answer at a time. */
export const SingleOpen: Story = { name: "Single open", args: { defaultOpen: ["cancel"] } }

/** Several sections stay open, for comparing them. */
export const AllowMultiple: Story = { name: "Allow multiple", args: { allowMultiple: true, defaultOpen: ["rates", "docs"] } }

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked rows={[{ label: "Section", node: <Accordion items={[ITEMS[0]]} />, disabled: <Accordion items={[{ ...ITEMS[0], disabled: true }]} /> }]} />
  ),
}
