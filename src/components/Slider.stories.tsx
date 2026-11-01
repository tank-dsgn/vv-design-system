import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Narrow, Stack, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { Slider } from "./Slider.js"

const meta = {
  id: "components-slider",
  title: "Components/Forms/Slider",
  component: Slider,
  tags: ["new", "!dev"],
  args: { label: "Search radius", value: 25, onChange: () => {}, min: 5, max: 100, step: 5, showValue: true },
  parameters: {
    docs: {
      description: {
        component:
          "Picks a value from a range when the position matters more than the exact number — a search radius, a threshold. " +
          "Built on the native range input, so keyboard and touch work everywhere. When the exact number matters, use NumberInput.",
      },
    },
  },
  decorators: [(Story) => <Narrow><Story /></Narrow>],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const [v, setV] = useState(args.value)
    return <Slider {...args} value={v} onChange={setV} format={(n) => `${n} km`} />
  },
}

/** `format` adds the unit to the value, the range ends and what a screen reader hears. */
export const Format: Story = {
  render: () => {
    const [v, setV] = useState(70)
    return <Slider label="Delay alert threshold" value={v} onChange={setV} min={0} max={100} step={10} format={(n) => `${n}%`} />
  },
}

export const Disabled: Story = { render: () => <Stack><Slider label="Search radius" value={40} onChange={() => {}} disabled format={(n) => `${n} km`} /></Stack> }

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked rows={[{ label: "Thumb", node: <Slider label="Search radius" min={0} max={100} value={40} onChange={() => {}} />, disabled: <Slider label="Search radius" min={0} max={100} value={40} disabled onChange={() => {}} /> }]} />
  ),
}
