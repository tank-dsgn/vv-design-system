import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Narrow, Row, Stack } from "../docs/specimen.js"
import { Button } from "./Button.js"
import { Stepper } from "./Stepper.js"

const STEPS = [
  { label: "Route", description: "Pickup and delivery" },
  { label: "Cargo", description: "Weight and pallets" },
  { label: "Carrier", description: "Rate and timing" },
  { label: "Review", description: "Confirm and book" },
]

const meta = {
  id: "components-stepper",
  title: "Components/Navigation/Stepper",
  component: Stepper,
  tags: ["new", "!dev"],
  args: { steps: STEPS, current: 1, orientation: "horizontal" },
  argTypes: { steps: { control: false }, current: { control: { type: "range", min: 0, max: 4 } }, orientation: { control: "inline-radio", options: ["horizontal", "vertical"] } },
  parameters: {
    docs: {
      description: {
        component:
          "Shows progress through a fixed sequence of steps — a booking flow, an onboarding. Completed steps are marked, " +
          "the current one is announced as `aria-current=\"step\"`. Use it for four to six steps; fewer do not need it.",
      },
    },
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** For a side column next to a long form. */
export const Vertical: Story = { args: { orientation: "vertical", current: 2 }, decorators: [(S) => <Narrow><S /></Narrow>] }

/** Moving through the flow. */
export const Progress: Story = {
  render: () => {
    const [i, setI] = useState(0)
    return (
      <Stack>
        <Stepper steps={STEPS} current={i} />
        <Row>
          <Button variant="outlined" size="sm" disabled={i === 0} onClick={() => setI(i - 1)}>Back</Button>
          <Button size="sm" disabled={i === STEPS.length} onClick={() => setI(i + 1)}>{i >= STEPS.length - 1 ? "Book shipment" : "Continue"}</Button>
        </Row>
      </Stack>
    )
  },
}
