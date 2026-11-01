import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Line, Stack, State, pseudoParams } from "../docs/specimen.js"
import { Icon } from "./Icon.js"
import { Tabs } from "./Tabs.js"

const meta = {
  id: "components-tabs",
  title: "Components/Navigation/Tabs",
  tags: ["!dev"],
  component: Tabs,
  args: { "aria-label": "Shipments", value: "active", onChange: () => {}, items: [], size: "md" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md"] }, items: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "Switches between views of the same content without leaving the page — *In progress*, *Completed*, *Drafts*. " +
          "Counters show how many items each view holds. Tab reaches the tab list once; arrow keys move between tabs " +
          "and skip disabled ones. To move between pages, use TopNav or Sidebar.",
      },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const ITEMS = [
  { id: "active", label: "In progress", counter: 12 },
  { id: "done", label: "Completed", counter: 148 },
  { id: "draft", label: "Drafts", counter: 3 },
  { id: "archive", label: "Archive", disabled: true },
]

export const Playground: Story = {
  render: (args) => {
    const [tab, setTab] = useState("active")
    return <Tabs {...args} items={ITEMS} value={tab} onChange={setTab} />
  },
}

export const Sizes: Story = {
  render: () => (
    <Stack>
      <Line label="md"><Tabs aria-label="Medium" size="md" items={ITEMS} value="active" onChange={() => {}} /></Line>
      <Line label="sm"><Tabs aria-label="Small" size="sm" items={ITEMS} value="active" onChange={() => {}} /></Line>
    </Stack>
  ),
}

export const States: Story = {
  parameters: pseudoParams,
  render: () => (
    <Stack>
      <Line label="Selected · rest"><Tabs aria-label="a" items={ITEMS.slice(0, 3)} value="active" onChange={() => {}} /></Line>
      <Line label="Hover"><State is="hover"><Tabs aria-label="b" items={ITEMS.slice(0, 3)} value="__none" onChange={() => {}} /></State></Line>
      <Line label="Focus"><State is="focus"><Tabs aria-label="c" items={ITEMS.slice(0, 1)} value="active" onChange={() => {}} /></State></Line>
      <Line label="Disabled"><Tabs aria-label="d" items={[{ id: "x", label: "Archive", disabled: true }]} value="__none" onChange={() => {}} /></Line>
    </Stack>
  ),
}

export const WithIcons: Story = {
  render: () => {
    const [tab, setTab] = useState("orders")
    return (
      <Tabs
        aria-label="Sections"
        value={tab}
        onChange={setTab}
        items={[
          { id: "orders", label: "Orders", iconLeading: <Icon name="documents" size={16} />, counter: 7 },
          { id: "routes", label: "Routes", iconLeading: <Icon name="map" size={16} /> },
          { id: "team", label: "Team", iconLeading: <Icon name="team" size={16} /> },
        ]}
      />
    )
  },
}

/** In a narrow container the row scrolls sideways rather than wrapping. */
export const Overflow: Story = {
  render: () => {
    const [tab, setTab] = useState("a")
    return (
      <div style={{ maxWidth: 320 }}>
        <Tabs
          aria-label="Long sections"
          value={tab}
          onChange={setTab}
          items={[
            { id: "a", label: "Awaiting confirmation", counter: 3 },
            { id: "b", label: "With the carrier" },
            { id: "c", label: "Closed with discrepancies" },
          ]}
        />
      </div>
    )
  },
}
