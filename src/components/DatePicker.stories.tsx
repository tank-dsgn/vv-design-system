import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Line, Stack } from "../docs/specimen.js"
import { DatePicker } from "./DatePicker.js"

const meta = {
  id: "components-datepicker",
  title: "Components/Forms/DatePicker",
  component: DatePicker,
  tags: ["new"],
  args: { label: "Pickup date", value: new Date(2026, 10, 12), onChange: () => {} },
  argTypes: { value: { control: false }, min: { control: false }, max: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "A field that opens a Calendar. The chosen date is written in words — 12 Nov 2026 — so it cannot be misread as day-first or " +
          "month-first. Esc closes the calendar and returns focus to the field.",
      },
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

function Live(props: Partial<React.ComponentProps<typeof DatePicker>>) {
  const [d, setD] = useState<Date | null>(props.value === undefined ? new Date(2026, 10, 12) : props.value)
  return <DatePicker label="Pickup date" {...props} value={d} onChange={setD} />
}

export const Playground: Story = { render: () => <div style={{ minHeight: 380 }}><Live /></div>, parameters: { docs: { story: { height: "420px" } } } }

/** Open: the selected day is filled, today is outlined, focus starts on the selected day. */
export const Open: Story = { render: () => <div style={{ minHeight: 400 }}><Live defaultOpen hint="Working days only" /></div> }

export const States: Story = {
  render: () => (
    <Stack gap={16}>
      <Line label="Empty"><Live value={null} hint="Working days only" /></Line>
      <Line label="Filled"><Live /></Line>
      <Line label="Invalid"><Live value={new Date(2026, 10, 15)} error="No pickups on Sundays" /></Line>
      <Line label="Disabled"><Live disabled /></Line>
    </Stack>
  ),
}
