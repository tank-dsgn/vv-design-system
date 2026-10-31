import { useRef, useState } from "react"
import { Icon } from "./Icon.js"
import { IconButton } from "./IconButton.js"
import "./PromptInput.css"

export type PromptInputProps = {
  /** Names the field: it has no visible label. */
  label?: string
  placeholder?: string
  /** An answer is being generated: the send button becomes Stop. */
  streaming?: boolean
  onSend: (text: string) => void
  onStop?: () => void
  /** Shows an attach button. */
  onAttach?: () => void
  disabled?: boolean
}

/** Where a person asks an assistant. Enter sends, Shift+Enter starts a new
 *  line, and the field grows with the text. */
export function PromptInput({ label = "Message", placeholder = "Ask a question", streaming = false, onSend, onStop, onAttach, disabled = false }: PromptInputProps) {
  const [text, setText] = useState("")
  const ref = useRef<HTMLTextAreaElement>(null)

  const send = () => {
    if (!text.trim() || streaming) return
    onSend(text.trim())
    setText("")
    if (ref.current) ref.current.style.height = ""
  }

  return (
    <div className="vv-prompt">
      <textarea
        ref={ref}
        rows={1}
        disabled={disabled}
        aria-label={label}
        placeholder={placeholder}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          e.target.style.height = "auto"
          e.target.style.height = `${e.target.scrollHeight}px`
        }}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() } }}
      />
      <div className="vv-prompt__bar">
        {onAttach ? <IconButton variant="ghost" size="sm" label="Attach a file" icon={<Icon name="attach" size={16} />} disabled={disabled} onClick={onAttach} /> : <span />}
        {streaming
          ? <IconButton variant="secondary" size="sm" label="Stop generating" icon={<Icon name="status-filled" size={16} />} onClick={onStop} />
          : <IconButton variant="primary" size="sm" label="Send message" icon={<Icon name="send" size={16} />} disabled={!text.trim()} onClick={send} />}
      </div>
    </div>
  )
}
