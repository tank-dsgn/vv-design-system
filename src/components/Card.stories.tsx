import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Grid, Narrow, State, pseudoParams, Line, Stack } from "../docs/specimen.js"
import { Avatar } from "./Avatar.js"
import { Badge } from "./Badge.js"
import { Card } from "./Card.js"

/** A route preview drawn in tokens, so it follows the theme. */
function RouteMedia() {
  return (
    <svg viewBox="0 0 240 135" role="img" aria-label="Route from North warehouse to Port terminal" style={{ display: "block", width: "100%", height: "auto", background: "var(--color-surface-sunken)" }}>
      <g stroke="var(--color-border-default)" strokeWidth="1">
        {[27, 54, 81, 108].map((y) => <line key={y} x1="0" x2="240" y1={y} y2={y} />)}
        {[40, 80, 120, 160, 200].map((x) => <line key={x} y1="0" y2="135" x1={x} x2={x} />)}
      </g>
      <path d="M36 102 C 80 102, 92 44, 132 52 S 188 34, 204 32" fill="none" stroke="var(--color-text-accent)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="36" cy="102" r="6" fill="var(--color-surface-raised)" stroke="var(--color-text-accent)" strokeWidth="3" />
      <circle cx="204" cy="32" r="6" fill="var(--color-text-accent)" />
    </svg>
  )
}

const meta = {
  id: "components-card",
  title: "Components/Content/Card",
  tags: ["!dev"],
  component: Card,
  args: { title: "ORD-4417", meta: "North warehouse → Port terminal" },
  argTypes: { media: { control: false }, footer: { control: false }, children: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "Groups the facts about one object so a list of objects can be scanned as a grid. A card with `onClick` " +
          "becomes a single button — focusable, with hover and a selected state; a static card has neither, so it " +
          "never promises a click it does not handle. Media, title, meta and footer are all optional slots.",
      },
    },
  },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => <div style={{ maxWidth: 280 }}><Card {...args} footer={<Badge tone="info" dot>In transit</Badge>} /></div>,
}

export const WithMedia: Story = {
  render: (args) => (
    <div style={{ maxWidth: 280 }}>
      <Card {...args} media={<RouteMedia />} footer={<span style={{ color: "var(--color-text-muted)" }}>Departs today, 14:30</span>} />
    </div>
  ),
}

/** Interactive cards in a grid. Arrow through them with Tab; the selected one is marked. */
export const Selectable: Story = {
  render: () => {
    const [picked, setPicked] = useState("north")
    const items = [
      { id: "north", title: "North warehouse", meta: "12 docks · open 06–22" },
      { id: "port", title: "Port terminal", meta: "4 docks · open 24h" },
      { id: "retail", title: "Retail hub", meta: "6 docks · open 08–20" },
    ]
    return (
      <Grid min={180}>
        {items.map((i) => <Card key={i.id} title={i.title} meta={i.meta} selected={picked === i.id} onClick={() => setPicked(i.id)} />)}
      </Grid>
    )
  },
}

export const States: Story = {
  parameters: pseudoParams,
  render: () => (
    <Stack gap={16}>
      <Line label="Static"><div style={{ width: 240 }}><Card title="North warehouse" meta="12 docks" /></div></Line>
      <Line label="Interactive"><div style={{ width: 240 }}><Card title="North warehouse" meta="12 docks" onClick={() => {}} /></div></Line>
      <Line label="Hover"><div style={{ width: 240 }}><State is="hover"><Card title="North warehouse" meta="12 docks" onClick={() => {}} /></State></div></Line>
      <Line label="Focus"><div style={{ width: 240 }}><State is="focus"><Card title="North warehouse" meta="12 docks" onClick={() => {}} /></State></div></Line>
      <Line label="Selected"><div style={{ width: 240 }}><Card title="North warehouse" meta="12 docks" onClick={() => {}} selected /></div></Line>
    </Stack>
  ),
}

/** Body content goes in `children`. */
export const WithContent: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Card title="Maya Collins" meta="Dispatcher · North warehouse" footer={<Badge tone="success">On shift</Badge>}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", color: "var(--color-text-secondary)" }}>
          <Avatar size="sm" name="Maya Collins" tone="blue" /> 14 shipments booked today
        </div>
      </Card>
    </div>
  ),
}
