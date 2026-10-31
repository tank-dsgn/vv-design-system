import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId } from "react"
import { Line, Narrow, Stack, State, pseudoParams } from "../docs/specimen.js"
import { Select } from "./Select.js"

const meta = {
  id: "components-select",
  title: "Components/Forms/Select",
  component: Select,
  args: { size: "md", defaultValue: "truck" },
  argTypes: { size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] } },
  parameters: {
    docs: {
      description: {
        component:
          "Picks one value from a list of 4–15 known options. Built on the native `<select>`, so keyboard " +
          "navigation, type-ahead and the mobile picker work everywhere. For two or three options, use Radio; " +
          "for actions rather than values, use Menu.",
      },
    },
  },
  decorators: [(Story) => <Narrow><Story /></Narrow>],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const OPTIONS = (
  <>
    <option value="truck">Truck</option>
    <option value="van">Van</option>
    <option value="rail">Rail platform</option>
    <option value="sea">Sea container</option>
  </>
)

export const Playground: Story = {
  render: (args) => <Select aria-label="Vehicle type" {...args}>{OPTIONS}</Select>,
}

export const Sizes: Story = {
  render: () => (
    <Stack gap={16}>
      {(["xs", "sm", "md", "lg"] as const).map((s) => (
        <Line key={s} label={`${s} · ${{ xs: 24, sm: 32, md: 40, lg: 48 }[s]}px`}>
          <Select aria-label={`Vehicle type, ${s}`} size={s} defaultValue="truck">{OPTIONS}</Select>
        </Line>
      ))}
    </Stack>
  ),
}

export const States: Story = {
  parameters: pseudoParams,
  render: () => (
    <Stack gap={16}>
      <Line label="Rest"><Select aria-label="Rest" defaultValue="truck">{OPTIONS}</Select></Line>
      <Line label="Hover"><State is="hover"><Select aria-label="Hover" defaultValue="truck">{OPTIONS}</Select></State></Line>
      <Line label="Focus"><State is="focus"><Select aria-label="Focus" defaultValue="truck">{OPTIONS}</Select></State></Line>
      <Line label="Invalid"><Select aria-label="Invalid" invalid defaultValue=""><option value="">Choose a vehicle</option>{OPTIONS}</Select></Line>
      <Line label="Disabled"><Select aria-label="Disabled" disabled defaultValue="truck">{OPTIONS}</Select></Line>
    </Stack>
  ),
}

/** With a visible label — the usual form layout. */
export const WithLabel: Story = {
  render: () => {
    const id = useId()
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label htmlFor={id} style={{ fontSize: "var(--font-size-sm)", fontWeight: "var(--font-weight-medium)" }}>Vehicle type</label>
        <Select id={id} defaultValue="van">{OPTIONS}</Select>
      </div>
    )
  },
}
