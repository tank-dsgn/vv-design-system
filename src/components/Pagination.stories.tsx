import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Line, Stack, StateMatrix, pseudoParams } from "../docs/specimen.js"
import { Pagination } from "./Pagination.js"

const meta = {
  id: "components-pagination",
  title: "Components/Navigation/Pagination",
  component: Pagination,
  args: { page: 4, pageCount: 12, onChange: () => {}, variant: "pages", size: "sm", siblings: 1 },
  argTypes: {
    variant: { control: "inline-radio", options: ["pages", "compact"] },
    size: { control: "inline-radio", options: ["xs", "sm"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Moves through a long list split into pages. **pages** lets people jump to a page by number — for " +
          "search results and catalogues. **compact** shows the visible range and arrows — for tables where " +
          "position matters less than moving on. Previous and next are disabled at the ends, never hidden.",
      },
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.page)
    return <Pagination {...args} page={page} onChange={setPage} />
  },
}

/** The range collapses into gaps as the list grows; first and last stay reachable. */
export const Ranges: Story = {
  render: () => (
    <Stack gap={16}>
      <Line label="5 pages"><Pagination page={2} pageCount={5} onChange={() => {}} /></Line>
      <Line label="Start of 20"><Pagination page={1} pageCount={20} onChange={() => {}} /></Line>
      <Line label="Middle of 20"><Pagination page={10} pageCount={20} onChange={() => {}} /></Line>
      <Line label="End of 20"><Pagination page={20} pageCount={20} onChange={() => {}} /></Line>
    </Stack>
  ),
}

export const Compact: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    return <Pagination variant="compact" page={page} pageCount={25} pageSize={10} total={250} onChange={setPage} />
  },
}

export const Sizes: Story = {
  render: () => (
    <Stack gap={16}>
      <Line label="sm · 32px"><Pagination page={3} pageCount={8} onChange={() => {}} /></Line>
      <Line label="xs · 24px"><Pagination page={3} pageCount={8} onChange={() => {}} size="xs" /></Line>
    </Stack>
  ),
}

/** Every interactive state. */
export const States: Story = {
  parameters: pseudoParams, render: () => (
    <StateMatrix stacked rows={[{ label: "Pages", node: <Pagination page={2} pageCount={5} onChange={() => {}} /> }, { label: "Compact", node: <Pagination variant="compact" page={1} pageCount={5} pageSize={20} total={96} onChange={() => {}} /> }]} />
  ),
}
