import { useState, type FormEvent, type ReactNode } from "react"
import { Icon } from "./Icon.js"
import { IconButton } from "./IconButton.js"
import { Input } from "./Input.js"
import { Spinner } from "./Spinner.js"
import "./Chat.css"

export type ChatMessageProps = {
  role: "user" | "assistant"
  author: string
  time: string
  avatar?: ReactNode
  /** Buttons under an assistant reply: save, share, rate. */
  actions?: ReactNode
  children: ReactNode
}

/** One message. Rendered as an `article` named by author and time, so a screen
 *  reader can move message by message instead of line by line. */
export function ChatMessage({ role, author, time, avatar, actions, children }: ChatMessageProps) {
  return (
    <article className={`vv-chat-msg vv-chat-msg--${role}`} aria-label={`${author}, ${time}`}>
      {role === "assistant" && <div className="vv-chat-msg__avatar">{avatar}</div>}
      <div className="vv-chat-msg__meta">
        <span className="vv-chat-msg__author">{author}</span>
        <span className="vv-chat-msg__time">{time}</span>
      </div>
      <div className="vv-chat-msg__body">{children}</div>
      {actions && <div className="vv-chat-msg__actions">{actions}</div>}
    </article>
  )
}

export type ChatComposerProps = {
  onSend: (text: string) => void
  onAttach?: () => void
  placeholder?: string
  /** While a reply is being written: sending is paused, typing is not. */
  busy?: boolean
}

/** The message box. A real `form`: Enter sends, and the send button is its
 *  submit button — no keydown handler to get wrong. */
export function ChatComposer({ onSend, onAttach, placeholder = "Type a message", busy = false }: ChatComposerProps) {
  const [text, setText] = useState("")
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const value = text.trim()
    if (!value || busy) return
    onSend(value)
    setText("")
  }
  return (
    <form className="vv-chat-composer" onSubmit={submit}>
      {onAttach && (
        <IconButton variant="outlined" icon={<Icon name="attach" />} label="Attach a file" onClick={onAttach} />
      )}
      <div className="vv-chat-composer__field">
        <Input aria-label="Message" placeholder={placeholder} value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <IconButton
        variant="outlined"
        type="submit"
        icon={<Icon name="send" />}
        label="Send message"
        // aria-disabled, not disabled: focus must not drop off the button
        // while a reply is on its way.
        aria-disabled={busy || text.trim() === ""}
      />
    </form>
  )
}

/** "Writing…" state. `role="status"` is announced once, without interrupting. */
export function ChatTyping({ who }: { who: string }) {
  return (
    <span className="vv-chat-typing" role="status">
      <Spinner size="sm" label={`${who} is writing`} />
      {who} is writing…
    </span>
  )
}
