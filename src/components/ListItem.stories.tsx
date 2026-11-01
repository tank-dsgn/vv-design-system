import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Narrow, Stack, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { Avatar } from "./Avatar.js"
import { Badge } from "./Badge.js"
import { Icon } from "./Icon.js"
import { IconButton } from "./IconButton.js"
import { ListItem } from "./ListItem.js"

const meta = {
  id: "components-listitem",
  title: "Components/Content/ListItem",
  component: ListItem,
  tags: ["new", "!dev"],
  args: { title: "North Line Logistics", description: "Road freight, 12 lanes", media: <Avatar name="North Line" shape="rounded" tone="blue" />, meta: <Badge tone="success">Active</Badge> },
  argTypes: { media: { control: false }, meta: { control: false }, action: { control: false } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "One row of a list: what it is, a line about it, a status and an action. For objects compared across columns, use Table." } } },
} satisfies Meta<typeof ListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

function Pick() {
  const [v, setV] = useState("a")
  return (
    <Stack gap={4}>
      <ListItem title="Maya Collins" description="Dispatcher" media={<Avatar name="Maya Collins" tone="purple" />} selected={v === "a"} onClick={() => setV("a")} />
      <ListItem title="Tom Reyes" description="Fleet manager" media={<Avatar name="Tom Reyes" tone="green" />} selected={v === "b"} onClick={() => setV("b")} />
    </Stack>
  )
}

/** With `onClick` the row is a button, with hover and a selected state. */
export const Selectable: Story = { render: () => <Pick /> }

/** The action is a separate control beside the row. */
export const WithAction: Story = {
  name: "With action",
  render: () => <ListItem title="invoice-4417.pdf" description="1.2 MB" media={<Icon name="pdf" />} action={<IconButton variant="ghost" size="sm" label="Download invoice-4417.pdf" icon={<Icon name="download" />} />} />,
}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked rows={[{ label: "Row", node: <ListItem title="Maya Collins" description="Dispatcher" onClick={() => {}} />, disabled: <ListItem title="Maya Collins" description="On leave" onClick={() => {}} disabled /> }, { label: "Selected", node: <ListItem title="Tom Reyes" description="Fleet manager" onClick={() => {}} selected /> }]} />
  ),
}
