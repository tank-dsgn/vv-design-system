import type { Meta, StoryObj } from "@storybook/react-vite"
import { Line, Row, Stack } from "../docs/specimen.js"
import { ICONS } from "../icons/icons.js"
import { Icon, type IconName } from "./Icon.js"

const meta = {
  id: "components-icon",
  title: "Components/Content/Icon",
  tags: ["!dev"],
  component: Icon,
  args: { name: "notifications", size: 20, filled: false },
  argTypes: {
    name: { control: "select", options: Object.keys(ICONS) },
    size: { control: "inline-radio", options: [16, 20, 24] },
    filled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Renders an icon from the VV Foundations set. Icons inherit the text colour around them. " +
          "Give `label` only when the icon is the sole carrier of meaning; next to text it stays silent. " +
          "The full searchable library is under **Foundations → Iconography**.",
      },
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: () => (
    <Stack gap={16}>
      {([16, 20, 24] as const).map((s) => (
        <Line key={s} label={`${s}px`}>
          {(["search", "notifications", "settings", "document", "location"] as IconName[]).map((n) => <Icon key={n} name={n} size={s} />)}
        </Line>
      ))}
    </Stack>
  ),
}

/** Outlined by default; Filled marks the selected or active one. */
export const Styles: Story = {
  render: () => (
    <Stack gap={16}>
      {[false, true].map((f) => (
        <Line key={String(f)} label={f ? "Filled" : "Outlined"}>
          {(["house", "orders", "trucking", "customers", "notifications", "settings", "star", "bookmark"] as IconName[]).map((n) => <Icon key={n} name={n} filled={f} />)}
        </Line>
      ))}
    </Stack>
  ),
}

/** Icons take the colour of their text, in every state and theme. */
export const InheritsColour: Story = {
  render: () => (
    <Row>
      <span style={{ color: "var(--color-text-critical)", display: "inline-flex", gap: 6, alignItems: "center" }}><Icon name="error" size={16} />Booking failed</span>
      <span style={{ color: "var(--color-text-success)", display: "inline-flex", gap: 6, alignItems: "center" }}><Icon name="success" size={16} />Delivered</span>
      <span style={{ color: "var(--color-text-accent)", display: "inline-flex", gap: 6, alignItems: "center" }}><Icon name="information" size={16} />2 updates</span>
      <span style={{ color: "var(--color-text-secondary)", display: "inline-flex", gap: 6, alignItems: "center" }}><Icon name="time" size={16} />Updated 5 min ago</span>
    </Row>
  ),
}
