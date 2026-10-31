import type { Meta, StoryObj } from "@storybook/react-vite"
import { Attachments } from "./Attachments.js"
import { StateMatrix, pseudoParams } from "../docs/specimen.js"

const FILES = [{ id: "a", name: "invoice-4417.pdf", size: "1.2 MB", kind: "pdf" as const }, { id: "b", name: "dock-photo.jpg", size: "860 KB", kind: "image" as const }, { id: "c", name: "packing-list.csv", size: "12 KB" }]

const meta = {
  id: "components-attachments",
  title: "Components/AI/Attachments",
  component: Attachments,
  tags: ["new"],
  args: { items: FILES, onRemove: () => {} },
  argTypes: { items: { control: false } },
  parameters: { docs: { description: { component: "Files added to a message: removable while composing, read-only once sent. For uploads with progress and retry, use FileItem." } } },
} satisfies Meta<typeof Attachments>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Once sent, nothing can be removed. */
export const Sent: Story = { args: { onRemove: undefined } }

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked pressed={false} rows={[{ label: "Remove button", node: <Attachments items={[FILES[0]]} onRemove={() => {}} /> }]} />
  ),
}
