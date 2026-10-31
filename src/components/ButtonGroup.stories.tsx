import type { Meta, StoryObj } from "@storybook/react-vite"
import { Stack, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { Button } from "./Button.js"
import { ButtonGroup } from "./ButtonGroup.js"
import { Icon } from "./Icon.js"
import { IconButton } from "./IconButton.js"

const meta = {
  id: "components-buttongroup",
  title: "Components/Actions/ButtonGroup",
  component: ButtonGroup,
  tags: ["new"],
  args: {
    label: "Document actions",
    children: (
      <>
        <Button variant="outlined">Save</Button>
        <Button variant="outlined">Export</Button>
        <Button variant="outlined">Share</Button>
      </>
    ),
  },
  argTypes: { children: { control: false } },
  parameters: { docs: { description: { component: "Joins two to four related actions into one control. Each stays a separate button in the tab order; the group is named for screen readers." } } },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** One variant in a group: a mix of fills reads as several unrelated controls. */
export const Variants: Story = {
  render: () => (
    <Stack>
      <div><ButtonGroup label="Outlined"><Button variant="outlined">Day</Button><Button variant="outlined">Week</Button><Button variant="outlined">Month</Button></ButtonGroup></div>
      <div><ButtonGroup label="Secondary"><Button variant="secondary">Back</Button><Button variant="secondary">Next</Button></ButtonGroup></div>
    </Stack>
  ),
}

/** Icon buttons for a tight toolbar. */
export const WithIconButtons: Story = {
  name: "Icon buttons",
  render: () => (
    <ButtonGroup label="Zoom">
      <IconButton variant="outlined" label="Zoom out" icon={<Icon name="zoom-out" />} />
      <IconButton variant="outlined" label="Fit to screen" icon={<Icon name="fit" />} />
      <IconButton variant="outlined" label="Zoom in" icon={<Icon name="zoom-in" />} />
    </ButtonGroup>
  ),
}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix colWidth="minmax(150px, auto)" rows={[{ label: "Outlined", node: <ButtonGroup label="View"><Button variant="outlined">Day</Button><Button variant="outlined">Week</Button></ButtonGroup>, disabled: <ButtonGroup label="View"><Button variant="outlined" disabled>Day</Button><Button variant="outlined" disabled>Week</Button></ButtonGroup> }]} />
  ),
}
