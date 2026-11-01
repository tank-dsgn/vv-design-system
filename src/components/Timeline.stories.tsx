import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow } from "../docs/specimen.js"
import { Timeline } from "./Timeline.js"

const EVENTS = [
  { id: "4", title: "Arrived at Port terminal", time: <time dateTime="2026-11-12T14:05">12 Nov, 14:05</time>, description: "Unloaded at dock 4. Waiting for the receiver to sign.", tone: "accent" as const },
  { id: "3", title: "Delayed at border crossing", time: <time dateTime="2026-11-12T09:40">12 Nov, 09:40</time>, description: "Customs inspection added 2 hours.", tone: "critical" as const },
  { id: "2", title: "Picked up by North Line", time: <time dateTime="2026-11-11T16:20">11 Nov, 16:20</time>, tone: "success" as const },
  { id: "1", title: "Shipment booked", time: <time dateTime="2026-11-10T11:02">10 Nov, 11:02</time>, description: "Booked by Maya Collins." },
]

const meta = {
  id: "components-timeline",
  title: "Components/Data/Timeline",
  component: Timeline,
  tags: ["new", "!dev"],
  args: { events: EVENTS },
  argTypes: { events: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "What happened to an object, in order — a shipment's tracking history, an invoice's activity. Newest first when people come for " +
          "the current state; oldest first when they read it as a story. The tone marks the events that matter, not every event.",
      },
    },
  },
  decorators: [(Story) => <Narrow><Story /></Narrow>],
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Without tones: a plain activity log. */
export const Neutral: Story = { args: { events: EVENTS.map((e) => ({ ...e, tone: undefined })) } }
