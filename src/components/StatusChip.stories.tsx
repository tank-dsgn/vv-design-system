import type { Meta, StoryObj } from "@storybook/react-vite"
import { Row } from "../docs/specimen.js"
import { StatusChip } from "./StatusChip.js"

const meta = {
  id: "components-statuschip",
  title: "Components/Feedback/StatusChip",
  component: StatusChip,
  tags: ["new"],
  args: { status: "running" },
  argTypes: { status: { control: "inline-radio", options: ["queued", "running", "paused", "done", "failed"] } },
  parameters: { docs: { description: { component: "Where a process is: queued, running, paused, done or failed. A Badge with the mapping decided, so the same stage has the same word and tone on every screen." } } },
} satisfies Meta<typeof StatusChip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** The five stages. */
export const Stages: Story = {
  render: () => <Row><StatusChip status="queued" /><StatusChip status="running" /><StatusChip status="paused" /><StatusChip status="done" /><StatusChip status="failed" /></Row>,
}
