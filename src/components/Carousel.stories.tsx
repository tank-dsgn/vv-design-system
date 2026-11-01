import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { AspectRatio } from "./AspectRatio.js"
import { Carousel } from "./Carousel.js"

const Slide = ({ text }: { text: string }) => (
  <AspectRatio><div style={{ display: "grid", placeItems: "center", fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)" }}>{text}</div></AspectRatio>
)

const meta = {
  id: "components-carousel",
  title: "Components/Content/Carousel",
  component: Carousel,
  tags: ["new", "!dev"],
  args: { label: "Dock photos", slides: [<Slide text="Dock 1" />, <Slide text="Dock 2" />, <Slide text="Dock 3" />] },
  argTypes: { slides: { control: false } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "A row of slides for peer items where seeing one at a time is enough: photos of a dock, steps of a guide. It never moves on its own; arrows and swipe move it, and the count is announced." } } },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked pressed={false} rows={[{ label: "Slides", node: <Carousel label="Dock photos" slides={[<AspectRatio ratio={4}><Slide text="Dock 1" /></AspectRatio>, <AspectRatio ratio={4}><Slide text="Dock 2" /></AspectRatio>]} /> }]} />
  ),
}
