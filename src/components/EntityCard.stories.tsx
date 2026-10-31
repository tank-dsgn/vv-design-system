import type { Meta, StoryObj } from "@storybook/react-vite"
import { Grid, Narrow } from "../docs/specimen.js"
import { Badge } from "./Badge.js"
import { Button } from "./Button.js"
import { EntityCard } from "./EntityCard.js"

const meta = {
  id: "components-entitycard",
  title: "Components/Content/EntityCard",
  component: EntityCard,
  tags: ["new"],
  args: {
    name: "North Line Logistics",
    subtitle: "Road carrier",
    status: <Badge tone="success">Active</Badge>,
    facts: [{ label: "Lanes", value: "12" }, { label: "On time", value: "96%" }],
    actions: <Button variant="outlined" size="sm">View carrier</Button>,
  },
  argTypes: { status: { control: false }, facts: { control: false }, actions: { control: false }, shape: { control: "inline-radio", options: ["circle", "rounded"] } },
  parameters: { docs: { description: { component: "A person, a company or a vehicle at a glance. Same layout every time, so a grid of them scans in one pass. For a free layout, use Card." } } },
} satisfies Meta<typeof EntityCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { decorators: [(Story) => <Narrow><Story /></Narrow>] }

/** In a grid: facts in the same order on every card. */
export const InAGrid: Story = {
  name: "In a grid",
  render: () => (
    <Grid min={260}>
      <EntityCard name="North Line" subtitle="Road carrier" status={<Badge tone="success">Active</Badge>} facts={[{ label: "Lanes", value: "12" }, { label: "On time", value: "96%" }]} />
      <EntityCard name="Baltic Rail" subtitle="Rail carrier" status={<Badge tone="attention">Review</Badge>} facts={[{ label: "Lanes", value: "4" }, { label: "On time", value: "88%" }]} />
      <EntityCard name="Maya Collins" subtitle="Dispatcher" shape="circle" facts={[{ label: "Shipments", value: "31" }, { label: "Depot", value: "Vilnius" }]} />
    </Grid>
  ),
}
