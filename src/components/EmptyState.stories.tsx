import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./Button.js"
import { EmptyState } from "./EmptyState.js"
import { Icon } from "./Icon.js"

const meta = {
  id: "components-emptystate",
  title: "Components/Feedback/EmptyState",
  component: EmptyState,
  tags: ["new"],
  args: {
    title: "No shipments yet",
    description: "Book your first shipment and it will appear here with its tracking status.",
    icon: <Icon name="trucking" size={24} />,
    actions: <Button iconLeading={<Icon name="plus" size={16} />}>New shipment</Button>,
    size: "md",
  },
  argTypes: { icon: { control: false }, actions: { control: false }, size: { control: "inline-radio", options: ["sm", "md"] } },
  parameters: {
    docs: {
      description: {
        component:
          "What a list, table or page shows when it has nothing to show. Always say why it is empty and give the next step. " +
          "Three cases look different: nothing created yet, nothing matches the filters, and no access.",
      },
    },
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Filters removed everything: offer to clear them, not to create something. */
export const NoResults: Story = {
  name: "No results",
  args: { icon: <Icon name="search" size={24} />, title: "No shipments match these filters", description: "Try another date range or clear the carrier filter.", actions: <Button variant="outlined">Clear filters</Button> },
}

/** Inside a card or panel. */
export const Small: Story = {
  args: { size: "sm", icon: <Icon name="notifications" size={24} />, title: "No notifications", description: "Updates about your shipments will appear here.", actions: undefined },
}
