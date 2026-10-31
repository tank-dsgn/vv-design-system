import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow } from "../docs/specimen.js"
import { Badge } from "./Badge.js"
import { DescriptionList } from "./DescriptionList.js"
import { Link } from "./Link.js"

const ITEMS = [
  { term: "Order", description: "ORD-4417" },
  { term: "Status", description: <Badge tone="info" dot>In transit</Badge> },
  { term: "Route", description: "North warehouse → Port terminal" },
  { term: "Carrier", description: "North Line" },
  { term: "Weight", description: "1,240 kg · 4 pallets" },
  { term: "Documents", description: <Link href="#">CMR-4417.pdf</Link> },
]

const meta = {
  id: "components-descriptionlist",
  title: "Components/Data/DescriptionList",
  component: DescriptionList,
  tags: ["new"],
  args: { items: ITEMS, layout: "row" },
  argTypes: { items: { control: false }, layout: { control: "inline-radio", options: ["row", "column"] } },
  parameters: {
    docs: {
      description: {
        component:
          "The facts about one object as label–value pairs — a shipment's details, an invoice's terms. A real `dl`, so each value stays " +
          "paired with its label for screen readers. For many objects with the same fields, use Table.",
      },
    },
  },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
} satisfies Meta<typeof DescriptionList>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Label above value, several per row — for a summary strip or a narrow panel. */
export const Columns: Story = { args: { layout: "column" } }
