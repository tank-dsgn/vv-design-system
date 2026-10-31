import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Icon } from "./Icon.js"
import { TopNav } from "./TopNav.js"
import { StateMatrix, pseudoParams } from "../docs/specimen.js"

const meta: Meta = {
  id: "components-topnav",
  title: "Components/Navigation/TopNav",
  component: TopNav,
  parameters: {
    docs: {
      description: {
        component:
          "Horizontal primary navigation for an application with a handful of top-level pages. Each item " +
          "switches the whole page and the current one carries `aria-current=\"page\"`. Below 900px labels collapse " +
          "to icons and stay available as accessible names.",
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState("dashboard")
    return (
      <TopNav
        aria-label="Main"
        current={page}
        onNavigate={setPage}
        items={[
          { id: "dashboard", label: "Dashboard", icon: <Icon name="dashboard" /> },
          { id: "map", label: "Map", icon: <Icon name="map" /> },
          { id: "analytics", label: "Analytics", icon: <Icon name="chart" /> },
          { id: "progress", label: "Progress", icon: <Icon name="time" /> },
          { id: "deliverables", label: "Deliverables", icon: <Icon name="folder" /> },
        ]}
      />
    )
  },
}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked rows={[{ label: "Items", node: <TopNav aria-label="Items" items={[{ id: "a", label: "Shipments", icon: <Icon name="orders" /> }, { id: "b", label: "Rates", icon: <Icon name="money" /> }]} current="a" onNavigate={() => {}} /> }]} />
  ),
}
