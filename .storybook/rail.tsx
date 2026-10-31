import * as React from "react"
import { createPortal } from "react-dom"
import type { API } from "storybook/manager-api"
import { ICONS, type IconName } from "../src/icons/icons"
import { GROUPS } from "../src/docs/groups"
import { PanelIcon, setNavOpen, useNavOpen } from "./nav-state"

/* The folded sidebar: everything it holds, as icons. Foundations pages are links;
   a component group opens a flyout with its components. */

// The manager's bundle needs React in scope, so it draws the set itself instead of importing Icon.
const Icon = ({ name, size = 20 }: { name: IconName; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[name] }} />
)

const PAGE_ICONS: Record<string, IconName> = {
  Tokens: "braces",
  Colors: "palette",
  Theming: "sparkles",
  Typography: "type",
  "Spacing & Size": "size-hor",
  "Border and Corner": "square",
  "Shadows & Elevation": "layers",
  "Breakpoints & Grids": "layout-grid",
  Motion: "zap",
  Icons: "star-empty",
  "Dark theme": "moon",
}
const GROUP_ICONS: Record<string, IconName> = {
  Actions: "play",
  Forms: "edit",
  Navigation: "compass",
  Feedback: "notifications",
  Overlays: "copy",
  Content: "document",
  Data: "chart",
  AI: "ai",
}

function Tip({ tip }: { tip: { label: string; top: number } | null }) {
  if (!tip) return null
  return createPortal(<div className="vv-rail__tip" role="presentation" style={{ top: tip.top }}>{tip.label}</div>, document.body)
}

export function Rail({ api, section, path }: { api: API; section: string; path: string | undefined }) {
  const navOpen = useNavOpen()
  const [tip, setTip] = React.useState<{ label: string; top: number } | null>(null)
  const [fly, setFly] = React.useState<{ group: string; top: number; anchor: HTMLElement } | null>(null)
  const flyRef = React.useRef<HTMLDivElement>(null)
  const current = path?.split("/").pop()?.replace(/--.*$/, "")

  React.useEffect(() => {
    if (!fly) return
    flyRef.current?.querySelector("a")?.focus()
    const down = (e: PointerEvent) => {
      if (!flyRef.current?.contains(e.target as Node) && !fly.anchor.contains(e.target as Node)) setFly(null)
    }
    document.addEventListener("pointerdown", down)
    return () => document.removeEventListener("pointerdown", down)
  }, [fly])

  const tipProps = (label: string) => ({
    "aria-label": label,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => { const r = e.currentTarget.getBoundingClientRect(); setTip({ label, top: r.top + r.height / 2 }) },
    onMouseLeave: () => setTip(null),
    onFocus: (e: React.FocusEvent<HTMLElement>) => { if (e.target.matches(":focus-visible")) { const r = e.target.getBoundingClientRect(); setTip({ label, top: r.top + r.height / 2 }) } },
    onBlur: () => setTip(null),
  })

  const go = (e: React.MouseEvent, to: string) => {
    if (e.metaKey || e.ctrlKey) return
    e.preventDefault()
    api.navigate(to)
    setFly(null)
    setTip(null)
  }

  const onFlyKey = (e: React.KeyboardEvent) => {
    const items = Array.from(flyRef.current?.querySelectorAll("a") ?? [])
    const i = items.indexOf(document.activeElement as HTMLAnchorElement)
    if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length]?.focus() }
    else if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length]?.focus() }
    else if (e.key === "Escape") { e.preventDefault(); const a = fly?.anchor; setFly(null); a?.focus() }
    else if (e.key === "Tab") setFly(null)
  }

  if (navOpen) return null

  return (
    <nav id="vv-rail" aria-label="Menu">
      <div className="vv-rail__top">
        <button type="button" {...tipProps("Show menu")} onClick={() => { setTip(null); setNavOpen(true) }}>
          <PanelIcon open={false} />
        </button>
        <button
          type="button"
          {...tipProps("Find")}
          onClick={() => {
            setTip(null)
            setNavOpen(true)
            window.setTimeout(() => document.querySelector<HTMLInputElement>("#vv-find input")?.focus(), 60)
          }}
        >
          <Icon name="search" size={16} />
        </button>
      </div>
      <div className="vv-rail__items">
        {section === "foundations"
          ? Object.entries(PAGE_ICONS).map(([name, icon]) => {
              // From the name, not the index: the index is still loading when a folded menu mounts.
              const id = `foundations-${name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`
              return (
                <a key={id} href={`./?path=/docs/${id}--docs`} aria-current={id === current ? "page" : undefined} {...tipProps(name)} onClick={(e) => go(e, `/docs/${id}--docs`)}>
                  <Icon name={icon} />
                </a>
              )
            })
          : Object.entries(GROUPS).map(([group, names]) => (
              <button
                key={group}
                type="button"
                aria-haspopup="menu"
                aria-expanded={fly?.group === group}
                data-current={names.some((n) => `components-${n.toLowerCase()}` === current) || undefined}
                {...tipProps(group)}
                onClick={(e) => {
                  setTip(null)
                  const anchor = e.currentTarget
                  setFly(fly?.group === group ? null : { group, top: anchor.getBoundingClientRect().top, anchor })
                }}
              >
                <Icon name={GROUP_ICONS[group]} />
              </button>
            ))}
      </div>
      <Tip tip={fly ? null : tip} />
      {fly &&
        createPortal(
          <div ref={flyRef} role="menu" aria-label={fly.group} className="vv-rail__fly" style={{ top: Math.min(fly.top, window.innerHeight - 420) }} onKeyDown={onFlyKey}>
            <p>{fly.group}</p>
            {GROUPS[fly.group].map((n) => {
              const id = `components-${n.toLowerCase()}`
              return (
                <a key={n} role="menuitem" href={`./?path=/docs/${id}--docs`} aria-current={id === current ? "page" : undefined} onClick={(e) => go(e, `/docs/${id}--docs`)}>
                  {n}
                </a>
              )
            })}
          </div>,
          document.body,
        )}
    </nav>
  )
}
