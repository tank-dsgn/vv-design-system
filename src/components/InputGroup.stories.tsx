import type { Meta, StoryObj } from "@storybook/react-vite"
import { Narrow, Stack } from "../docs/specimen.js"
import { Button } from "./Button.js"
import { Input } from "./Input.js"
import { InputGroup } from "./InputGroup.js"
import { Select } from "./Select.js"

const meta = {
  id: "components-inputgroup",
  title: "Components/Forms/InputGroup",
  component: InputGroup,
  tags: ["new", "!dev"],
  args: {
    label: "Promo code",
    children: (
      <>
        <Input aria-label="Promo code" placeholder="SPRING26" />
        <Button variant="outlined">Apply code</Button>
      </>
    ),
  },
  argTypes: { children: { control: false } },
  decorators: [(Story) => <Narrow><Story /></Narrow>],
  parameters: { docs: { description: { component: "Joins an Input with a Select or a Button when together they give one answer: an amount and its currency, a code and its Apply. Each control keeps its own name and tab stop." } } },
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** A value and its unit. */
export const WithSelect: Story = {
  name: "With select",
  render: () => (
    <Stack>
      <InputGroup label="Weight">
        <Input aria-label="Weight" defaultValue="1,240" />
        <Select aria-label="Unit" defaultValue="kg"><option value="kg">kg</option><option value="lb">lb</option><option value="t">t</option></Select>
      </InputGroup>
    </Stack>
  ),
}
