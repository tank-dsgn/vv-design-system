import type { Meta, StoryObj } from "@storybook/react-vite"
import { DonutChart } from "./DonutChart.js"

const meta: Meta = { id: "components-donutchart",
  title: "Components/Data/DonutChart",
  parameters: { docs: { description: { component: "Part-to-whole for up to six slices. The legend lists every value, so it doubles as the accessible table; beyond six slices, use a table." } } } }
export default meta
type Story = StoryObj

const money = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)

/** Part-to-whole only, at most six slices — past that the component warns
 *  and the honest form is a table. The legend lists every value, so it doubles
 *  as the table view. Slices are separated by a 2px surface gap. */
export const ExpectedCash: Story = {
  render: () => (
    <DonutChart
      title="Expected cash by when it arrives"
      caption="next 90 days"
      format={money}
      slices={[
        { key: "w1", label: "0–7 days", value: 42300, color: "var(--color-chart-ordinal4-1)" },
        { key: "w2", label: "8–14 days", value: 38900, color: "var(--color-chart-ordinal4-2)" },
        { key: "w4", label: "15–30 days", value: 84800, color: "var(--color-chart-ordinal4-3)" },
        { key: "later", label: "31+ days", value: 362300, color: "var(--color-chart-ordinal4-4)" },
      ]}
    />
  ),
}

/** A bucket outside the window is dropped, and the rest keep their colours:
 *  colour follows the bucket, never its position. */
export const ShorterWindow: Story = {
  render: () => (
    <DonutChart
      title="Expected cash, next 30 days"
      caption="next 30 days"
      format={money}
      slices={[
        { key: "w1", label: "0–7 days", value: 42300, color: "var(--color-chart-ordinal4-1)" },
        { key: "w2", label: "8–14 days", value: 38900, color: "var(--color-chart-ordinal4-2)" },
        { key: "w4", label: "15–30 days", value: 84800, color: "var(--color-chart-ordinal4-3)" },
      ]}
    />
  ),
}
