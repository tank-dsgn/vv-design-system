import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "./Badge.js"
import { Button } from "./Button.js"
import { Icon } from "./Icon.js"
import { Link } from "./Link.js"
import { PageHeader } from "./PageHeader.js"

const meta = {
  id: "components-pageheader",
  title: "Components/Navigation/PageHeader",
  component: PageHeader,
  args: { title: "Shipments", subtitle: "148 this month" },
  argTypes: { badge: { control: false }, back: { control: false }, actions: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "The top of every page: its title (the page's single `h1`), a subtitle, an optional status badge, a way " +
          "back for detail pages, and the page-level actions. The primary action sits last on the right.",
      },
    },
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const ListPage: Story = {
  args: {
    actions: (
      <>
        <Button variant="outlined" iconLeading={<Icon name="download" size={16} />}>Export</Button>
        <Button iconLeading={<Icon name="plus" size={16} />}>New shipment</Button>
      </>
    ),
  },
}

export const DetailPage: Story = {
  args: {
    title: "ORD-4417",
    subtitle: "North warehouse → Port terminal",
    badge: <Badge tone="info" strong>In transit</Badge>,
    back: <Link href="#">← Shipments</Link>,
    actions: (
      <>
        <Button variant="outlined">Edit</Button>
        <Button variant="destructive">Cancel shipment</Button>
      </>
    ),
  },
}
