import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Badge, type BadgeTone } from "./Badge.js"
import { Table, type Column } from "./Table.js"
import { StateMatrix, pseudoParams } from "../docs/specimen.js"

const meta: Meta = {
  id: "components-table",
  title: "Components/Data/Table",
  tags: ["!dev"],
  component: Table,
  parameters: {
    docs: {
      description: {
        component:
          "Lists objects that share attributes so they can be compared, sorted and acted on in bulk. Columns are " +
          "sortable when they define `sortValue`; sorting updates `aria-sort` for screen readers. Rows can be " +
          "selected for bulk actions and expanded for detail. Always pass `empty` so a filtered-out table explains itself.",
      },
    },
  },
}
export default meta
type Story = StoryObj

type Status = "Booked" | "In transit" | "Delivered" | "Delayed"
type Row = { id: string; destination: string; carrier: string; weight: number; status: Status }

const TONE: Record<Status, BadgeTone> = { Booked: "neutral", "In transit": "info", Delivered: "success", Delayed: "attention" }

const ROWS: Row[] = [
  { id: "ORD-4417", destination: "North warehouse", carrier: "North Line", weight: 1240, status: "In transit" },
  { id: "ORD-4416", destination: "Port terminal", carrier: "Bay Freight", weight: 18400, status: "Delivered" },
  { id: "ORD-4414", destination: "Retail hub", carrier: "North Line", weight: 860, status: "Delayed" },
  { id: "ORD-4412", destination: "Airport cargo", carrier: "Skyway", weight: 320, status: "Booked" },
  { id: "ORD-4409", destination: "North warehouse", carrier: "Bay Freight", weight: 5120, status: "Delivered" },
]

const COLUMNS: Column<Row>[] = [
  { key: "id", header: "Order", cell: (r) => <span style={{ fontWeight: "var(--font-weight-medium)" }}>{r.id}</span>, sortValue: (r) => r.id },
  { key: "destination", header: "Destination", cell: (r) => r.destination, sortValue: (r) => r.destination },
  { key: "carrier", header: "Carrier", cell: (r) => r.carrier, sortValue: (r) => r.carrier },
  { key: "weight", header: "Weight, kg", align: "end", cell: (r) => r.weight.toLocaleString("en-US"), sortValue: (r) => r.weight },
  { key: "status", header: "Status", cell: (r) => <Badge tone={TONE[r.status]} dot>{r.status}</Badge> },
]

/** Click a column header to sort; click again to reverse. */
export const Sortable: Story = {
  render: () => <Table caption="Shipments" columns={COLUMNS} rows={ROWS} rowKey={(r) => r.id} />,
}

/** Select some rows: the header checkbox becomes indeterminate. */
export const Selectable: Story = {
  render: () => {
    const [picked, setPicked] = useState<string[]>(["ORD-4414"])
    return <Table caption="Shipments" columns={COLUMNS} rows={ROWS} rowKey={(r) => r.id} selected={picked} onSelect={setPicked} />
  },
}

export const Expandable: Story = {
  render: () => (
    <Table
      caption="Shipments"
      columns={COLUMNS}
      rows={ROWS}
      rowKey={(r) => r.id}
      renderExpanded={(r) => (
        <div style={{ padding: "var(--space-8) var(--space-24)", color: "var(--color-text-secondary)" }}>
          {r.id} · {r.weight.toLocaleString("en-US")} kg with {r.carrier} to {r.destination}.
        </div>
      )}
    />
  ),
}

export const Empty: Story = {
  render: () => <Table caption="Shipments" columns={COLUMNS} rows={[]} rowKey={(r) => r.id} empty="No shipments match these filters. Clear a filter to see more." />,
}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked pressed={false} rows={[{ label: "Rows", node: <Table caption="Shipments" columns={COLUMNS} rows={ROWS.slice(0, 2)} rowKey={(r) => r.id} selected={[ROWS[0].id]} onSelect={() => {}} /> }]} />
  ),
}
