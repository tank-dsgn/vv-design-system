/* Layout helpers for stories. A story shows the component, labelled the way a
   designer reads a spec sheet: one row per property value, the label on the
   left in a fixed column. */
import type { CSSProperties, ReactNode } from "react"

export function Stack({ children, gap }: { children: ReactNode; gap?: number }) {
  return <div className="vvs-stack" style={gap ? { gap } : undefined}>{children}</div>
}

export function Row({ children, start = false }: { children: ReactNode; start?: boolean }) {
  return <div className={start ? "vvs-row vvs-row--start" : "vvs-row"}>{children}</div>
}

/** A labelled line of a matrix. */
export function Line({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="vvs-line">
      <span className="vvs-label">{label}</span>
      <div className="vvs-row">{children}</div>
    </div>
  )
}

/** A matrix: rows × columns, with column headings over the cells. */
export function Matrix({
  columns,
  rows,
  colWidth = "auto",
}: {
  columns: string[]
  rows: { label: string; cells: ReactNode[] }[]
  colWidth?: string
}) {
  const template: CSSProperties = { gridTemplateColumns: `repeat(${columns.length}, ${colWidth})` }
  return (
    <div className="vvs-stack vvs-matrix" style={{ gap: 16 }}>
      <div className="vvs-head">
        <span />
        <div className="vvs-cols" style={template}>
          {columns.map((c) => <span key={c} className="vvs-label">{c}</span>)}
        </div>
      </div>
      {rows.map((r) => (
        <div key={r.label} className="vvs-line">
          <span className="vvs-label">{r.label}</span>
          <div className="vvs-cols" style={template}>
            {r.cells.map((cell, i) => <div key={i}>{cell}</div>)}
          </div>
        </div>
      ))}
    </div>
  )
}

/** A titled block inside one story, for pages that show several aspects. */
export function Section({ title, note, children }: { title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <section className="vvs-section">
      <h3 className="vvs-section__title">{title}</h3>
      {note && <p className="vvs-section__note">{note}</p>}
      {children}
    </section>
  )
}

export function Grid({ children, min = 240 }: { children: ReactNode; min?: number }) {
  return <div className="vvs-grid" style={{ ["--vvs-min" as string]: `${min}px` }}>{children}</div>
}

export function Narrow({ children, width = "narrow" }: { children: ReactNode; width?: "narrow" | "medium" }) {
  return <div className={width === "narrow" ? "vvs-narrow" : "vvs-medium"}>{children}</div>
}

/** Forces a pseudo-state on everything inside, through
 *  storybook-addon-pseudo-states. Pair with `pseudoParams` on the story. */
export function State({ is, children }: { is: "hover" | "active" | "focus"; children: ReactNode }) {
  return <span data-pseudo={is} style={{ display: "contents" }}>{children}</span>
}

export const pseudoParams = {
  pseudo: {
    hover: ['[data-pseudo="hover"] *'],
    active: ['[data-pseudo="active"] *'],
    focusVisible: ['[data-pseudo="focus"] *'], focusWithin: ['[data-pseudo="focus"] *'],
  },
}

/** Every interactive state of a component, from one example. `stacked` puts the
 *  states under each other, for components too wide to sit side by side. */
export function StateMatrix({ rows, stacked = false, colWidth, pressed = true }: {
  rows: { label: string; node: ReactNode; disabled?: ReactNode }[]
  stacked?: boolean
  colWidth?: string
  pressed?: boolean
}) {
  const states: { name: string; is?: "hover" | "active" | "focus" }[] = [
    { name: "Rest" },
    { name: "Hover", is: "hover" },
    ...(pressed ? [{ name: "Pressed", is: "active" as const }] : []),
    { name: "Focus", is: "focus" },
  ]
  const cell = (node: ReactNode, is?: "hover" | "active" | "focus") => (is ? <State is={is}>{node}</State> : node)
  if (stacked) {
    return (
      <Stack>
        {rows.map((r) => (
          <Section key={r.label} title={r.label}>
            <Stack gap={12}>
              {states.map((s) => <div key={s.name} className="vvs-state"><span className="vvs-label">{s.name}</span><div className="vvs-state__body">{cell(r.node, s.is)}</div></div>)}
              {r.disabled && <div className="vvs-state"><span className="vvs-label">Disabled</span><div className="vvs-state__body">{r.disabled}</div></div>}
            </Stack>
          </Section>
        ))}
      </Stack>
    )
  }
  const hasDisabled = rows.some((r) => r.disabled)
  return (
    <Matrix
      colWidth={colWidth ?? "minmax(96px, auto)"}
      columns={[...states.map((s) => s.name), ...(hasDisabled ? ["Disabled"] : [])]}
      rows={rows.map((r) => ({ label: r.label, cells: [...states.map((s) => cell(r.node, s.is)), ...(hasDisabled ? [r.disabled ?? null] : [])] }))}
    />
  )
}

/** Why each variant exists, right under the variants themselves. */
export function Reasons({ label = "Variant", rows }: { label?: string; rows: [string, string, string][] }) {
  return (
    <table className="vvs-reasons">
      <thead><tr><th scope="col">{label}</th><th scope="col">Use it for</th><th scope="col">Why it looks this way</th></tr></thead>
      <tbody>{rows.map(([name, use, why]) => <tr key={name}><td>{name}</td><td>{use}</td><td>{why}</td></tr>)}</tbody>
    </table>
  )
}
