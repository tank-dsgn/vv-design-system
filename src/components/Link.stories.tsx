import type { Meta, StoryObj } from "@storybook/react-vite"
import { Line, Stack, State, pseudoParams } from "../docs/specimen.js"
import { Link } from "./Link.js"

const meta = {
  id: "components-link",
  title: "Components/Actions/Link",
  component: Link,
  args: { href: "#", children: "Cancellation policy" },
  parameters: {
    docs: {
      description: {
        component:
          "Navigates to another page or resource. Use a Link to *go somewhere* and a Button to *do something*. " +
          "Links stay underlined: colour alone is not a reliable cue. External links opened in a new tab get " +
          "`rel=\"noopener noreferrer\"` automatically.",
      },
    },
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = {
  parameters: pseudoParams,
  render: (args) => (
    <Stack gap={16}>
      <Line label="Rest"><Link {...args} /></Line>
      <Line label="Hover"><State is="hover"><Link {...args} /></State></Line>
      <Line label="Pressed"><State is="active"><Link {...args} /></State></Line>
      <Line label="Focus"><State is="focus"><Link {...args} /></State></Line>
    </Stack>
  ),
}

/** Inline in running text — the most common place for a link. */
export const InText: Story = {
  render: () => (
    <p style={{ maxWidth: 480, margin: 0 }}>
      The carrier receives the job immediately. Read the <Link href="#">cancellation policy</Link> to see what a
      dispatcher can still change after booking.
    </p>
  ),
}

export const NewTab: Story = {
  args: { href: "https://example.com", target: "_blank", children: "Carrier terms (opens in a new tab)" },
}
