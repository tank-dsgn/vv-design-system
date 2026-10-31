import type { Meta, StoryObj } from "@storybook/react-vite"
import { Line, Row, Stack, Reasons } from "../docs/specimen.js"
import { Avatar, type AvatarTone } from "./Avatar.js"
import { Icon } from "./Icon.js"

const meta = {
  id: "components-avatar",
  title: "Components/Content/Avatar",
  component: Avatar,
  args: { name: "Maya Collins", size: "md", tone: "blue", shape: "circle" },
  argTypes: {
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
    tone: { control: "select", options: ["neutral", "blue", "magenta", "orange", "purple", "green", "red"] },
    shape: { control: "inline-radio", options: ["circle", "rounded"] },
    icon: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Represents a person or an organisation. Initials are derived from `name`; with `src` the image is shown " +
          "instead. Use **circle** for people and **rounded** for companies and workspaces. An avatar without a " +
          "name is treated as decoration and hidden from screen readers.",
      },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

const TONES: AvatarTone[] = ["neutral", "blue", "magenta", "orange", "purple", "green", "red"]
const PEOPLE = ["Maya Collins", "Tom Okafor", "Lena Fischer", "Arjun Rao", "Sara Lind", "Diego Ruiz", "Nora Haddad"]

export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <Stack gap={16}>
      {(["xs", "sm", "md", "lg"] as const).map((s) => (
        <Line key={s} label={`${s} · ${{ xs: 24, sm: 32, md: 40, lg: 48 }[s]}px`}>
          <Avatar {...args} size={s} />
          <Avatar {...args} size={s} shape="rounded" name="North Line" tone="green" />
          <Avatar {...args} size={s} name={undefined} icon={<Icon name="customers" size={s === "xs" ? 16 : 20} />} tone="neutral" />
        </Line>
      ))}
    </Stack>
  ),
}

/** Seven tones. Assign them by a stable key (a user id), not at random, so a person keeps their colour. */
export const Tones: Story = {
  render: () => <Row>{TONES.map((t, i) => <Avatar key={t} tone={t} name={PEOPLE[i]} />)}</Row>,
}

export const Content: Story = {
  parameters: { docs: { wide: true } },
  render: () => (
    <Stack gap={16}>
      <Line label="Initials"><Avatar name="Maya Collins" tone="blue" /></Line>
      <Line label="Icon"><Avatar icon={<Icon name="ai" />} tone="purple" /></Line>
      <Line label="Image">
        <Avatar
          name="Alpine Forest Products"
          shape="rounded"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%2315803d'/%3E%3Cpath d='M20 9l10 21H10z' fill='white'/%3E%3C/svg%3E"
        />
      </Line>
      <Line label="Empty"><Avatar /></Line>
      <Reasons label="Form" rows={[
        ["Circle", "People", "The shape reads as a person at any size, so the two kinds stay apart in a mixed list."],
        ["Rounded", "Companies, workspaces", "Logos are mostly squarish, and a circle would crop their corners."],
        ["Initials", "No photo yet", "Derived from the name, so one person never shows two sets of initials."],
      ]} />
    </Stack>
  ),
}

/** A stack of people on a shared item. Overlap with a ring in the page colour. */
export const Group: Story = {
  render: () => (
    <div style={{ display: "flex" }}>
      {PEOPLE.slice(0, 4).map((n, i) => (
        <span key={n} style={{ marginLeft: i ? -8 : 0, borderRadius: "var(--radius-full)", boxShadow: "0 0 0 2px var(--color-surface-primary)" }}>
          <Avatar size="sm" name={n} tone={TONES[i + 1]} />
        </span>
      ))}
    </div>
  ),
}
