import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Narrow, Stack } from "../docs/specimen.js"
import { ChecklistItem } from "./ChecklistItem.js"
import { Link } from "./Link.js"

const meta = {
  id: "components-checklistitem",
  title: "Components/Content/ChecklistItem",
  component: ChecklistItem,
  tags: ["new"],
  args: { label: "Upload the customs declaration", description: "A PDF under 5 MB, signed by the shipper.", checked: false, onChange: () => {} },
  decorators: [(Story) => <Narrow width="medium"><Story /></Narrow>],
  parameters: { docs: { description: { component: "One task on a list people work through: onboarding, a pre-departure check. It is a real checkbox, with room for what the task involves and a way to do it." } } },
} satisfies Meta<typeof ChecklistItem>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

function List() {
  const [done, setDone] = useState({ carrier: true, weight: false, docs: false })
  return (
    <div>
      <ChecklistItem label="Choose a carrier" checked={done.carrier} onChange={(v) => setDone({ ...done, carrier: v })} />
      <ChecklistItem label="Confirm the weight" description="The carrier invoices on what is entered here." checked={done.weight} onChange={(v) => setDone({ ...done, weight: v })} />
      <ChecklistItem label="Attach the documents" checked={done.docs} onChange={(v) => setDone({ ...done, docs: v })} action={<Link href="#documents">Open documents</Link>} />
    </div>
  )
}

/** The action disappears once the task is done. */
export const AList: Story = { name: "A list", render: () => <List /> }

/** Every interactive state. */
export const States: Story = {
  render: () => (
    <Stack gap={0}><ChecklistItem label="To do" checked={false} onChange={() => {}} description="Not started." /><ChecklistItem label="Done" checked onChange={() => {}} description="The action link goes away." /><ChecklistItem label="Blocked" disabled checked={false} onChange={() => {}} description="Waiting for the carrier." /></Stack>
  ),
}
