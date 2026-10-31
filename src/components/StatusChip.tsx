import { Badge, type BadgeTone } from "./Badge.js"

export type ProcessStatus = "queued" | "running" | "paused" | "done" | "failed"

export type StatusChipProps = {
  status: ProcessStatus
  /** Replaces the default word, when the object has its own: "In transit". */
  label?: string
}

const MAP: Record<ProcessStatus, [BadgeTone, string]> = {
  queued: ["neutral", "Queued"],
  running: ["info", "Running"],
  paused: ["attention", "Paused"],
  done: ["success", "Done"],
  failed: ["critical", "Failed"],
}

/** Where a process is: one word and one tone per stage, the same everywhere. */
export function StatusChip({ status, label }: StatusChipProps) {
  const [tone, word] = MAP[status]
  return <Badge tone={tone} dot>{label ?? word}</Badge>
}
