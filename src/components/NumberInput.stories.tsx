import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Line, Stack } from "../docs/specimen.js"
import { NumberInput } from "./NumberInput.js"

const meta = {
  id: "components-numberinput",
  title: "Components/Forms/NumberInput",
  component: NumberInput,
  tags: ["new"],
  args: { label: "Pallets", value: 4, onChange: () => {}, min: 1, max: 33, step: 1, size: "md" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md"] } },
  parameters: {
    docs: {
      description: {
        component:
          "An exact number that is usually changed by a little — pallets, seats, quantity. The − and + buttons and the arrow keys step it; " +
          "the value stays within min and max. For a free-form amount without steps, use Input with a suffix.",
      },
    },
  },
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

function Live(props: Partial<React.ComponentProps<typeof NumberInput>>) {
  const [v, setV] = useState(props.value ?? 4)
  return <NumberInput label="Pallets" min={1} max={33} {...props} value={v} onChange={setV} />
}

export const Playground: Story = { render: (args) => <Live {...args} /> }

/** A unit after the number; a step other than one. */
export const Unit: Story = { render: () => <Live label="Weight per pallet" unit="kg" value={250} step={50} min={50} max={1200} hint="Up to 1,200 kg per pallet" /> }

export const Sizes: Story = {
  render: () => (
    <Stack gap={16}>
      <Line label="md · 40px"><Live size="md" /></Line>
      <Line label="sm · 32px"><Live size="sm" /></Line>
    </Stack>
  ),
}

/** At the limit, the button in that direction is disabled. */
export const States: Story = {
  render: () => (
    <Stack gap={16}>
      <Line label="At minimum"><Live value={1} /></Line>
      <Line label="Invalid"><Live value={34} max={40} error="A truck takes up to 33 pallets" /></Line>
      <Line label="Disabled"><Live value={4} disabled /></Line>
    </Stack>
  ),
}
