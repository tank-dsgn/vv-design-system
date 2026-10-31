import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Narrow, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { Combobox } from "./Combobox.js"

const CITIES = ["Antwerp", "Berlin", "Gdańsk", "Hamburg", "Lyon", "Milan", "Rotterdam", "Vilnius"].map((c) => ({ value: c.toLowerCase(), label: c }))

function Demo({ defaultOpen }: { defaultOpen?: boolean }) {
  const [v, setV] = useState<string | null>("hamburg")
  return <Combobox label="Destination" options={CITIES} value={v} onChange={setV} defaultOpen={defaultOpen} placeholder="Type a city" />
}

const meta = {
  id: "components-combobox",
  title: "Components/Forms/Combobox",
  component: Combobox,
  tags: ["new"],
  args: { label: "Destination", options: CITIES, value: "hamburg", onChange: () => {} },
  argTypes: { options: { control: false } },
  decorators: [(Story) => <Narrow><div style={{ minHeight: 320 }}><Story /></div></Narrow>],
  parameters: { docs: { description: { component: "A text field that filters a list as you type, for choosing from more options than a Select can hold. Focus stays in the field; ↑/↓ move, Enter picks, Esc closes." } } },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { render: () => <Demo /> }

/** The list open on the chosen value. */
export const Open: Story = { render: () => <Demo defaultOpen /> }

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked pressed={false} rows={[{ label: "Field", node: <Combobox label="Destination" options={CITIES} value="hamburg" onChange={() => {}} />, disabled: <Combobox label="Destination" options={CITIES} value="hamburg" disabled onChange={() => {}} /> }, { label: "Error", node: <Combobox label="Destination" options={CITIES} value={null} error="Choose a city from the list" onChange={() => {}} /> }]} />
  ),
}
