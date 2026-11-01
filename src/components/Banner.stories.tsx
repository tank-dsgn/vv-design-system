import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Narrow, Stack, Reasons, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { Banner, type BannerTone } from "./Banner.js"
import { Button } from "./Button.js"

const meta = {
  id: "components-banner",
  title: "Components/Feedback/Banner",
  tags: ["!dev"],
  component: Banner,
  args: {
    tone: "info",
    title: "Rates change on 1 December",
    children: "Bookings made before then keep the current rate.",
  },
  argTypes: {
    tone: { control: "inline-radio", options: ["neutral", "info", "success", "warning", "critical"] },
    actions: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A message about the whole page or section, placed at its top. Use it for system status, " +
          "consequences of the user's data, or changes they need to know about. Only **critical** interrupts a " +
          "screen reader; the other tones are announced politely. For feedback on a single field, use InlineMessage; " +
          "for a short confirmation after an action, use Toast.",
      },
    },
  },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
} satisfies Meta<typeof Banner>

export default meta
type Story = StoryObj<typeof meta>

const EXAMPLES: Record<BannerTone, [string, string]> = {
  neutral: ["Scheduled maintenance", "Tracking updates pause on Sunday from 02:00 to 03:00."],
  info: ["Rates change on 1 December", "Bookings made before then keep the current rate."],
  success: ["Carrier account connected", "New shipments are now booked with North Line automatically."],
  warning: ["3 shipments are missing a weight", "They cannot be booked until a weight is added."],
  critical: ["Booking failed", "The carrier did not respond. No shipment was created — try again."],
}

export const Playground: Story = {}

export const Tones: Story = {
  render: () => (
    <Stack gap={12}>
      {(Object.keys(EXAMPLES) as BannerTone[]).map((t) => (
        <Banner key={t} tone={t} title={EXAMPLES[t][0]}>{EXAMPLES[t][1]}</Banner>
      ))}
      <Reasons label="Tone" rows={[
        ["neutral, info", "News with nothing to fix", "Pale and dismissible: they shouldn't compete with the page's work."],
        ["success", "A change that took effect beyond this screen", "For a simple confirmation, a Toast is lighter."],
        ["warning", "A problem that's coming unless someone acts", "Includes the action, because a warning with no way forward is just stress."],
        ["critical", "Something failed or is blocked", "The only tone that interrupts a screen reader, and it isn't dismissible by default: an error waved away goes unfixed."],
      ]} />
    </Stack>
  ),
}

/** Actions resolve the message where it is raised. Keep to one primary and one secondary. */
export const WithActions: Story = {
  args: {
    tone: "warning",
    title: "3 shipments are missing a weight",
    children: "They cannot be booked until a weight is added.",
    actions: <><Button size="sm" variant="outlined">Add weights</Button><Button size="sm" variant="ghost">Review list</Button></>,
  },
}

/** Low-priority banners can be dismissed. Critical ones stay until the cause is fixed. */
export const Dismissible: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return open ? (
      <Banner tone="info" title="Rates change on 1 December" onDismiss={() => setOpen(false)}>
        Bookings made before then keep the current rate.
      </Banner>
    ) : (
      <Button variant="outlined" onClick={() => setOpen(true)}>Show the banner again</Button>
    )
  },
}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked pressed={false} rows={[{ label: "Dismissible", node: <Banner tone="info" title="Rates change on 1 December" onDismiss={() => {}}>Bookings made before then keep the current rate.</Banner> }]} />
  ),
}
