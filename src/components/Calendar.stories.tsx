import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Calendar } from "./Calendar.js"

const FIXED = new Date(2026, 10, 12)

const meta = {
  id: "components-calendar",
  title: "Components/Forms/Calendar",
  component: Calendar,
  tags: ["new"],
  args: { value: FIXED, onChange: () => {} },
  argTypes: { value: { control: false }, min: { control: false }, max: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "A month grid for picking one date, inline on the page or inside DatePicker. Arrows move by day and week, Page Up/Down by month, " +
          "Home/End to the ends of the week. Today is outlined; days that cannot be picked are struck through.",
      },
    },
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const [d, setD] = useState<Date>(args.value ?? FIXED)
    return <Calendar {...args} value={d} onChange={setD} />
  },
}

/** Pickup is possible on working days only, within the next three weeks. */
export const Limits: Story = {
  render: () => {
    const [d, setD] = useState<Date>(FIXED)
    return (
      <Calendar
        value={d}
        onChange={setD}
        min={new Date(2026, 10, 3)}
        max={new Date(2026, 10, 24)}
        isDisabled={(day) => day.getDay() === 0 || day.getDay() === 6}
      />
    )
  },
}

/** Every interactive state. */
export const States: Story = {
  parameters: { pseudo: { hover: ["tbody tr:nth-child(3) td:nth-child(3) button"], active: ["tbody tr:nth-child(3) td:nth-child(5) button"], focusVisible: ["tbody tr:nth-child(4) td:nth-child(4) button"] } }, render: () => (
    <Calendar value={FIXED} defaultMonth={FIXED} min={new Date(FIXED.getFullYear(), FIXED.getMonth(), 4)} onChange={() => {}} />
  ),
}
