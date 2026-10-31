import type { ReactNode } from "react"
import { Avatar } from "./Avatar.js"
import "./Message.css"

export type MessageProps = {
  from: "user" | "assistant"
  author: string
  time?: string
  children: ReactNode
  /** An ActionBar under the message. */
  actions?: ReactNode
}

/** One message of a conversation. Each is an `article` named by its author, so
 *  screen readers move message by message. */
export function Message({ from, author, time, children, actions }: MessageProps) {
  return (
    <article className={`vv-message vv-message--${from}`} aria-label={time ? `${author}, ${time}` : author}>
      <Avatar name={author} size="sm" tone={from === "assistant" ? "purple" : "blue"} shape={from === "assistant" ? "rounded" : "circle"} />
      <div className="vv-message__main">
        <p className="vv-message__meta"><b>{author}</b>{time && <span> {time}</span>}</p>
        <div className="vv-message__body">{children}</div>
        {actions && <div className="vv-message__actions">{actions}</div>}
      </div>
    </article>
  )
}
