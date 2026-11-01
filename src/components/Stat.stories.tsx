import type { Meta, StoryObj } from "@storybook/react-vite"
import { Stat } from "./Stat.js"

const meta = {
  id: "components-stat",
  title: "Components/Data/Stat",
  tags: ["!dev"],
  parameters: { docs: { description: { component: "A compact figure with a note, for summary rows in dashboards. Renders as `dt`/`dd` inside a `dl`, so label and value stay paired for screen readers." } } },
  component: Stat,
  args: { label: "Total active findings", value: "870" },
} satisfies Meta<typeof Stat>

export default meta
type Story = StoryObj<typeof meta>

/** Renders `dt`/`dd`, so it belongs inside a `dl`. */
export const Default: Story = {
  render: (args) => <dl style={{ margin: 0 }}><Stat {...args} note="17 closed last quarter" /></dl>,
}

/** Direction alone cannot pick the colour: "+44 findings" is bad, "−0.31 risk"
 *  is good. The caller says which, and the sign stays in the text either way. */
export const Sentiment: Story = {
  render: () => (
    <dl style={{ margin: 0, display: "flex", gap: 48 }}>
      <Stat label="Average risk per finding" value="11.84" note="−0.31 since last quarter" sentiment="good" />
      <Stat label="Priority 1 findings" value="323" note="+31 new this quarter" sentiment="bad" />
      <Stat label="Estimated repair cost" value="$38,412,900" note="Estimate accuracy +50% / −25%" />
    </dl>
  ),
}
