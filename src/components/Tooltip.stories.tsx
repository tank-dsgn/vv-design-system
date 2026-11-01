import type { Meta, StoryObj } from "@storybook/react-vite"
import { Line, Stack } from "../docs/specimen.js"
import { Button } from "./Button.js"
import { Icon } from "./Icon.js"
import { IconButton } from "./IconButton.js"
import { Kbd } from "./Kbd.js"
import { Tooltip } from "./Tooltip.js"

const meta = {
  id: "components-tooltip",
  title: "Components/Overlays/Tooltip",
  tags: ["!dev"],
  component: Tooltip,
  args: {
    content: "Duplicate shipment",
    placement: "top",
    children: <IconButton variant="outlined" icon={<Icon name="copy" />} label="Duplicate" />,
  },
  argTypes: {
    placement: { control: "inline-radio", options: ["top", "bottom", "left", "right"] },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A short label that appears on hover after a brief pause, and immediately on keyboard focus. It names " +
          "or explains a control — most often an icon button — and can show its shortcut. Never put essential " +
          "information or interactive content in a tooltip: touch screens may never show it. Esc hides it.",
      },
    },
  },
  decorators: [(Story) => <div style={{ padding: "48px 96px" }}><Story /></div>],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Placements: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 200px)", gap: 48, justifyItems: "center" }}>
      {(["top", "bottom", "left", "right"] as const).map((p) => (
        <div key={p} style={{ padding: "40px 0" }}>
          <Tooltip content={`Placed ${p}`} placement={p} open>
            <Button variant="outlined" size="sm">{p}</Button>
          </Tooltip>
        </div>
      ))}
    </div>
  ),
}

export const WithShortcut: Story = {
  render: () => (
    <Tooltip
      open
      content={<span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>Search <Kbd size="sm">⌘K</Kbd></span>}
    >
      <IconButton variant="outlined" icon={<Icon name="search" />} label="Search" />
    </Tooltip>
  ),
}

/** Hover or Tab across the toolbar. */
export const Toolbar: Story = {
  render: () => (
    <Stack>
      <Line label="Try it">
        {([["undo", "Undo"], ["redo", "Redo"], ["copy", "Duplicate"], ["share", "Share"], ["delete", "Delete"]] as const).map(([icon, label]) => (
          <Tooltip key={icon} content={label}>
            <IconButton variant="ghost" icon={<Icon name={icon} />} label={label} />
          </Tooltip>
        ))}
      </Line>
    </Stack>
  ),
}
