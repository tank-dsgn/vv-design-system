import type { Meta, StoryObj } from "@storybook/react-vite"
import { Menubar, type MenubarMenu } from "./Menubar.js"
import { StateMatrix, pseudoParams } from "../docs/specimen.js"

const MENUS: MenubarMenu[] = [
  { label: "File", items: [{ id: "new", label: "New route", shortcut: "N" }, { id: "dup", label: "Duplicate route", shortcut: "D" }, { id: "print", label: "Print route", disabled: true }] },
  { label: "Edit", items: [{ id: "undo", label: "Undo", shortcut: "Z" }, { id: "redo", label: "Redo", shortcut: "Y" }] },
  { label: "View", items: [{ id: "map", label: "Show map" }, { id: "grid", label: "Show grid" }] },
]

const meta = {
  id: "components-menubar",
  title: "Components/Actions/Menubar",
  component: Menubar,
  tags: ["new", "!dev"],
  args: { label: "Route editor", menus: MENUS, onSelect: () => {} },
  argTypes: { menus: { control: false } },
  decorators: [(Story) => <div style={{ minHeight: 180 }}><Story /></div>],
  parameters: { docs: { description: { component: "A row of menus at the top of a desktop-like tool: an editor, a canvas. One tab stop; ←/→ move between menus, ↓ opens, Esc closes and returns focus." } } },
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix colWidth="minmax(170px, auto)" rows={[{ label: "Bar", node: <Menubar label="Route editor" menus={MENUS} onSelect={() => {}} /> }]} />
  ),
}

/** A menu open, with shortcuts and a disabled item. */
export const Open: Story = { args: { defaultOpen: 0 } }
