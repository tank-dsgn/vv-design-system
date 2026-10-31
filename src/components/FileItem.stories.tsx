import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, Stack } from "../docs/specimen.js"
import { Dropzone } from "./Dropzone.js"
import { FileItem } from "./FileItem.js"

const meta = {
  id: "components-fileitem",
  title: "Components/Forms/FileItem",
  component: FileItem,
  tags: ["new"],
  args: { name: "CMR-4417.pdf", size: 482000, status: "done", progress: 60, onRemove: () => {} },
  argTypes: { status: { control: "inline-radio", options: ["uploading", "done", "error"] }, progress: { control: { type: "range", min: 0, max: 100 } } },
  parameters: {
    docs: {
      description: {
        component:
          "One file in an upload list under a Dropzone: its name, size and progress, and what to do when it fails. " +
          "Remove becomes Cancel while uploading; a failed file offers Retry.",
      },
    },
  },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
} satisfies Meta<typeof FileItem>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = {
  render: () => (
    <Stack gap={8}>
      <FileItem name="packing-list.xlsx" size={36000} status="uploading" progress={42} onRemove={() => {}} />
      <FileItem name="CMR-4417.pdf" size={482000} status="done" onRemove={() => {}} />
      <FileItem name="dock-photo.jpg" size={8400000} status="error" error="Larger than 5 MB" onRemove={() => {}} onRetry={() => {}} />
    </Stack>
  ),
}

/** Under a Dropzone, the usual pairing. */
export const WithDropzone: Story = {
  name: "With Dropzone",
  render: () => (
    <Stack gap={12}>
      <Dropzone size="md" multiple />
      <FileItem name="CMR-4417.pdf" size={482000} onRemove={() => {}} />
      <FileItem name="invoice-4417.pdf" size={96000} status="uploading" progress={80} onRemove={() => {}} />
    </Stack>
  ),
}
