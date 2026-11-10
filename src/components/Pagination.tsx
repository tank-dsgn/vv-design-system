import { Button } from "./Button.js"
import { IconButton } from "./IconButton.js"
import { Icon } from "./Icon.js"
import "./Pagination.css"

export type PaginationProps = {
  /** 1-based. */
  page: number
  pageCount: number
  onChange: (page: number) => void
  /** `pages` shows numbered pages; `compact` shows "1–10 of 250" and arrows. */
  variant?: "pages" | "compact"
  /** Compact only: how many items a page holds and how many there are. */
  pageSize?: number
  total?: number
  /** Pages shown either side of the current one before an ellipsis. */
  siblings?: number
  size?: "xs" | "sm"
}

const Chevron = ({ dir }: { dir: "left" | "right" }) => <Icon name={dir === "left" ? "chevron-left" : "chevron-right"} />

/** The page numbers to show, with null for each gap. */
export function pageRange(page: number, count: number, siblings: number): (number | null)[] {
  const total = siblings * 2 + 5
  if (count <= total) return Array.from({ length: count }, (_, i) => i + 1)
  const left = Math.max(page - siblings, 2)
  const right = Math.min(page + siblings, count - 1)
  const out: (number | null)[] = [1]
  if (left > 2) out.push(null)
  else for (let p = 2; p < left; p++) out.push(p)
  for (let p = left; p <= right; p++) out.push(p)
  if (right < count - 1) out.push(null)
  else for (let p = right + 1; p < count; p++) out.push(p)
  out.push(count)
  return out
}

/** Moves through a list split into pages. A `nav` with the current page
 *  marked by `aria-current`; previous and next are disabled at the ends,
 *  never hidden, so the control does not jump. */
export function Pagination({
  page,
  pageCount,
  onChange,
  variant = "pages",
  pageSize = 10,
  total,
  siblings = 1,
  size = "sm",
}: PaginationProps) {
  const prev = (
    <IconButton variant="ghost" size={size} icon={<Chevron dir="left" />} label="Previous page" disabled={page <= 1} onClick={() => onChange(page - 1)} />
  )
  const next = (
    <IconButton variant="ghost" size={size} icon={<Chevron dir="right" />} label="Next page" disabled={page >= pageCount} onClick={() => onChange(page + 1)} />
  )

  if (variant === "compact") {
    const count = total ?? pageCount * pageSize
    const from = (page - 1) * pageSize + 1
    const to = Math.min(page * pageSize, count)
    return (
      <nav className="vv-pagination" aria-label="Pagination">
        <span className="vv-pagination__summary" aria-live="polite">
          {from}–{to} of {count.toLocaleString("en-US")}
        </span>
        {prev}
        {next}
      </nav>
    )
  }

  return (
    <nav className="vv-pagination" aria-label="Pagination">
      {prev}
      <ul className="vv-pagination__pages">
        {pageRange(page, pageCount, siblings).map((p, i) =>
          p === null ? (
            <li key={`gap-${i}`} className="vv-pagination__gap" aria-hidden="true">…</li>
          ) : (
            <li key={p}>
              <Button
                variant={p === page ? "secondary" : "ghost"}
                size={size}
                aria-current={p === page ? "page" : undefined}
                aria-label={`Page ${p}`}
                onClick={() => onChange(p)}
              >
                {p}
              </Button>
            </li>
          ),
        )}
      </ul>
      {next}
    </nav>
  )
}
