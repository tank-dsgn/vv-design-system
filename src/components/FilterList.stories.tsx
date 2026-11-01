import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { FilterList } from "./FilterList.js"
import { Icon } from "./Icon.js"
import { StateMatrix, pseudoParams } from "../docs/specimen.js"

const meta: Meta = { id: "components-filterlist",
  title: "Components/Forms/FilterList",
  tags: ["!dev"],
  parameters: { docs: { description: { component: "Collapsible filter sections for a side panel. Filters are toggle buttons (`aria-pressed`), counts show what each one holds, and an empty filter is disabled rather than hidden so the category is still known to exist." } } } }
export default meta
type Story = StoryObj

/** Filters are buttons with `aria-pressed`: choosing one changes this page, it
 *  does not navigate. A zero count disables the item rather than hiding it, so
 *  the category is still known to exist. */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("all")
    return (
      <div style={{ width: 260 }}>
        <FilterList
          title="Facilities"
          value={value}
          onChange={setValue}
          chevronOpen={<Icon name="chevron-up" />}
          chevronClosed={<Icon name="chevron-down" />}
          sections={[
            {
              id: "facilities",
              label: "Facilities",
              icon: <Icon name="store" />,
              defaultOpen: true,
              items: [
                { id: "all", label: "All", count: 870 },
                { id: "inspection", label: "Inspection", count: 600 },
                { id: "engineering", label: "Engineering", count: 270 },
                { id: "construction", label: "Construction", count: 0 },
              ],
            },
            {
              id: "areas",
              label: "Site areas",
              icon: <Icon name="location" />,
              items: [
                { id: "north", label: "North yard", count: 120 },
                { id: "tanks", label: "Tank farm", count: 170 },
              ],
            },
          ]}
        />
      </div>
    )
  },
}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked rows={[{ label: "Filters", node: <div style={{ width: 260 }}><FilterList title="Facilities" value="all" onChange={() => {}} chevronOpen={<Icon name="chevron-up" />} chevronClosed={<Icon name="chevron-down" />} sections={[{ id: "s", label: "Sites", defaultOpen: true, items: [{ id: "all", label: "All sites", count: 4 }, { id: "tank", label: "Tank farm", count: 2 }, { id: "yard", label: "Yard", count: 0 }] }]} /></div> }]} />
  ),
}
