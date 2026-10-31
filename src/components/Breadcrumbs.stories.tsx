import type { Meta, StoryObj } from "@storybook/react-vite"
import { Breadcrumbs } from "./Breadcrumbs.js"
import { StateMatrix, pseudoParams } from "../docs/specimen.js"

const meta = {
  id: "components-breadcrumbs",
  title: "Components/Navigation/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["new"],
  args: { items: [{ label: "Shipments", href: "#" }, { label: "North warehouse", href: "#" }, { label: "ORD-4417" }], maxItems: 4 },
  argTypes: { items: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "Shows where a page sits in the hierarchy and links back up it. The last item is the current page and is not a link. " +
          "Use it for depth of three levels or more; on a flat app the page header's back link is enough.",
      },
    },
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Past `maxItems` the middle levels fold into "…", which expands in place. */
export const Collapsed: Story = {
  args: {
    items: [
      { label: "Workspace", href: "#" },
      { label: "Logistics", href: "#" },
      { label: "Europe", href: "#" },
      { label: "Warehouses", href: "#" },
      { label: "North warehouse", href: "#" },
      { label: "Dock 4" },
    ],
  },
}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix pressed={false} colWidth="minmax(180px, auto)" rows={[{ label: "Link", node: <Breadcrumbs items={[{ label: "Shipments", href: "#shipments" }, { label: "ORD-4417" }]} /> }]} />
  ),
}
