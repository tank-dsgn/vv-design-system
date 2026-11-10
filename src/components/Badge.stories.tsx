import type { Meta, StoryObj } from "@storybook/react-vite"
import { Matrix, Row, Reasons } from "../docs/specimen.js"
import { Badge, type BadgeTone } from "./Badge.js"
import { Icon } from "./Icon.js"

const meta = {
  id: "components-badge",
  title: "Components/Feedback/Badge",
  tags: ["!dev"],
  component: Badge,
  args: { children: "In transit", tone: "info", size: "md", strong: false, dot: false },
  argTypes: {
    tone: { control: "inline-radio", options: ["neutral", "info", "success", "attention", "warning", "critical"] },
    size: { control: "inline-radio", options: ["md", "lg"] },
    icon: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A short, read-only status label on an object: *Delivered*, *Overdue*, *Draft*. Tone reinforces the " +
          "label but never replaces it. **strong** is for the one status that must stand out in a list. " +
          "For user-editable keywords, use Tag.",
      },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

const TONES: BadgeTone[] = ["neutral", "info", "success", "attention", "warning", "critical"]
const TEXT: Record<BadgeTone, string> = {
  neutral: "Draft",
  info: "In transit",
  success: "Delivered",
  attention: "Delayed",
  warning: "Missing weight",
  critical: "Failed",
}

export const Playground: Story = {}

export const Tones: Story = {
  render: () => (
    <>
    <Matrix
      columns={["Subtle", "Strong", "With dot", "With icon"]}
      colWidth="minmax(120px, auto)"
      rows={TONES.map((t) => ({
        label: t,
        cells: [
          <Badge tone={t}>{TEXT[t]}</Badge>,
          t === "neutral" ? <span className="vvs-label">—</span> : <Badge tone={t} strong>{TEXT[t]}</Badge>,
          <Badge tone={t} dot>{TEXT[t]}</Badge>,
          <Badge tone={t} icon={<Icon name={t === "success" ? "success" : t === "critical" ? "error" : t === "neutral" ? "edit" : t === "info" ? "information" : "warning"} size={16} />}>{TEXT[t]}</Badge>,
        ],
      }))}
    />
    <Reasons label="Form" rows={[
      ["Subtle", "Status in lists, the default", "A column of solid badges would outshout the data it annotates."],
      ["Strong", "The one status that must stand out", "It works because it's rare. Neutral has no strong form: a status with no judgement has nothing to emphasise."],
      ["With dot", "Live or changing states: In transit", "The dot reads as a signal light, and it's decoration only. The word carries the meaning."],
      ["With icon", "When a status is scanned for at speed", "Shape adds a second cue for people who can't rely on colour."],
    ]} />
    </>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Row>
      <Badge size="md" tone="success">Delivered · 20px</Badge>
      <Badge size="lg" tone="success">Delivered · 24px</Badge>
    </Row>
  ),
}
