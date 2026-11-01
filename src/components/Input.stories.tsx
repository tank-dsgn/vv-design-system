import type { Meta, StoryObj } from "@storybook/react-vite"
import { Line, Narrow, Section, Stack, State, pseudoParams } from "../docs/specimen.js"
import { Icon } from "./Icon.js"
import { Field, Input, type InputSize } from "./Input.js"

const meta = {
  id: "components-input",
  title: "Components/Forms/Input",
  tags: ["!dev"],
  component: Input,
  args: { placeholder: "ORD-0000", size: "md" },
  argTypes: {
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
    iconLeading: { control: false },
    prefix: { control: "text" },
    suffix: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A single-line text field. Use **Field** to give it a visible label, a hint and an error message — " +
          "a bare Input is for places where the label is already on screen, such as a search bar or a table filter. " +
          "Errors are announced to screen readers and linked to the field.",
      },
    },
  },
  decorators: [(Story) => <Narrow><Story /></Narrow>],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

const SIZES: InputSize[] = ["xs", "sm", "md", "lg"]

export const Playground: Story = {}

/** The same four heights as Button and Select. */
export const Sizes: Story = {
  render: (args) => (
    <Stack gap={16}>
      {SIZES.map((s) => (
        <Line key={s} label={`${s} · ${{ xs: 24, sm: 32, md: 40, lg: 48 }[s]}px`}>
          <Input {...args} size={s} />
        </Line>
      ))}
    </Stack>
  ),
}

export const States: Story = {
  parameters: pseudoParams,
  render: (args) => (
    <Stack gap={16}>
      <Line label="Placeholder"><Input {...args} /></Line>
      <Line label="Filled"><Input {...args} defaultValue="ORD-4417" /></Line>
      <Line label="Hover"><State is="hover"><Input {...args} defaultValue="ORD-4417" /></State></Line>
      <Line label="Focus"><State is="focus"><Input {...args} defaultValue="ORD-4417" /></State></Line>
      <Line label="Invalid"><Input {...args} defaultValue="ORD-44" invalid /></Line>
      <Line label="Disabled"><Input {...args} defaultValue="ORD-4417" disabled /></Line>
      <Line label="Read-only"><Input {...args} defaultValue="ORD-4417" readOnly /></Line>
    </Stack>
  ),
}

/** A leading icon names the field's purpose; prefix and suffix carry a unit or a code. */
export const Affixes: Story = {
  render: (args) => (
    <Stack gap={16}>
      <Line label="Icon"><Input {...args} iconLeading={<Icon name="search" size={16} />} placeholder="Search shipments" /></Line>
      <Line label="Prefix"><Input {...args} prefix="+44" placeholder="20 7946 0000" /></Line>
      <Line label="Suffix"><Input {...args} suffix="kg" defaultValue="1,240" /></Line>
    </Stack>
  ),
}

/** Field adds a label, a hint and an error. Use it for every form input. */
export const WithField: Story = {
  render: () => (
    <Stack>
      <Field label="Order number" placeholder="ORD-0000" hint="ORD followed by four digits" />
      <Field label="Order number" defaultValue="ORD-44" error="Add the last two digits" />
      <Field label="Order number" defaultValue="ORD-4417" disabled />
    </Stack>
  ),
}

/** Long values scroll inside the field; long labels wrap above it. */
export const LongContent: Story = {
  render: () => (
    <Section title="Long label and value">
      <Field
        label="Delivery instructions for the driver and the warehouse team"
        defaultValue="Use the service entrance on Dock Road, gate 4, and call ahead"
        hint="Shown to the driver in the app"
      />
    </Section>
  ),
}
