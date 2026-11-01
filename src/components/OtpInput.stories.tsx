import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Stack } from "../docs/specimen.js"
import { OtpInput } from "./OtpInput.js"

function Demo(props: { initial?: string; error?: string; disabled?: boolean; length?: number }) {
  const [v, setV] = useState(props.initial ?? "")
  return <OtpInput label="Confirmation code" value={v} onChange={setV} error={props.error} disabled={props.disabled} length={props.length} />
}

const meta = {
  id: "components-otpinput",
  title: "Components/Forms/OtpInput",
  component: OtpInput,
  tags: ["new", "!dev"],
  args: { label: "Confirmation code", value: "", onChange: () => {} },
  parameters: { docs: { description: { component: "A one-time code, one box per digit. Typing advances, Backspace returns, and pasting the whole code fills every box. The first box asks the browser for SMS autofill." } } },
} satisfies Meta<typeof OtpInput>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { render: () => <Demo initial="41" /> }

/** Empty, an error and disabled. */
export const States: Story = {
  render: () => (
    <Stack>
      <Demo />
      <Demo initial="417203" error="This code has expired. Request a new one." />
      <Demo initial="417203" disabled />
    </Stack>
  ),
}

/** Four digits for a short PIN. */
export const Short: Story = { render: () => <Demo length={4} initial="12" /> }
