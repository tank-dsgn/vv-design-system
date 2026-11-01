import type { Meta, StoryObj } from "@storybook/react-vite"
import { useEffect, useState } from "react"
import { Line, Narrow, Stack } from "../docs/specimen.js"
import { Avatar } from "./Avatar.js"
import { Badge } from "./Badge.js"
import { Button } from "./Button.js"
import { Skeleton } from "./Skeleton.js"

const meta = {
  id: "components-skeleton",
  title: "Components/Feedback/Skeleton",
  tags: ["!dev"],
  component: Skeleton,
  args: { shape: "text", lines: 3 },
  argTypes: { shape: { control: "inline-radio", options: ["text", "rect", "circle"] } },
  parameters: {
    docs: {
      description: {
        component:
          "A placeholder in the shape of the content that is loading, so the layout does not jump when it arrives. " +
          "Match the real content: same sizes, same number of lines. Skeletons are hidden from screen readers — set " +
          "`aria-busy=\"true\"` on the region that is loading. For work with no known shape, use Spinner.",
      },
    },
  },
  decorators: [(Story) => <Narrow><Story /></Narrow>],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { width: 320, height: 120 } }

export const Shapes: Story = {
  render: () => (
    <Stack gap={16}>
      <Line label="text · 3 lines"><div style={{ flex: 1 }}><Skeleton lines={3} /></div></Line>
      <Line label="rect"><Skeleton shape="rect" width={160} height={90} /></Line>
      <Line label="circle"><Skeleton shape="circle" width={40} /></Line>
    </Stack>
  ),
}

function Person() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="Maya Collins" tone="blue" />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "var(--font-weight-medium)" }}>Maya Collins</div>
        <div style={{ color: "var(--color-text-secondary)" }}>Dispatcher · North warehouse</div>
      </div>
      <Badge tone="success">On shift</Badge>
    </div>
  )
}

function PersonSkeleton() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Skeleton shape="circle" width={40} />
      <div style={{ flex: 1 }}><Skeleton lines={2} width="70%" /></div>
      <Skeleton shape="rect" width={64} height={20} />
    </div>
  )
}

/** The skeleton mirrors the loaded row exactly, so nothing moves when data arrives. */
export const LoadingToLoaded: Story = {
  render: () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      if (!loading) return
      const t = setTimeout(() => setLoading(false), 1800)
      return () => clearTimeout(t)
    }, [loading])
    return (
      <Stack gap={16}>
        <div aria-busy={loading} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[0, 1, 2].map((i) => (loading ? <PersonSkeleton key={i} /> : <Person key={i} />))}
        </div>
        <div><Button size="sm" variant="outlined" onClick={() => setLoading(true)} disabled={loading}>Reload</Button></div>
      </Stack>
    )
  },
}
