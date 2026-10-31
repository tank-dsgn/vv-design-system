import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Line, Narrow, Stack, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { Icon } from "./Icon.js"
import { SegmentedControl } from "./SegmentedControl.js"

const VIEWS = [
  { value: "list", label: "List", icon: <Icon name="menu" size={16} /> },
  { value: "cards", label: "Cards", icon: <Icon name="dashboard" size={16} /> },
  { value: "map", label: "Map", icon: <Icon name="map" size={16} /> },
]

const meta = {
  id: "components-segmentedcontrol",
  title: "Components/Forms/SegmentedControl",
  component: SegmentedControl,
  tags: ["new"],
  args: { "aria-label": "View", options: VIEWS, value: "list", onChange: () => {}, size: "md", fill: false },
  argTypes: { options: { control: false }, size: { control: "inline-radio", options: ["sm", "md"] } },
  parameters: {
    docs: {
      description: {
        component:
          "Switches between two to five views or modes of the same content in place — List and Map, Day and Week. " +
          "A radio group: Tab reaches it once, arrows move the selection. To switch between sections of a page, use Tabs.",
      },
    },
  },
} satisfies Meta<typeof SegmentedControl>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const [v, setV] = useState(args.value)
    return <SegmentedControl {...args} value={v} onChange={setV} />
  },
}

export const Sizes: Story = {
  render: () => (
    <Stack gap={16}>
      <Line label="md · 40px"><SegmentedControl aria-label="Period" size="md" value="week" onChange={() => {}} options={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }]} /></Line>
      <Line label="sm · 32px"><SegmentedControl aria-label="Period" size="sm" value="week" onChange={() => {}} options={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }]} /></Line>
    </Stack>
  ),
}

/** Fills its container — for a narrow panel or a mobile header. */
export const Fill: Story = {
  render: () => {
    const [v, setV] = useState("in")
    return <Narrow><SegmentedControl aria-label="Direction" fill value={v} onChange={setV} options={[{ value: "in", label: "Inbound" }, { value: "out", label: "Outbound" }]} /></Narrow>
  },
}

/** A mode that does not apply stays visible and disabled. */
export const Disabled: Story = { args: { options: [...VIEWS.slice(0, 2), { ...VIEWS[2], disabled: true }] } }

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked rows={[{ label: "Options", node: <SegmentedControl aria-label="View" options={VIEWS} value={VIEWS[0].value} onChange={() => {}} />, disabled: <SegmentedControl aria-label="View" options={VIEWS.map((v) => ({ ...v, disabled: true }))} value={VIEWS[0].value} onChange={() => {}} /> }]} />
  ),
}
