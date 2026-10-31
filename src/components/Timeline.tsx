import type { ReactNode } from "react"
import "./Timeline.css"

export type TimelineEvent = {
  id: string
  title: string
  /** Shown as given; pass a `<time>` for machine-readable dates. */
  time: ReactNode
  description?: string
  tone?: "neutral" | "accent" | "success" | "critical"
}

export type TimelineProps = { events: TimelineEvent[] }

/** What happened to an object, in order — a shipment's tracking history,
 *  an invoice's activity. Newest first is the usual choice for status. */
export function Timeline({ events }: TimelineProps) {
  return (
    <ol className="vv-timeline">
      {events.map((e) => (
        <li key={e.id} className="vv-timeline__event" data-tone={e.tone ?? "neutral"}>
          <span className="vv-timeline__dot" aria-hidden="true" />
          <div className="vv-timeline__body">
            <div className="vv-timeline__head">
              <span className="vv-timeline__title">{e.title}</span>
              <span className="vv-timeline__time">{e.time}</span>
            </div>
            {e.description && <p className="vv-timeline__desc">{e.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}
