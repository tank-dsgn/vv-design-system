import * as React from "react"
import { Canvas, Controls, Description, DocsContext, Source, useOf } from "@storybook/addon-docs/blocks"
import { Icon } from "../src/components/Icon"
import { SegmentedControl } from "../src/components/SegmentedControl"
import { COMPONENTS } from "../src/docs/groups"
import { USAGE } from "../src/docs/usage"
import { subscribeToTheme, theme } from "./theme-store"

/* One template for every component page: the description, the example, "Usage"
   (src/docs/usage.ts: when to use it, when not to and what instead), then "Properties" — each property a row with its
   explanation on the left and the example on the right — and the property
   table last. Stories that need the full width (state matrices, tables,
   whole flows) set `parameters.docs.wide` and stack instead. */

/** Stories that read better full width without a `wide` flag of their own. */
const WIDE = new Set(["States", "Usage", "Live", "Sortable", "Selectable", "Expandable", "Empty", "Toolbar", "Placements", "Loading To Loaded", "Tones", "Ranges", "Expanded", "Collapsed", "Flow", "Long Content", "Form", "Drawer", "Anatomy", "Overflow"])

/** `[Button]` in usage text links to that component's page. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[A-Za-z]+\])/).map((part, i) => {
        const name = part.match(/^\[([A-Za-z]+)\]$/)?.[1]
        return name ? <a key={i} href={`./?path=/docs/components-${name.toLowerCase()}--docs`} target="_top">{name}</a> : part
      })}
    </>
  )
}

/** An example with its code one click away. */
function Example({ of }: { of: unknown }) {
  const [mode, setMode] = React.useState("preview")
  const dark = React.useSyncExternalStore(subscribeToTheme, () => theme.dark)
  return (
    <div className="vvd-example">
      <div className="vvd-example__tabs">
        <SegmentedControl aria-label="Show" size="sm" value={mode} onChange={setMode} options={[{ value: "preview", label: "Preview" }, { value: "code", label: "Code" }]} />
      </div>
      {mode === "preview" ? <Canvas of={of as never} sourceState="none" withToolbar={false} /> : <Source of={of as never} dark={dark} />}
    </div>
  )
}

/** The arrows to the neighbouring components, in sidebar order. */
function Pager({ name }: { name: string }) {
  const i = COMPONENTS.indexOf(name)
  const link = (n: string | undefined, label: string, icon: "arrow-left" | "arrow-right") =>
    n ? (
      <a href={`./?path=/docs/components-${n.toLowerCase()}--docs`} target="_top" aria-label={`${label}: ${n}`} title={`${label}: ${n}`}><Icon name={icon} size={16} /></a>
    ) : (
      <span aria-hidden="true"><Icon name={icon} size={16} /></span>
    )
  return (
    <nav className="vvd-pager" aria-label="Components">
      {link(COMPONENTS[i - 1], "Previous", "arrow-left")}
      {link(COMPONENTS[i + 1], "Next", "arrow-right")}
    </nav>
  )
}

/** An anchor for the contents list, which can only track and reach a heading that has one. */
const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-")

function List({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null
  return (
    <div>
      <h3 id={slug(title)}>{title}</h3>
      <ul>{items.map((t) => <li key={t}><Rich text={t} /></li>)}</ul>
    </div>
  )
}

type StoryEntry = {
  id: string
  name: string
  moduleExport: unknown
  parameters: { docs?: { wide?: boolean }; pseudo?: unknown }
}

export function DocsPage() {
  const { csfFile, preparedMeta } = useOf("meta", ["meta"]) as unknown as {
    csfFile: unknown
    preparedMeta: { title: string; tags?: string[] }
  }
  // In export order, as the file declares them — the same list the Stories block uses.
  const context = React.useContext(DocsContext) as unknown as {
    componentStoriesFromCSFFile: (f: unknown) => StoryEntry[]
  }
  const stories = context.componentStoriesFromCSFFile(csfFile)
  const [first, ...rest] = stories
  const name = preparedMeta.title.split("/").pop()
  const isNew = preparedMeta.tags?.includes("new")
  const usage = name ? USAGE[name] : undefined

  return (
    <div className="vvd-docpage">
      <header className="vvd-docpage__head">
        {name && <Pager name={name} />}
        <h1 className="vvd-docpage__title">
          {name} <span className="vvd-docpage__usage">usage</span>
        </h1>
        <span className={`vvd-status vvd-status--${isNew ? "new" : "stable"}`}>{isNew ? "New" : "Stable"}</span>
        <div className="vvd-docpage__lead">
          <Description of="meta" />
        </div>
      </header>

      {first && (
        <div className="vvd-docpage__hero">
          <Example of={first.moduleExport} />
        </div>
      )}

      {usage && (
        <>
          <h2 id="usage" className="vvd-docpage__h2">Usage</h2>
          <div className="vvd-usage">
            <List title="When to use" items={usage.use} />
            <List title="When not to use" items={usage.avoid} />
            <List title="Writing" items={usage.write} />
          </div>
        </>
      )}

      {rest.length > 0 && (
        <>
          <h2 id="properties" className="vvd-docpage__h2">Properties</h2>
          {rest.map((s) => (
            <section
              key={s.id}
              id={`anchor--${s.id}`}
              className={s.parameters.docs?.wide ?? WIDE.has(s.name) ? "vvd-prop vvd-prop--wide" : "vvd-prop"}
            >
              <div className="vvd-prop__text">
                <h3 id={`prop-${slug(s.name)}`}>{s.name}</h3>
                <Description of={s.moduleExport as never} />
              </div>
              <div className="vvd-prop__example">
                <Example of={s.moduleExport} />
              </div>
            </section>
          ))}
        </>
      )}

      {first && (
        <>
          <h2 id="property-table" className="vvd-docpage__h2">Property table</h2>
          <p className="vvd-docpage__note">Every prop with its values and default. Change a value to update the example at the top.</p>
          <div className="vvd-table-scroll" role="region" aria-label="Property table" tabIndex={0}>
            <Controls of={first.moduleExport as never} />
          </div>
        </>
      )}
    </div>
  )
}
