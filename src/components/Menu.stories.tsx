import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Button } from "./Button.js"
import { Icon } from "./Icon.js"
import { IconButton } from "./IconButton.js"
import { Menu, type MenuSection } from "./Menu.js"
import { StateMatrix } from "../docs/specimen.js"

const SECTIONS: MenuSection[] = [
  {
    items: [
      { id: "edit", label: "Edit shipment", icon: <Icon name="edit" size={16} />, shortcut: "E" },
      { id: "duplicate", label: "Duplicate", icon: <Icon name="copy" size={16} />, shortcut: "⌘D" },
      { id: "share", label: "Share tracking link", icon: <Icon name="share" size={16} /> },
      { id: "download", label: "Download documents", icon: <Icon name="download" size={16} />, disabled: true },
    ],
  },
  {
    items: [{ id: "delete", label: "Delete shipment", icon: <Icon name="delete" size={16} />, destructive: true }],
  },
]

const meta = {
  id: "components-menu",
  title: "Components/Actions/Menu",
  tags: ["!dev"],
  component: Menu,
  args: {
    trigger: <Button variant="outlined" iconTrailing={<Icon name="chevron-down" size={16} />}>Actions</Button>,
    sections: SECTIONS,
    onSelect: () => {},
    align: "start",
  },
  argTypes: {
    trigger: { control: false },
    sections: { control: false },
    align: { control: "inline-radio", options: ["start", "end"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A list of actions behind a button, for secondary actions that do not earn a place on screen. " +
          "Group related actions into sections; put destructive ones last, in their own section. Keyboard: " +
          "↓ opens, ↑/↓ move, Home/End jump, a letter jumps to the next match, Esc closes and returns focus. " +
          "To pick a value rather than run an action, use Select.",
      },
      story: { height: "320px" },
    },
  },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const [last, setLast] = useState<string | null>(null)
    return (
      <div style={{ display: "flex", gap: 16, alignItems: "center", minHeight: 260, alignContent: "start", flexWrap: "wrap" }}>
        <Menu {...args} onSelect={setLast} />
        <span style={{ color: "var(--color-text-secondary)" }}>{last ? `Selected: ${last}` : "Nothing selected yet"}</span>
      </div>
    )
  },
}

/** Opened, to show the anatomy: sections, icons, shortcuts, a disabled item and a destructive one. */
export const Anatomy: Story = {
  render: (args) => <div style={{ minHeight: 260 }}><Menu {...args} defaultOpen /></div>,
}

/** On an icon button in a table row, aligned to the end. */
export const Overflow: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "flex-end", minHeight: 260, maxWidth: 480 }}>
      <Menu
        align="end"
        onSelect={() => {}}
        sections={[
          { title: "Shipment", items: [{ id: "edit", label: "Edit" }, { id: "dup", label: "Duplicate" }] },
          { items: [{ id: "archive", label: "Archive" }] },
        ]}
        trigger={<IconButton variant="ghost" size="sm" icon={<Icon name="menu" />} label="More actions for ORD-4417" />}
      />
    </div>
  ),
}

/** Hover and focus on the first item; a disabled item takes neither. */
export const States: Story = {
  parameters: { pseudo: { hover: ['[data-pseudo="hover"] [role="menuitem"]:first-of-type'], focusVisible: ['[data-pseudo="focus"] [role="menuitem"]:first-of-type'] } }, render: () => (
    <StateMatrix colWidth="240px" pressed={false} rows={[{ label: "Items", node: <div style={{ minHeight: 200 }}><Menu defaultOpen trigger={<Button variant="outlined">Actions</Button>} onSelect={() => {}} sections={[{ items: [{ id: "edit", label: "Edit shipment" }, { id: "print", label: "Print label", disabled: true }, { id: "del", label: "Delete shipment", destructive: true }] }]} /></div> }]} />
  ),
}
