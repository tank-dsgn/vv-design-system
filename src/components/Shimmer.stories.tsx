import type { Meta, StoryObj } from "@storybook/react-vite"
import { Shimmer } from "./Shimmer.js"

const meta = {
  id: "components-shimmer",
  title: "Components/AI/Shimmer",
  component: Shimmer,
  tags: ["new"],
  args: { children: "Comparing carrier rates" },
  argTypes: { children: { control: "text" } },
  decorators: [(Story) => <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-primary)" }}><Story /></span>],
  parameters: { docs: { description: { component: "Words that pulse while an assistant works on them, naming what it is doing right now. Only while real work runs. For a page that is loading, use Skeleton." } } },
} satisfies Meta<typeof Shimmer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
