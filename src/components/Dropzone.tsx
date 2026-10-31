import { useId, useState, type DragEvent, type ReactNode } from "react"
import "./Dropzone.css"

/** Three sizes from Figma: default / medium / small → lg / md / sm.
 *  "default" is renamed as a size name: being the default is the order of the
 *  list, not the name of a step. */
export type DropzoneSize = "sm" | "md" | "lg"

export type DropzoneProps = {
  size?: DropzoneSize
  disabled?: boolean
  // Figma: State=error.
  /** Marks the zone as rejecting the last file. Pass the reason as children. */
  invalid?: boolean
  accept?: string
  multiple?: boolean
  onFiles?: (files: File[]) => void
  children?: ReactNode
}

export function Dropzone({
  size = "lg",
  disabled = false,
  invalid = false,
  accept,
  multiple = false,
  onFiles,
  children = "Drop a file here, or click to choose one",
}: DropzoneProps) {
  const [dragging, setDragging] = useState(false)
  const inputId = useId()

  const drop = (e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    if (disabled) return
    onFiles?.(Array.from(e.dataTransfer.files))
  }

  return (
    <label
      htmlFor={inputId}
      className={[
        "vv-dropzone",
        `vv-dropzone--${size}`,
        dragging ? "vv-dropzone--dragging" : "",
        invalid ? "vv-dropzone--invalid" : "",
        disabled ? "vv-dropzone--disabled" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      // dragover must be cancelled, or the browser opens the file instead of
      // letting the zone receive it.
      onDragOver={(e) => {
        e.preventDefault()
        if (!disabled) setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={drop}
    >
      <input
        id={inputId}
        className="vv-dropzone__input"
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => onFiles?.(Array.from(e.target.files ?? []))}
      />
      {children}
    </label>
  )
}
