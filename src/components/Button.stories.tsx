import type { Meta, StoryObj } from "@storybook/react-vite"
import { Line, Matrix, Narrow, Row, Section, Stack, State, pseudoParams, Reasons } from "../docs/specimen.js"
import { Button, type ButtonSize, type ButtonVariant } from "./Button.js"
import { Icon } from "./Icon.js"

const meta = {
  id: "components-button",
  title: "Components/Actions/Button",
  component: Button,
  args: { children: "Book shipment", variant: "primary", size: "sm" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "destructive", "outlined", "ghost", "link"] },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
    iconLeading: { control: false },
    iconTrailing: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Triggers an action. One **primary** button per view marks the main way forward; " +
          "**secondary** and **outlined** sit beside it; **ghost** and **link** are for low-emphasis actions in dense UI; " +
          "**destructive** is reserved for actions that delete or cannot be undone. " +
          "Label with a verb and an object — *Book shipment*, not *OK*.",
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "destructive", "outlined", "ghost", "link"]
const SIZES: ButtonSize[] = ["xs", "sm", "md", "lg"]
const LABEL: Record<ButtonVariant, string> = {
  primary: "Book shipment",
  secondary: "Save draft",
  destructive: "Delete",
  outlined: "Export",
  ghost: "Cancel",
  link: "View details",
}

export const Playground: Story = {}

/** Six variants, ordered by emphasis. */
export const Variants: Story = {
  parameters: { docs: { wide: true } },
  render: (args) => (
    <>
      <Row>
        {VARIANTS.map((v) => <Button key={v} {...args} variant={v}>{LABEL[v]}</Button>)}
      </Row>
      <Reasons rows={[
        ["primary", "The one action the view exists for", "The only saturated fill on a neutral screen, so the eye finds it first. Two on a screen cancel each other out."],
        ["secondary", "A real alternative that shares the weight of a task", "A filled block stays solid in a dense toolbar, but its grey never competes with the accent."],
        ["destructive", "The final step of deleting or cancelling", "Solid red, not tinted: it mostly appears inside a confirmation, after the person has chosen to delete, where the warning should be unmistakable. It never sits on a screen as an everyday action; those go in a Menu."],
        ["outlined", "Actions beside a primary: Export, Cancel", "The border gives a clear target with almost no visual weight, so several can sit together without noise."],
        ["ghost", "Frequent actions in tight rows and toolbars", "No resting surface, so twenty table rows don't become twenty boxes. The fill arrives on hover."],
        ["link", "Going somewhere, inline or at low emphasis", "Underlined because it navigates. If it changes data, it should be a button."],
      ]} />
    </>
  ),
}

/** Four heights shared with inputs and selects: 24, 32, 40 and 48px. `sm` is the default for product UI. */
export const Sizes: Story = {
  parameters: { docs: { wide: true } },
  render: (args) => (
    <Stack>
      {SIZES.map((s) => (
        <Line key={s} label={`${s} · ${{ xs: 24, sm: 32, md: 40, lg: 48 }[s]}px`}>
          <Button {...args} size={s}>Book shipment</Button>
          <Button {...args} size={s} variant="outlined" iconLeading={<Icon name="download" size={16} />}>Export</Button>
        </Line>
      ))}
      <Reasons label="Size" rows={[
        ["xs · 24", "Inside table rows and badges", "Row height stays compact; the row itself is the larger target."],
        ["sm · 32", "Product UI, the default", "Dense screens are the norm here, and 32 still clears the 24px minimum target."],
        ["md · 40", "Forms", "Matches the default field height, so buttons line up with inputs."],
        ["lg · 48", "Touch-first screens", "Comfortable under a thumb. On a desktop screen it shouts."],
      ]} />
    </Stack>
  ),
}

/** Every variant in every interactive state. Disabled and loading cancel hover and pressed. */
export const States: Story = {
  parameters: pseudoParams,
  render: (args) => (
    <Matrix
      columns={["Rest", "Hover", "Pressed", "Focus", "Disabled", "Loading"]}
      rows={VARIANTS.map((v) => ({
        label: v,
        cells: [
          <Button {...args} variant={v}>{LABEL[v]}</Button>,
          <State is="hover"><Button {...args} variant={v}>{LABEL[v]}</Button></State>,
          <State is="active"><Button {...args} variant={v}>{LABEL[v]}</Button></State>,
          <State is="focus"><Button {...args} variant={v}>{LABEL[v]}</Button></State>,
          <Button {...args} variant={v} disabled>{LABEL[v]}</Button>,
          <Button {...args} variant={v} loading>{LABEL[v]}</Button>,
        ],
      }))}
    />
  ),
}

/** Icons go before the label for an object (*New shipment*), after it for a direction (*Next*). */
export const WithIcons: Story = {
  render: (args) => (
    <Row>
      <Button {...args} iconLeading={<Icon name="plus" size={16} />}>New shipment</Button>
      <Button {...args} variant="secondary" iconLeading={<Icon name="copy" size={16} />}>Duplicate</Button>
      <Button {...args} variant="outlined" iconTrailing={<Icon name="chevron-down" size={16} />}>Actions</Button>
      <Button {...args} variant="destructive" iconLeading={<Icon name="delete" size={16} />}>Delete</Button>
    </Row>
  ),
}

/** How buttons combine. The primary action is last in a row and alone in its emphasis. */
export const Usage: Story = {
  render: () => (
    <Stack>
      <Section title="Form footer" note="One primary. The secondary choice is outlined or ghost, never a second primary.">
        <Row><Button variant="ghost">Cancel</Button><Button variant="outlined">Save draft</Button><Button>Book shipment</Button></Row>
      </Section>
      <Section title="Destructive confirmation" note="The destructive action names what it destroys; the safe one is a plain way out.">
        <Row><Button variant="outlined">Keep shipment</Button><Button variant="destructive">Delete shipment</Button></Row>
      </Section>
      <Section title="Long label" note="Labels do not wrap. Keep them short; the button grows to fit.">
        <Narrow><Button>Submit for technical review</Button></Narrow>
      </Section>
    </Stack>
  ),
}
