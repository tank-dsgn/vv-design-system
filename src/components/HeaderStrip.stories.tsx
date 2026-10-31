import type { Meta, StoryObj } from "@storybook/react-vite"
import { HeaderStrip } from "./HeaderStrip.js"
import { Link } from "./Link.js"

const meta = {
  id: "components-headerstrip",
  title: "Components/Navigation/HeaderStrip",
  component: HeaderStrip,
  tags: ["new"],
  args: { children: "You are viewing the Vilnius depot as an administrator.", action: <Link href="#switch">Switch back</Link> },
  argTypes: { children: { control: false }, action: { control: false } },
  parameters: { docs: { description: { component: "A one-line strip above the app header about the whole session: a demo workspace, viewing as another user, a planned outage. It stays while the condition lasts." } } },
} satisfies Meta<typeof HeaderStrip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Dismissible, for news rather than a condition. */
export const Dismissible: Story = { args: { children: "Rates change on 1 December.", action: undefined, onDismiss: () => {} } }
