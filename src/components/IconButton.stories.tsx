import type { Meta, StoryObj } from "@storybook/react-vite"
import { Line, Matrix, Row, Stack, State, pseudoParams, Reasons } from "../docs/specimen.js"
import { Button } from "./Button.js"
import { Icon } from "./Icon.js"
import { IconButton, type IconButtonVariant } from "./IconButton.js"

const meta = {
  id: "components-iconbutton",
  title: "Components/Actions/IconButton",
  tags: ["!dev"],
  component: IconButton,
  args: { icon: <Icon name="edit" />, label: "Edit shipment", variant: "outlined", size: "sm" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "destructive", "outlined", "ghost"] },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
    icon: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A button whose only content is an icon — for toolbars, table rows and dense headers where the action is " +
          "universally understood. `label` is required: it becomes the accessible name and the tooltip. " +
          "If the action needs explaining, use a Button with text instead.",
      },
    },
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

const VARIANTS: IconButtonVariant[] = ["primary", "secondary", "destructive", "outlined", "ghost"]

export const Playground: Story = {}

export const Variants: Story = {
  parameters: { docs: { wide: true } },
  render: (args) => (
    <>
    <Row>
      <IconButton {...args} variant="primary" icon={<Icon name="plus" />} label="Add stop" />
      <IconButton {...args} variant="secondary" icon={<Icon name="copy" />} label="Duplicate" />
      <IconButton {...args} variant="destructive" icon={<Icon name="delete" />} label="Delete" />
      <IconButton {...args} variant="outlined" icon={<Icon name="edit" />} label="Edit" />
      <IconButton {...args} variant="ghost" icon={<Icon name="close" />} label="Close" />
    </Row>
    <Reasons rows={[
      ["ghost", "Toolbars and table rows, the usual case", "Icons are already visually busy; a box around each one doubles the noise."],
      ["outlined", "A lone action that must be findable", "The border shows it's a button when nothing nearby does."],
      ["primary, secondary, destructive", "Rare, for the one main action on a compact bar", "An icon alone is harder to read than a word, so a filled one is only safe when its meaning is obvious, like + on a list."],
    ]} />
    </>
  ),
}

/** Square, at the same four heights as Button, so the two line up in a row. */
export const Sizes: Story = {
  render: (args) => (
    <Stack>
      {(["xs", "sm", "md", "lg"] as const).map((s) => (
        <Line key={s} label={`${s} · ${{ xs: 24, sm: 32, md: 40, lg: 48 }[s]}px`}>
          <Button size={s} variant="outlined">Export</Button>
          <IconButton {...args} size={s} />
        </Line>
      ))}
    </Stack>
  ),
}

export const States: Story = {
  parameters: pseudoParams,
  render: (args) => (
    <Matrix
      columns={["Rest", "Hover", "Pressed", "Focus", "Disabled", "Loading"]}
      rows={VARIANTS.map((v) => ({
        label: v,
        cells: [
          <IconButton {...args} variant={v} />,
          <State is="hover"><IconButton {...args} variant={v} /></State>,
          <State is="active"><IconButton {...args} variant={v} /></State>,
          <State is="focus"><IconButton {...args} variant={v} /></State>,
          <IconButton {...args} variant={v} disabled />,
          <IconButton {...args} variant={v} loading />,
        ],
      }))}
    />
  ),
}

/** A toolbar: ghost icon buttons for frequent actions, one outlined overflow. */
export const Toolbar: Story = {
  render: (args) => (
    <Row>
      <IconButton {...args} variant="ghost" icon={<Icon name="undo" />} label="Undo" />
      <IconButton {...args} variant="ghost" icon={<Icon name="redo" />} label="Redo" />
      <IconButton {...args} variant="ghost" icon={<Icon name="copy" />} label="Copy" />
      <IconButton {...args} variant="ghost" icon={<Icon name="share" />} label="Share" />
      <IconButton {...args} variant="outlined" icon={<Icon name="menu" />} label="More actions" />
    </Row>
  ),
}
