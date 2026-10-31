import { Icon } from "./Icon.js"
import { IconButton } from "./IconButton.js"
import { ProgressBar } from "./ProgressBar.js"
import "./FileItem.css"

export type FileItemProps = {
  name: string
  /** Bytes. */
  size: number
  status?: "uploading" | "done" | "error"
  /** 0–100 while uploading. */
  progress?: number
  error?: string
  onRemove?: () => void
  onRetry?: () => void
}

const kb = (n: number) => (n >= 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`)

/** One file in an upload list, under a Dropzone: name, size, progress, and
 *  what to do when it fails. */
export function FileItem({ name, size, status = "done", progress = 0, error, onRemove, onRetry }: FileItemProps) {
  return (
    <div className="vv-file" data-status={status}>
      <span className="vv-file__icon" aria-hidden="true"><Icon name={status === "error" ? "error" : name.endsWith(".pdf") ? "pdf" : name.match(/\.(png|jpe?g|webp)$/) ? "image" : "file"} /></span>
      <div className="vv-file__body">
        <div className="vv-file__head">
          <span className="vv-file__name" title={name}>{name}</span>
          <span className="vv-file__meta">
            {status === "uploading" ? `${Math.round(progress)}% of ${kb(size)}` : status === "error" ? error ?? "Upload failed" : kb(size)}
          </span>
        </div>
        {status === "uploading" && <ProgressBar value={progress} label={`Uploading ${name}`} showValue={false} />}
      </div>
      <div className="vv-file__actions">
        {status === "error" && onRetry && <IconButton variant="ghost" size="sm" icon={<Icon name="rotate" size={16} />} label={`Retry ${name}`} onClick={onRetry} />}
        {onRemove && <IconButton variant="ghost" size="sm" icon={<Icon name="close" size={16} />} label={status === "uploading" ? `Cancel ${name}` : `Remove ${name}`} onClick={onRemove} />}
      </div>
    </div>
  )
}
