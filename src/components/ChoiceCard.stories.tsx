import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Narrow, Stack, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { ChoiceCard } from "./ChoiceCard.js"

const meta = {
  id: "components-choicecard",
  title: "Components/Forms/ChoiceCard",
  component: ChoiceCard,
  tags: ["new", "!dev"],
  args: { name: "demo", value: "road", title: "Road freight", description: "Door to door, 2 to 3 working days.", meta: "€420", checked: true, onChange: () => {} },
  argTypes: { meta: { control: false }, type: { control: "inline-radio", options: ["radio", "checkbox"] } },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "A radio or checkbox with room to explain itself, for a decision that needs a sentence or a price per option. Built on a native input; the whole card is the label." } } },
} satisfies Meta<typeof ChoiceCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

function Group() {
  const [v, setV] = useState("road")
  const on = (e: React.ChangeEvent<HTMLInputElement>) => setV(e.target.value)
  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <legend style={{ marginBottom: 12, fontSize: "var(--font-size-sm)", fontWeight: "var(--font-weight-medium)" }}>Delivery method</legend>
      <Stack gap={8}>
        <ChoiceCard name="method" value="road" title="Road freight" description="Door to door, 2 to 3 working days." meta="€420" checked={v === "road"} onChange={on} />
        <ChoiceCard name="method" value="rail" title="Rail freight" description="Terminal to terminal, 5 working days." meta="€310" checked={v === "rail"} onChange={on} />
        <ChoiceCard name="method" value="air" title="Air freight" description="Not available for this weight." meta="€1,180" disabled checked={false} onChange={on} />
      </Stack>
    </fieldset>
  )
}

/** Wrap the cards in a fieldset: its legend is the question. */
export const Group_: Story = { name: "In a group", render: () => <Group /> }

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked pressed={false} rows={[{ label: "Not chosen", node: <ChoiceCard name="a" value="rail" title="Rail freight" description="Terminal to terminal." meta="€310" checked={false} onChange={() => {}} />, disabled: <ChoiceCard name="a" value="air" title="Air freight" description="Not available." meta="€1,180" disabled checked={false} onChange={() => {}} /> }, { label: "Chosen", node: <ChoiceCard name="b" value="road" title="Road freight" description="Door to door." meta="€420" checked onChange={() => {}} />, disabled: <ChoiceCard name="b" value="road" title="Road freight" description="Booked already." meta="€420" disabled checked onChange={() => {}} /> }]} />
  ),
}
