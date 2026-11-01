import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { ThemeSwitcher, type Theme } from "./ThemeSwitcher.js"

function Demo() {
  const [v, setV] = useState<Theme>("system")
  return <ThemeSwitcher value={v} onChange={setV} />
}

const meta = {
  id: "components-themeswitcher",
  title: "Components/Forms/ThemeSwitcher",
  component: ThemeSwitcher,
  tags: ["new", "!dev"],
  args: { value: "system", onChange: () => {} },
  argTypes: { value: { control: "inline-radio", options: ["light", "dark", "system"] }, size: { control: "inline-radio", options: ["sm", "md"] } },
  parameters: { docs: { description: { component: "Picks the interface theme for settings pages. Three options, because following the system is a choice of its own. It reports the choice; putting `.dark` on `<html>` is the app's job." } } },
} satisfies Meta<typeof ThemeSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { render: () => <Demo /> }
