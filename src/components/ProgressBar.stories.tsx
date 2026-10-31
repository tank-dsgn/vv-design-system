import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, Stack } from "../docs/specimen.js"
import { ProgressBar } from "./ProgressBar.js"

const meta = {
  id: "components-progressbar",
  title: "Components/Feedback/ProgressBar",
  component: ProgressBar,
  args: { value: 47, label: "Inspection progress", showValue: true },
  argTypes: { value: { control: { type: "range", min: 0, max: 100, step: 1 } } },
  parameters: {
    docs: {
      description: {
        component:
          "Shows how far a measurable task has got: an upload, an inspection, a checklist. At 100% it turns to " +
          "the success colour. Values outside 0–100 are clamped. For work of unknown length, use Spinner.",
      },
    },
  },
  decorators: [(Story) => <Narrow><Story /></Narrow>],
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Values: Story = {
  render: () => (
    <Stack gap={16}>
      {[0, 25, 60, 100].map((v) => <ProgressBar key={v} value={v} label={`Upload ${v}%`} />)}
    </Stack>
  ),
}

export const WithoutValue: Story = { args: { showValue: false } }
