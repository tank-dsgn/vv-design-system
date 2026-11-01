import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, Row } from "../docs/specimen.js"
import { Button } from "./Button.js"
import { Divider } from "./Divider.js"

const meta = {
  id: "components-divider",
  title: "Components/Content/Divider",
  component: Divider,
  tags: ["new", "!dev"],
  args: { orientation: "horizontal", spacing: "md" },
  argTypes: { orientation: { control: "inline-radio", options: ["horizontal", "vertical"] }, spacing: { control: "inline-radio", options: ["none", "sm", "md"] } },
  parameters: {
    docs: {
      description: {
        component: "A hairline between groups. Reach for it only when spacing alone does not separate them — between unrelated toolbar groups, between a form and its alternative.",
      },
    },
  },
  decorators: [(Story) => <Narrow><Story /></Narrow>],
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** A word in the middle separates two ways of doing the same thing. */
export const Label: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button>Upload a file</Button>
      <Divider label="or" />
      <Button variant="outlined">Enter the order manually</Button>
    </div>
  ),
}

/** Between groups in a toolbar. */
export const Vertical: Story = {
  render: () => (
    <Row>
      <Button variant="ghost" size="sm">Undo</Button>
      <Button variant="ghost" size="sm">Redo</Button>
      <Divider orientation="vertical" spacing="sm" />
      <Button variant="ghost" size="sm">Export</Button>
    </Row>
  ),
}
