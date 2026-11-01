import type { Meta, StoryObj } from "@storybook/react-vite"
import { Line, Row, Stack } from "../docs/specimen.js"
import { Button } from "./Button.js"
import { Spinner } from "./Spinner.js"

const meta = {
  id: "components-spinner",
  title: "Components/Feedback/Spinner",
  tags: ["!dev"],
  component: Spinner,
  args: { size: "lg", label: "Loading shipments" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "lg"] } },
  parameters: {
    docs: {
      description: {
        component:
          "Shows that something is loading when its shape is unknown or it takes under a few seconds. " +
          "When the layout of the result is known, prefer Skeleton. `label` says *what* is loading. " +
          "Under reduced motion the spinner slows down instead of stopping, so it never looks frozen.",
      },
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: () => (
    <Stack gap={16}>
      <Line label="sm · 16px"><Spinner size="sm" label="Loading" /></Line>
      <Line label="lg · 24px"><Spinner size="lg" label="Loading" /></Line>
    </Stack>
  ),
}

/** Buttons have their own loading state that uses this spinner. */
export const InContext: Story = {
  render: () => (
    <Row>
      <Button loading>Book shipment</Button>
      <span style={{ display: "inline-flex", gap: 8, alignItems: "center", color: "var(--color-text-secondary)" }}>
        <Spinner size="sm" label="Checking the address" /> Checking the address…
      </span>
    </Row>
  ),
}
