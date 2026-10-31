import type { Meta, StoryObj } from "@storybook/react-vite"
import { NavigationMenu, type NavigationEntry } from "./NavigationMenu.js"
import { StateMatrix, pseudoParams } from "../docs/specimen.js"

const ENTRIES: NavigationEntry[] = [
  { label: "Overview", href: "#overview", current: true },
  { label: "Services", links: [{ label: "Road freight", href: "#road", description: "Door to door across Europe" }, { label: "Rail freight", href: "#rail", description: "Terminal to terminal, lower cost" }] },
  { label: "Pricing", href: "#pricing" },
]

const meta = {
  id: "components-navigationmenu",
  title: "Components/Navigation/NavigationMenu",
  component: NavigationMenu,
  tags: ["new"],
  args: { label: "Main", entries: ENTRIES },
  argTypes: { entries: { control: false } },
  decorators: [(Story) => <div style={{ minHeight: 200 }}><Story /></div>],
  parameters: { docs: { description: { component: "Site navigation with panels of links, for a marketing site or a docs site with more pages than fit in a row. Panels hold links only, and open on click, not hover." } } },
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked pressed={false} rows={[{ label: "Entries", node: <NavigationMenu label="Main" entries={ENTRIES} /> }]} />
  ),
}
