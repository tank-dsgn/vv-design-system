import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, Stack } from "../docs/specimen.js"
import { Button } from "./Button.js"
import { OutcomeBanner } from "./OutcomeBanner.js"

const meta = {
  id: "components-outcomebanner",
  title: "Components/Feedback/OutcomeBanner",
  component: OutcomeBanner,
  tags: ["new", "!dev"],
  args: { outcome: "success", title: "48 shipments imported", children: "All rows passed validation and are ready to book." },
  argTypes: { outcome: { control: "inline-radio", options: ["success", "partial", "failed"] }, children: { control: false }, actions: { control: false } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "The result of a finished process, at the top of its results: an import, a batch, a check. Says what happened, what it means and what to do. Announced once when it appears." } } },
} satisfies Meta<typeof OutcomeBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Three outcomes. Partial is the honest one: say how much did not work. */
export const Outcomes: Story = {
  render: () => (
    <Stack>
      <OutcomeBanner outcome="success" title="48 shipments imported">All rows passed validation.</OutcomeBanner>
      <OutcomeBanner outcome="partial" title="45 of 48 shipments imported" actions={<Button variant="outlined" size="sm">Review 3 rows</Button>}>3 rows are missing a weight and were skipped.</OutcomeBanner>
      <OutcomeBanner outcome="failed" title="Import failed" actions={<Button variant="outlined" size="sm">Choose another file</Button>}>The file has no header row. Nothing was imported.</OutcomeBanner>
    </Stack>
  ),
}
