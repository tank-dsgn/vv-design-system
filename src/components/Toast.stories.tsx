import type { Meta, StoryObj } from "@storybook/react-vite"
import { useEffect, useRef, useState } from "react"
import { Row, Stack, Reasons, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { Button } from "./Button.js"
import { Toast, ToastRegion, type ToastTone } from "./Toast.js"

const meta = {
  id: "components-toast",
  title: "Components/Feedback/Toast",
  tags: ["!dev"],
  component: Toast,
  args: { tone: "success", children: "Shipment ORD-4417 booked" },
  argTypes: {
    tone: { control: "inline-radio", options: ["neutral", "success", "critical"] },
    action: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A brief confirmation of something the user just did — *Shipment booked*, *Link copied*. It appears " +
          "at the bottom of the screen, is announced politely, and leaves on its own after about five seconds. " +
          "Offer at most one action, typically **Undo**. Anything the user must act on belongs in a Banner or a Modal.",
      }
    },
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Tones: Story = {
  parameters: { docs: { wide: true } },
  render: () => (
    <Stack gap={12}>
      <Toast tone="neutral">Draft saved</Toast>
      <Toast tone="success" action={{ label: "Undo", onClick: () => {} }} onDismiss={() => {}}>3 shipments archived</Toast>
      <Toast tone="critical" action={{ label: "Retry", onClick: () => {} }} onDismiss={() => {}}>Could not reach the carrier</Toast>
      <Reasons label="Tone" rows={[
        ["all tones", "A result of something just done", "A dark surface in light theme and a light one in dark: it reads as a layer above the page, whatever the page looks like, without a coloured fill."],
        ["success, critical", "When the outcome could be either", "Just an icon changes. A full red or green toast would pull more attention than a passing message deserves."],
      ]} />
    </Stack>
  ),
}

type Item = { id: number; tone: ToastTone; text: string }

/** Trigger a few: they stack, announce themselves and leave after five seconds. */
export const Live: Story = {
  parameters: { docs: { story: { inline: false, height: "280px" } } },
  render: () => {
    const [items, setItems] = useState<Item[]>([])
    const next = useRef(1)
    const push = (tone: ToastTone, text: string) => setItems((l) => [...l, { id: next.current++, tone, text }])
    const drop = (id: number) => setItems((l) => l.filter((t) => t.id !== id))
    useEffect(() => {
      if (!items.length) return
      const t = setTimeout(() => drop(items[0].id), 5000)
      return () => clearTimeout(t)
    }, [items])
    return (
      <>
        <Row>
          <Button size="sm" onClick={() => push("success", "Shipment ORD-4417 booked")}>Book shipment</Button>
          <Button size="sm" variant="outlined" onClick={() => push("neutral", "Tracking link copied")}>Copy link</Button>
          <Button size="sm" variant="outlined" onClick={() => push("critical", "Could not reach the carrier")}>Simulate an error</Button>
        </Row>
        <ToastRegion>
          {items.map((t) => (
            <Toast key={t.id} tone={t.tone} onDismiss={() => drop(t.id)} action={t.tone === "success" ? { label: "Undo", onClick: () => drop(t.id) } : undefined}>
              {t.text}
            </Toast>
          ))}
        </ToastRegion>
      </>
    )
  },
}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked pressed={false} rows={[{ label: "Action and close", node: <Toast action={{ label: "Undo", onClick: () => {} }} onDismiss={() => {}}>Shipment booked</Toast> }]} />
  ),
}
