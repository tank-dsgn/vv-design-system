import type { Meta, StoryObj } from "@storybook/react-vite"
import { BarChart } from "./BarChart.js"

const meta: Meta = { id: "components-barchart",
  title: "Components/Data/BarChart",
  parameters: { docs: { description: { component: "Bars for comparing values across categories or periods, stacked when the series add up to a whole. Colours come from the chart tokens; every bar has a tooltip on hover and focus, and *View as table* gives every value without hovering." } } } }
export default meta
type Story = StoryObj

const SERIES = [
  { key: "current", label: "0–30 days", color: "var(--color-chart-1)" },
  { key: "late30", label: "31–60 days", color: "var(--color-chart-3)" },
  { key: "late60", label: "60+ days", color: "var(--color-chart-4)" },
]
const DATA = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"].map((label, i) => ({
  label,
  values: { current: 120 + ((i * 37) % 60), late30: 50 + ((i * 23) % 40), late60: 20 + ((i * 17) % 35) },
}))

/** Aging buckets are ordered, so they take one hue light→dark; the ramp is
 *  validated for both themes. Hover a column or Tab to it for the tooltip;
 *  "View as table" gives every value without hovering. */
export const StackedAging: Story = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <BarChart title="AR aging by bucket, in thousands of dollars" series={SERIES} data={DATA} format={(n) => `$${Math.round(n)}k`} />
    </div>
  ),
}

export const Narrow: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <BarChart title="AR aging, narrow container" series={SERIES} data={DATA.slice(-3)} format={(n) => `$${Math.round(n)}k`} />
    </div>
  ),
}
