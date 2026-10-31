import { CodeBlock } from "./CodeBlock.js"
import { Collapsible } from "./Collapsible.js"
import { StatusChip, type ProcessStatus } from "./StatusChip.js"
import "./ToolCall.css"

export type ToolCallProps = {
  /** The tool, in words: "Search rate cards". */
  name: string
  status: ProcessStatus
  /** What it was asked, as text or JSON. */
  input?: string
  /** What came back. */
  output?: string
  defaultOpen?: boolean
}

/** A tool an assistant used, with what went in and what came out, closed by
 *  default. */
export function ToolCall({ name, status, input, output, defaultOpen }: ToolCallProps) {
  return (
    <div className="vv-tool">
      <Collapsible title={name} meta={<StatusChip status={status} />} defaultOpen={defaultOpen}>
        <div className="vv-tool__parts">
          {input && <CodeBlock title="Input" code={input} />}
          {output && <CodeBlock title="Output" code={output} />}
        </div>
      </Collapsible>
    </div>
  )
}
