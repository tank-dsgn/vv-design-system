import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Button } from "./Button.js"
import { ChoiceList } from "./ChoiceList.js"
import { Icon } from "./Icon.js"
import { IconButton } from "./IconButton.js"
import { Link } from "./Link.js"
import { Popover } from "./Popover.js"

const meta = {
  id: "components-popover",
  title: "Components/Overlays/Popover",
  component: Popover,
  tags: ["new"],
  args: {
    title: "Fuel surcharge",
    trigger: <IconButton variant="ghost" size="sm" icon={<Icon name="information" />} label="About the fuel surcharge" />,
    children: <>Added to every invoice at the carrier's monthly rate — 7.4% in October. <Link href="#">See the rate history</Link></>,
    align: "start",
    placement: "bottom",
    width: 320,
  },
  argTypes: { trigger: { control: false }, children: { control: false }, align: { control: "inline-radio", options: ["start", "end"] }, placement: { control: "inline-radio", options: ["bottom", "top"] } },
  parameters: {
    docs: {
      description: {
        component:
          "Rich, interactive content anchored to a button — a short explanation with a link, a filter form. Non-modal: the page stays " +
          "usable behind it. Focus moves in on open; Esc or a click outside closes it. For a plain label use Tooltip; for a list of actions, Menu.",
      },
      story: { height: "260px" },
    },
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { render: (args) => <div style={{ minHeight: 200 }}><Popover {...args} /></div> }

/** Open, to show it on the page. */
export const Explanation: Story = { render: (args) => <div style={{ minHeight: 200 }}><Popover {...args} defaultOpen /></div> }

/** A small form — filters that apply on Done. */
export const Filters: Story = {
  render: () => {
    const [sel, setSel] = useState<string[]>(["transit"])
    return (
      <div style={{ minHeight: 280 }}>
        <Popover
          title="Filter shipments"
          defaultOpen
          width={280}
          trigger={<Button variant="outlined" size="sm" iconLeading={<Icon name="filter" size={16} />}>Filter</Button>}
        >
          <ChoiceList titleHidden title="Status" allowMultiple selected={sel} onChange={setSel} choices={[{ value: "booked", label: "Booked" }, { value: "transit", label: "In transit" }, { value: "delivered", label: "Delivered" }]} />
        </Popover>
      </div>
    )
  },
}
