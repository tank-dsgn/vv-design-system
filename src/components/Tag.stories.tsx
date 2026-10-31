import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Matrix, Narrow, Row, State, pseudoParams } from "../docs/specimen.js"
import { Icon } from "./Icon.js"
import { Input } from "./Input.js"
import { Tag } from "./Tag.js"

const meta = {
  id: "components-tag",
  title: "Components/Forms/Tag",
  component: Tag,
  args: { children: "Fragile" },
  argTypes: { icon: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          "A keyword the user attaches to an object to label, group or filter it — *Fragile*, *Priority*, " +
          "*Cold chain*. Tags can be removed, and can act as a filter when clickable. The remove button is a " +
          "separate control named *Remove &lt;label&gt;*. For a system-assigned status, use Badge.",
      },
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { onRemove: () => {} } }

export const Types: Story = {
  render: () => (
    <Row>
      <Tag>Fragile</Tag>
      <Tag icon={<Icon name="flag" />}>Priority</Tag>
      <Tag onRemove={() => {}}>Cold chain</Tag>
      <Tag onClick={() => {}}>North Line</Tag>
    </Row>
  ),
}

export const States: Story = {
  parameters: {
    pseudo: {
      ...pseudoParams.pseudo,
      // A removable tag has two controls; focus only the remove button.
      focusVisible: ['[data-pseudo="focus"] .vv-tag__main', '[data-pseudo="focus-remove"] .vv-tag__remove'],
    },
  },
  render: () => (
    <Matrix
      colWidth="minmax(110px, auto)"
      columns={["Rest", "Hover", "Focus", "Disabled"]}
      rows={[
        { label: "Clickable", cells: [<Tag onClick={() => {}}>North Line</Tag>, <State is="hover"><Tag onClick={() => {}}>North Line</Tag></State>, <State is="focus"><Tag onClick={() => {}}>North Line</Tag></State>, <Tag onClick={() => {}} disabled>North Line</Tag>] },
        { label: "Removable", cells: [<Tag onRemove={() => {}}>Cold chain</Tag>, <State is="hover"><Tag onRemove={() => {}}>Cold chain</Tag></State>, <span data-pseudo="focus-remove" style={{ display: "contents" }}><Tag onRemove={() => {}}>Cold chain</Tag></span>, <Tag onRemove={() => {}} disabled>Cold chain</Tag>] },
      ]}
    />
  ),
}

/** Tags on a shipment: type to add, remove with the cross or by keyboard. */
export const Editable: Story = {
  render: () => {
    const [tags, setTags] = useState(["Fragile", "Cold chain", "Priority"])
    const [draft, setDraft] = useState("")
    return (
      <Narrow>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Input
            aria-label="Add a tag"
            placeholder="Add a tag and press Enter"
            size="sm"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              const v = draft.trim()
              if (e.key === "Enter" && v && !tags.includes(v)) {
                setTags([...tags, v])
                setDraft("")
              }
            }}
          />
          <Row>{tags.map((t) => <Tag key={t} onRemove={() => setTags(tags.filter((x) => x !== t))}>{t}</Tag>)}</Row>
        </div>
      </Narrow>
    )
  },
}
