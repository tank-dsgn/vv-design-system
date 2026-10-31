import { Fragment, useId, useMemo, useState, type ReactNode } from "react"
import { Checkbox } from "./Checkbox.js"
import { Icon } from "./Icon.js"
import "./Table.css"

export type Column<Row> = {
  key: string
  header: string
  /** Cell content. Left as a render function so a cell can hold a Badge or a
   *  Button without the table knowing anything about them. */
  cell: (row: Row) => ReactNode
  /** Value used for sorting. Its absence is what makes a column unsortable —
   *  there is no separate `sortable` flag to contradict it. */
  sortValue?: (row: Row) => string | number
  /** Announced to a screen reader in place of a visible header. */
  srHeader?: string
  /** `end` for numbers, so digits line up by place value. */
  align?: "start" | "end"
}

export type TableProps<Row> = {
  caption: string
  columns: Column<Row>[]
  rows: Row[]
  rowKey: (row: Row) => string
  empty?: ReactNode
  /** Passing this turns on the selection column. */
  selected?: string[]
  onSelect?: (keys: string[]) => void
  /** Passing this turns on expandable rows: each row gets a disclosure button,
   *  and the returned node renders in a full-width row beneath it. */
  renderExpanded?: (row: Row) => ReactNode
}

export function Table<Row>({
  caption,
  columns,
  rows,
  rowKey,
  empty = "Nothing to show.",
  selected,
  onSelect,
  renderExpanded,
}: TableProps<Row>) {
  const baseId = useId()
  const [expanded, setExpanded] = useState<string[]>([])
  const expandable = Boolean(renderExpanded)
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(
    null,
  )
  const selectable = Boolean(selected && onSelect)
  const extraCols = (selectable ? 1 : 0) + (expandable ? 1 : 0)

  const sorted = useMemo(() => {
    if (!sort) return rows
    const col = columns.find((c) => c.key === sort.key)
    if (!col?.sortValue) return rows
    // A copy: sorting the prop array in place would mutate the caller's state.
    return [...rows].sort((a, b) => {
      const av = col.sortValue!(a)
      const bv = col.sortValue!(b)
      const cmp = av < bv ? -1 : av > bv ? 1 : 0
      return sort.dir === "asc" ? cmp : -cmp
    })
  }, [rows, sort, columns])

  const allKeys = sorted.map(rowKey)
  const allSelected = selectable && selected!.length === allKeys.length && allKeys.length > 0
  const someSelected = selectable && selected!.length > 0 && !allSelected

  return (
    <div className="vv-table-wrap">
      <table className="vv-table">
        {/* Visible captions beat aria-label: sighted users get the same
            context, and it survives being copied out of the page. */}
        <caption className="vv-table__caption">{caption}</caption>
        <thead>
          <tr>
            {expandable && (
              <th scope="col" className="vv-table__select">
                <span className="vv-table__caption">Expand</span>
              </th>
            )}
            {selectable && (
              <th scope="col" className="vv-table__select">
                <Checkbox
                  label="Select all rows"
                  labelHidden
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={(e) => onSelect!(e.target.checked ? allKeys : [])}
                />
              </th>
            )}
            {columns.map((col) => {
              const active = sort?.key === col.key
              return (
                <th
                  key={col.key}
                  scope="col"
                  data-align={col.align}
                  // The sort state belongs on the header, not on an icon:
                  // this is what a screen reader reads out.
                  aria-sort={
                    active
                      ? sort!.dir === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                >
                  {col.sortValue ? (
                    <button
                      className="vv-table__sort"
                      type="button"
                      onClick={() =>
                        setSort(
                          active && sort!.dir === "asc"
                            ? { key: col.key, dir: "desc" }
                            : { key: col.key, dir: "asc" },
                        )
                      }
                    >
                      {col.header}
                      <span className="vv-table__arrow" aria-hidden="true">
                        {active ? (sort!.dir === "asc" ? "▲" : "▼") : "↕"}
                      </span>
                    </button>
                  ) : (
                    col.srHeader ? (
                      <span className="vv-table__caption">{col.srHeader}</span>
                    ) : (
                      col.header
                    )
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 && (
            <tr>
              <td
                className="vv-table__empty"
                colSpan={columns.length + extraCols}
              >
                {empty}
              </td>
            </tr>
          )}
          {sorted.map((row) => {
            const key = rowKey(row)
            const isSelected = selectable && selected!.includes(key)
            const isOpen = expandable && expanded.includes(key)
            const detailId = `${baseId}-${key}`
            return (
              <Fragment key={key}>
              <tr aria-selected={selectable ? isSelected : undefined}>
                {expandable && (
                  <td className="vv-table__select">
                    <button
                      className="vv-table__disclosure"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={detailId}
                      aria-label={`${isOpen ? "Collapse" : "Expand"} ${key}`}
                      onClick={() =>
                        setExpanded((e) =>
                          e.includes(key) ? e.filter((k) => k !== key) : [...e, key],
                        )
                      }
                    >
                      <Icon name={isOpen ? "chevron-up" : "chevron-down"} />
                    </button>
                  </td>
                )}
                {selectable && (
                  <td className="vv-table__select">
                    <Checkbox
                      label={`Select ${key}`}
                      labelHidden
                      checked={isSelected}
                      onChange={(e) =>
                        onSelect!(
                          e.target.checked
                            ? [...selected!, key]
                            : selected!.filter((k) => k !== key),
                        )
                      }
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} data-align={col.align}>{col.cell(row)}</td>
                ))}
              </tr>
              {expandable && (
                // Kept in the DOM while collapsed so aria-controls has a
                // target; `hidden` removes it from view and from reading order.
                <tr id={detailId} hidden={!isOpen} className="vv-table__detail">
                  <td colSpan={columns.length + extraCols}>
                    {isOpen && renderExpanded!(row)}
                  </td>
                </tr>
              )}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
