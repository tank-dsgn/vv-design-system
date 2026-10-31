import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, StateMatrix, Stack } from "../docs/specimen.js"
import { ContextMenu, type ContextMenuItem } from "./ContextMenu.js"

const ITEMS: ContextMenuItem[] = [{ id: "open", label: "Open shipment" }, { id: "copy", label: "Copy reference" }, { id: "archive", label: "Archive shipment", disabled: true }, { id: "del", label: "Delete shipment", destructive: true }]
const Area = ({ text }: { text: string }) => <div style={{ display: "grid", placeItems: "center", height: 220, border: "1px dashed var(--color-border-hover)", borderRadius: "inherit", color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>{text}</div>

const meta = {
  id: "components-contextmenu",
  title: "Components/Actions/ContextMenu",
  component: ContextMenu,
  tags: ["new"],
  args: { label: "Shipment ORD-4417", items: ITEMS, onSelect: () => {}, children: <Area text="Right-click here, or focus and press Shift+F10" /> },
  argTypes: { items: { control: false }, children: { control: false } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "A menu on right click, as a shortcut for people who already work fast. Everything in it must also be reachable another way: touch screens have no right click." } } },
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Destructive last, disabled items stay visible. */
export const Open: Story = { args: { defaultOpen: true, children: <Area text="" /> } }

/** Hover and focus on the first item; a disabled item takes neither. */
export const States: Story = {
  parameters: { pseudo: { hover: ['[data-pseudo="hover"] [role="menuitem"]:first-of-type'], focusVisible: ['[data-pseudo="focus"] [role="menuitem"]:first-of-type'] } }, render: () => (
    <Stack><StateMatrix colWidth="240px" pressed={false} rows={[{ label: "Items", node: <ContextMenu label="Shipment" items={ITEMS} onSelect={() => {}} defaultOpen><div style={{ height: 180 }} /></ContextMenu> }]} /></Stack>
  ),
}
