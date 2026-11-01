import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Line, Narrow, Stack, State, pseudoParams } from "../docs/specimen.js"
import { Dropzone } from "./Dropzone.js"

const meta = {
  id: "components-dropzone",
  title: "Components/Forms/Dropzone",
  tags: ["!dev"],
  component: Dropzone,
  args: { size: "lg" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md", "lg"] } },
  parameters: {
    docs: {
      description: {
        component:
          "Accepts files by drag and drop or by click. The zone is keyboard-reachable and opens the file picker " +
          "with Enter or Space. Dragging a file over it is styled more strongly than hover, so the drop target is unmistakable.",
      },
    },
  },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
} satisfies Meta<typeof Dropzone>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const [names, setNames] = useState<string[]>([])
    return (
      <Stack gap={12}>
        <Dropzone {...args} multiple onFiles={(f) => setNames(f.map((x) => x.name))} />
        {names.length > 0 && <span style={{ color: "var(--color-text-secondary)" }}>Selected: {names.join(", ")}</span>}
      </Stack>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <Stack gap={16}>
      <Line label="lg"><div style={{ flex: 1 }}><Dropzone size="lg" /></div></Line>
      <Line label="md"><div style={{ flex: 1 }}><Dropzone size="md" /></div></Line>
      <Line label="sm"><div style={{ flex: 1 }}><Dropzone size="sm" /></div></Line>
    </Stack>
  ),
}

export const States: Story = {
  parameters: pseudoParams,
  render: () => (
    <Stack gap={16}>
      <Line label="Rest"><div style={{ flex: 1 }}><Dropzone size="md" /></div></Line>
      <Line label="Hover"><div style={{ flex: 1 }}><State is="hover"><Dropzone size="md" /></State></div></Line>
      <Line label="Focus"><div style={{ flex: 1 }}><State is="focus"><Dropzone size="md" /></State></div></Line>
      <Line label="Invalid"><div style={{ flex: 1 }}><Dropzone size="md" invalid>Only PDF files up to 10 MB</Dropzone></div></Line>
      <Line label="Disabled"><div style={{ flex: 1 }}><Dropzone size="md" disabled>Uploads are closed for this shipment</Dropzone></div></Line>
    </Stack>
  ),
}
