import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Avatar } from "./Avatar.js"
import { Button } from "./Button.js"
import { Icon } from "./Icon.js"
import { Sidebar } from "./Sidebar.js"
import { StateMatrix, pseudoParams } from "../docs/specimen.js"

const meta = {
  id: "components-sidebar",
  title: "Components/Navigation/Sidebar",
  tags: ["!dev"],
  component: Sidebar,
  args: { "aria-label": "Main navigation", current: "orders", onNavigate: () => {}, groups: [] },
  argTypes: { groups: { control: false }, header: { control: false }, footer: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "Primary navigation for an application with many sections, grouped under headings. Collapses to an " +
          "icon rail (240 → 64px); collapsed items keep their names as tooltips and accessible labels. The current " +
          "page is marked with `aria-current`.",
      },
    },
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const GROUPS = [
  {
    title: "Operations",
    items: [
      { id: "dashboard", label: "Dashboard", icon: <Icon name="dashboard" /> },
      { id: "orders", label: "Orders", icon: <Icon name="documents" /> },
      { id: "shipments", label: "Shipments", icon: <Icon name="send" /> },
      { id: "inventory", label: "Inventory", icon: <Icon name="store" /> },
    ],
  },
  {
    title: "Directory",
    items: [
      { id: "customers", label: "Customers", icon: <Icon name="customers" /> },
      { id: "locations", label: "Locations", icon: <Icon name="location" /> },
      { id: "settings", label: "Settings", icon: <Icon name="settings" /> },
    ],
  },
]

function Demo({ startCollapsed = false }: { startCollapsed?: boolean }) {
  const [page, setPage] = useState("orders")
  const [collapsed, setCollapsed] = useState(startCollapsed)
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start", height: 520 }}>
      <Sidebar
        aria-label="Main navigation"
        groups={GROUPS}
        current={page}
        onNavigate={setPage}
        collapsed={collapsed}
        footer={<div style={{ display: "flex", gap: 8, alignItems: "center", padding: "var(--space-8)" }}><Avatar size="sm" name="Maya Collins" tone="blue" />{!collapsed && <span>Maya Collins</span>}</div>}
      />
      <Button variant="outlined" size="sm" iconLeading={<Icon name={collapsed ? "expand" : "collapse"} size={16} />} onClick={() => setCollapsed((c) => !c)}>
        {collapsed ? "Expand" : "Collapse"}
      </Button>
    </div>
  )
}

export const Expanded: Story = { render: () => <Demo /> }
export const Collapsed: Story = { render: () => <Demo startCollapsed /> }

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked rows={[{ label: "Item", node: <div style={{ width: 240 }}><Sidebar aria-label="Item" groups={[{ items: [{ id: "a", label: "Shipments", icon: <Icon name="orders" /> }] }]} current="" onNavigate={() => {}} /></div> }, { label: "Current", node: <div style={{ width: 240 }}><Sidebar aria-label="Current" groups={[{ items: [{ id: "a", label: "Shipments", icon: <Icon name="orders" /> }] }]} current="a" onNavigate={() => {}} /></div> }]} />
  ),
}
