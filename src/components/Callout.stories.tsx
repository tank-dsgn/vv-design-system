import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, Stack } from "../docs/specimen.js"
import { Callout } from "./Callout.js"

const meta = {
  id: "components-callout",
  title: "Components/Feedback/Callout",
  component: Callout,
  tags: ["new"],
  args: { tone: "note", title: "Rates include fuel", children: "The quoted rate already covers the fuel surcharge for this lane." },
  argTypes: { tone: { control: "inline-radio", options: ["note", "tip", "warning"] }, children: { control: false } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "A note set apart inside a page or a form: context worth reading, not an event that just happened. It is static and is not announced." } } },
} satisfies Meta<typeof Callout>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Three tones, by how much the reader loses if they skip it. */
export const Tones: Story = {
  render: () => (
    <Stack>
      <Callout tone="note" title="Note">Pickups booked after 14:00 leave the next working day.</Callout>
      <Callout tone="tip" title="Tip">Save the lane as a template to skip these fields next time.</Callout>
      <Callout tone="warning" title="Check before booking">Dangerous goods need a declaration from the shipper.</Callout>
    </Stack>
  ),
}
