import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow } from "../docs/specimen.js"
import { Plan } from "./Plan.js"

const meta = {
  id: "components-plan",
  title: "Components/AI/Plan",
  component: Plan,
  tags: ["new"],
  args: {
    title: "Find the cheapest carrier",
    steps: [
      { title: "Read the shipment", status: "done" },
      { title: "Compare 12 carrier rates", detail: "Checking the Vilnius to Hamburg lane", status: "current" },
      { title: "Draft the booking", status: "todo" },
    ],
  },
  argTypes: { steps: { control: false } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "What an assistant intends to do, step by step, before and while it does it, so people can stop it early. For a process with fixed stages people move through themselves, use Stepper." } } },
} satisfies Meta<typeof Plan>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
