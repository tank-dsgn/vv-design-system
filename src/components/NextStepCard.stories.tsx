import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { Button } from "./Button.js"
import { NextStepCard } from "./NextStepCard.js"

const meta = {
  id: "components-nextstepcard",
  title: "Components/Content/NextStepCard",
  component: NextStepCard,
  tags: ["new"],
  args: { title: "Confirm the pickup time", description: "The carrier holds the slot until 16:00 today.", action: <Button>Confirm pickup</Button> },
  argTypes: { action: { control: false } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "The one next thing to do on a page that is otherwise about reading: an order's status, a dashboard. One per page, with one button." } } },
} satisfies Meta<typeof NextStepCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked rows={[{ label: "Action", node: <NextStepCard title="Confirm the pickup time" action={<Button>Confirm pickup</Button>} />, disabled: <NextStepCard title="Confirm the pickup time" description="Waiting for the carrier." action={<Button disabled>Confirm pickup</Button>} /> }]} />
  ),
}
