import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { ChoiceList, type Choice } from "./ChoiceList.js"

const DELIVERY: Choice[] = [
  { value: "overnight", label: "Overnight" },
  { value: "standard", label: "Standard (3–5 business days)" },
  { value: "free", label: "Free (7–10 business days)" },
]

const meta = {
  id: "components-choicelist",
  title: "Components/Forms/ChoiceList",
  component: ChoiceList,
  tags: ["new", "!dev"],
  args: { title: "Delivery", choices: DELIVERY, selected: ["standard"], onChange: () => {}, allowMultiple: false, titleHidden: false },
  argTypes: { choices: { control: false }, selected: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "Groups related choices under one question — radios when the answer is one option, checkboxes when it can be several. " +
          "The group is a `fieldset` whose title is read before each option. Use it instead of loose checkboxes whenever the options answer the same question.",
      },
    },
  },
} satisfies Meta<typeof ChoiceList>

export default meta
type Story = StoryObj<typeof meta>

function Live(props: Partial<React.ComponentProps<typeof ChoiceList>>) {
  const [sel, setSel] = useState<string[]>(props.selected ?? [])
  return <ChoiceList title="Delivery" choices={DELIVERY} {...props} selected={sel} onChange={setSel} />
}

export const Playground: Story = { render: (args) => <Live {...args} /> }

/** Changes the options into checkboxes, so several can be chosen. */
export const AllowMultiple: Story = {
  name: "Allow multiple",
  render: () => <Live title="Notify by" allowMultiple selected={["email"]} choices={[{ value: "email", label: "Email" }, { value: "sms", label: "SMS" }, { value: "push", label: "Push notification" }]} />,
}

/** Hides the title when the surrounding layout already asks the question. It is still read by screen readers. */
export const HiddenTitle: Story = { name: "Title", render: () => <Live titleHidden selected={["standard"]} /> }

/** A line of help under an option explains its consequence. */
export const Descriptions: Story = {
  render: () => (
    <Live
      title="When the driver arrives"
      selected={["call"]}
      choices={[
        { value: "call", label: "Call the receiver", description: "The driver phones the contact on the order before unloading." },
        { value: "leave", label: "Leave at the gate", description: "Only for pallets; the receiver signs the delivery note later." },
        { value: "return", label: "Return to the warehouse", description: "A second delivery is charged at the standard rate.", disabled: true },
      ]}
    />
  ),
}

/** The error is shown under the list and announced; the group is marked invalid. */
export const WithError: Story = { name: "Error", render: () => <Live allowMultiple title="Documents to attach" selected={[]} choices={[{ value: "cmr", label: "CMR consignment note" }, { value: "invoice", label: "Commercial invoice" }, { value: "packing", label: "Packing list" }]} error="Choose at least one document" /> }
