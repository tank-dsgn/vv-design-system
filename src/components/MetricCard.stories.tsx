import type { Meta, StoryObj } from "@storybook/react-vite"
import { MetricCard } from "./MetricCard.js"

const meta = {
  id: "components-metriccard",
  title: "Components/Data/MetricCard",
  parameters: { docs: { description: { component: "One key figure with its change over a period. `sentiment` says whether the change is good news \u2014 a rising overdue balance is bad, a rising collection rate is good \u2014 so colour follows meaning, not direction." } } },
  component: MetricCard,
  args: { label: "Overdue balance", value: "$142,510", delta: "+12%", period: "vs yesterday", sentiment: "bad" },
} satisfies Meta<typeof MetricCard>

export default meta
type Story = StoryObj<typeof meta>

/** `sentiment` says whether the change is good news —
 *  a rising overdue balance is bad, a rising collection rate is good. */
export const Default: Story = { render: (args) => <div style={{ maxWidth: 260 }}><MetricCard {...args} /></div> }

export const Row: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 220px))", gap: 16 }}>
      <MetricCard label="Days sales outstanding" value="65 days" delta="−3 days" period="vs 2 weeks ago" sentiment="good" />
      <MetricCard label="Outstanding invoices" value="19" delta="+4" period="vs last week" />
      <MetricCard label="Overdue balance" value="$142,510" delta="+12%" period="vs yesterday" sentiment="bad" />
    </div>
  ),
}
