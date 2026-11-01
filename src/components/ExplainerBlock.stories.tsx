import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow } from "../docs/specimen.js"
import { ExplainerBlock } from "./ExplainerBlock.js"
import { Link } from "./Link.js"

const meta = {
  id: "components-explainerblock",
  title: "Components/Content/ExplainerBlock",
  component: ExplainerBlock,
  tags: ["new", "!dev"],
  args: {
    title: "How the rate is calculated",
    children: "The rate depends on weight, distance and the carrier's fuel index.",
    steps: ["We take the chargeable weight.", "We apply the lane's price per kilo.", "We add the fuel surcharge for this month."],
    link: <Link href="#rates">See the rate table</Link>,
  },
  argTypes: { children: { control: false }, steps: { control: false }, link: { control: false } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "A short answer to “how does this work?”, next to the feature it explains: why a number is what it is, what happens after Submit. Static and always visible." } } },
} satisfies Meta<typeof ExplainerBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
