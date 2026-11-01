import type { Meta, StoryObj } from "@storybook/react-vite"
import { Grid, Narrow } from "../docs/specimen.js"
import { AspectRatio } from "./AspectRatio.js"

const Fill = ({ text }: { text: string }) => (
  <div style={{ display: "grid", placeItems: "center", color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>{text}</div>
)

const meta = {
  id: "components-aspectratio",
  title: "Components/Content/AspectRatio",
  component: AspectRatio,
  tags: ["new", "!dev"],
  args: { ratio: 16 / 9, children: <Fill text="16 : 9" /> },
  argTypes: { children: { control: false } },
  decorators: [(Story) => <Narrow><Story /></Narrow>],
  parameters: { docs: { description: { component: "Keeps a box at a fixed shape, so a video, map or image does not push the page around while it loads." } } },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** The ratios used across the system. */
export const Ratios: Story = {
  render: () => (
    <Grid min={140}>
      <AspectRatio ratio={1}><Fill text="1 : 1" /></AspectRatio>
      <AspectRatio ratio={4 / 3}><Fill text="4 : 3" /></AspectRatio>
      <AspectRatio ratio={16 / 9}><Fill text="16 : 9" /></AspectRatio>
    </Grid>
  ),
}
