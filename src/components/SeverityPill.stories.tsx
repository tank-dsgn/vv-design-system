import type { Meta, StoryObj } from "@storybook/react-vite"
import { Row } from "../docs/specimen.js"
import { SeverityPill } from "./SeverityPill.js"

const meta = {
  id: "components-severitypill",
  title: "Components/Feedback/SeverityPill",
  component: SeverityPill,
  tags: ["new"],
  args: { severity: "high" },
  argTypes: { severity: { control: "inline-radio", options: ["low", "medium", "high", "critical"] } },
  parameters: { docs: { description: { component: "How serious something is, on a fixed scale of four: an incident, a defect, an audit finding. Bars and word say it together, and the levels sort." } } },
} satisfies Meta<typeof SeverityPill>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** The four levels. */
export const Levels: Story = {
  render: () => <Row><SeverityPill severity="low" /><SeverityPill severity="medium" /><SeverityPill severity="high" /><SeverityPill severity="critical" /></Row>,
}
