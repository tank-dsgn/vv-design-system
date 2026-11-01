import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Icon } from "./Icon.js"
import { TopNav } from "./TopNav.js"
import { StateMatrix, pseudoParams } from "../docs/specimen.js"

const meta: Meta = {
  id: "components-topnav",
  title: "Components/Navigation/TopNav",
  tags: ["!dev"],
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
    const [page, setPage] = useState("home")
    return (
      <TopNav
        aria-label="Main"
        current={page}
        onNavigate={setPage}
        items={[
          { id: "home", label: "Home", icon: <Icon name="house" /> },
          { id: "projects", label: "Projects", icon: <Icon name="folder" /> },
          { id: "team", label: "Team", icon: <Icon name="users" /> },
          { id: "reports", label: "Reports", icon: <Icon name="chart-column" /> },
          { id: "settings", label: "Settings", icon: <Icon name="settings" /> },
        ]}
      />
    )
  },
}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked rows={[{ label: "Items", node: <TopNav aria-label="Items" items={[{ id: "a", label: "Home", icon: <Icon name="house" /> }, { id: "b", label: "Projects", icon: <Icon name="folder" /> }]} current="a" onNavigate={() => {}} /> }]} />
  ),
}
