import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, Stack } from "../docs/specimen.js"
import { Reasoning } from "./Reasoning.js"

const TEXT = "The lane is Vilnius to Hamburg. Three carriers serve it at this weight. North Line has the lowest rate and 96% on time."

const meta = {
  id: "components-reasoning",
  title: "Components/AI/Reasoning",
  component: Reasoning,
  tags: ["new"],
  args: { duration: "12 s", defaultOpen: true, children: TEXT },
  argTypes: { children: { control: false } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "How an assistant reached its answer. Closed by default: the answer is what most people came for, and the reasoning is there for those who want to check it." } } },
} satisfies Meta<typeof Reasoning>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Writing, then finished. */
export const States: Story = { render: () => <Stack><Reasoning streaming>{TEXT}</Reasoning><Reasoning duration="12 s">{TEXT}</Reasoning></Stack> }
