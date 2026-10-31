import type { ReactNode } from "react"
import { Collapsible } from "./Collapsible.js"
import { StatusChip, type ProcessStatus } from "./StatusChip.js"

export type TaskProps = {
  title: string
  status: ProcessStatus
  /** What it did: the steps, the files it touched. */
  children?: ReactNode
  defaultOpen?: boolean
}

/** One unit of an assistant's work: its title, status and what it did. */
export function Task({ title, status, children, defaultOpen }: TaskProps) {
  return <Collapsible title={title} meta={<StatusChip status={status} />} defaultOpen={defaultOpen}>{children}</Collapsible>
}
