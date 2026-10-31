import type { Meta, StoryObj } from "@storybook/react-vite"
import { Grid, Narrow } from "../docs/specimen.js"
import { Image } from "./Image.js"

/* A placeholder drawn from tokens' palette, so the docs need no stock photo. */
const SVG = (fill: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180"><rect width="320" height="180" fill="${fill}"/><path d="M0 140 L80 90 L140 120 L220 60 L320 110 V180 H0Z" fill="#ffffff" fill-opacity=".35"/><circle cx="250" cy="45" r="16" fill="#ffffff" fill-opacity=".5"/></svg>`)}`

const meta = {
  id: "components-image",
  title: "Components/Content/Image",
  component: Image,
  tags: ["new"],
  args: { src: SVG("#1d4ed8"), alt: "Dock 4 at North warehouse", ratio: "16 / 9", fit: "cover", radius: "md" },
  argTypes: { fit: { control: "inline-radio", options: ["cover", "contain"] }, radius: { control: "inline-radio", options: ["none", "md", "lg"] }, ratio: { control: "inline-radio", options: ["16 / 9", "4 / 3", "1 / 1", "3 / 4"] } },
  parameters: {
    docs: {
      description: {
        component:
          "A content image that keeps its shape while loading, fades in when ready, and shows a calm placeholder if it fails — never a " +
          "broken-image icon. `alt` is required; pass an empty string only for decoration.",
      },
    },
  },
  decorators: [(Story) => <Narrow><Story /></Narrow>],
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** The ratio holds the space before the image arrives, so nothing jumps. */
export const Ratios: Story = {
  render: () => (
    <Grid min={120}>
      {["16 / 9", "4 / 3", "1 / 1"].map((r) => <Image key={r} src={SVG("#15803d")} alt="" ratio={r} caption={r} />)}
    </Grid>
  ),
}

/** A failed image keeps the box and shows a placeholder; the alt text stays available. */
export const Fallback: Story = { args: { src: "/missing-image.jpg", caption: "Dock 4 — the photo could not load" } }
