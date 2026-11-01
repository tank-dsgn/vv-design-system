import type { Meta, StoryObj } from "@storybook/react-vite"
import { Line, Row, Stack } from "../docs/specimen.js"
import { Kbd } from "./Kbd.js"

const meta = {
  id: "components-kbd",
  title: "Components/Actions/Kbd",
  tags: ["!dev"],
  component: Kbd,
  args: { children: "⌘K", size: "md" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md"] } },
  parameters: {
    docs: {
      description: {
        component: "A keyboard key or shortcut, shown next to the action it triggers — in menus, tooltips and help text.",
      },
    },
  },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: () => (
    <Stack gap={16}>
      <Line label="sm · 20px"><Kbd size="sm">⌘K</Kbd><Kbd size="sm">Esc</Kbd><Kbd size="sm">↵</Kbd></Line>
      <Line label="md · 24px"><Kbd>⌘K</Kbd><Kbd>Esc</Kbd><Kbd>↵</Kbd></Line>
    </Stack>
  ),
}

export const InText: Story = {
  render: () => (
    <Row>
      <span style={{ color: "var(--color-text-secondary)" }}>
        Press <Kbd size="sm">⌘</Kbd> <Kbd size="sm">K</Kbd> to search shipments, <Kbd size="sm">Esc</Kbd> to close.
      </span>
    </Row>
  ),
}
