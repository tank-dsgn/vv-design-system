import { useState } from "react"
import { Icon } from "./Icon.js"
import { IconButton } from "./IconButton.js"
import "./CodeBlock.css"

export type CodeBlockProps = {
  code: string
  /** Shown in the header: a file name or a language. */
  title?: string
}

/** Code to read and copy. It scrolls sideways rather than wrapping, and the
 *  scroll area takes keyboard focus. */
export function CodeBlock({ code, title = "Code" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard refused: the code stays selectable */ }
  }
  return (
    <figure className="vv-code" aria-label={title}>
      <figcaption className="vv-code__head">
        <span>{title}</span>
        <IconButton variant="ghost" size="xs" label={copied ? "Copied" : "Copy code"} icon={<Icon name={copied ? "check" : "copy"} size={16} />} onClick={copy} />
      </figcaption>
      <pre tabIndex={0} className="vv-code__body"><code>{code}</code></pre>
    </figure>
  )
}
