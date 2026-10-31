import type { Meta, StoryObj } from "@storybook/react-vite"
import { Avatar } from "./Avatar.js"
import { HoverCard } from "./HoverCard.js"
import { Link } from "./Link.js"

const Preview = () => (
  <span style={{ display: "flex", gap: 12 }}>
    <Avatar name="North Line" shape="rounded" tone="blue" />
    <span><b>North Line Logistics</b><br />Road freight, 12 lanes. On time 96% this quarter.</span>
  </span>
)

const meta = {
  id: "components-hovercard",
  title: "Components/Overlays/HoverCard",
  component: HoverCard,
  tags: ["new"],
  args: { trigger: <Link href="#carrier">North Line</Link>, children: <Preview /> },
  argTypes: { trigger: { control: false }, children: { control: false } },
  decorators: [(Story) => <div style={{ minHeight: 140 }}><Story /></div>],
  parameters: { docs: { description: { component: "A preview of a linked object on hover and focus: a carrier, a person, a shipment. It saves opening the page, and following the link gives the same facts. Touch screens may never show it." } } },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Shown open. */
export const Open: Story = { args: { defaultOpen: true } }
