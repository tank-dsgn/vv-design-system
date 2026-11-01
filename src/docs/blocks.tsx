/* Blocks for the Foundations pages. Each one renders straight from tokens.css
   (via tokens.ts), so a page shows what components actually get. */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { ICONS, type IconName } from "../icons/icons.js"
import { Icon } from "../components/Icon.js"
import { Field, Input } from "../components/Input.js"
import { IconDetails } from "./IconDetails.js"
import { Button } from "../components/Button.js"
import { Checkbox } from "../components/Checkbox.js"
import { Link } from "../components/Link.js"
import { ProgressBar } from "../components/ProgressBar.js"
import { SegmentedControl } from "../components/SegmentedControl.js"
import { Switch } from "../components/Switch.js"
import { Tabs } from "../components/Tabs.js"
import { Skeleton } from "../components/Skeleton.js"
import { Spinner } from "../components/Spinner.js"
import { STEPS, RAMPS, byPrefix, darkValue, lightTokens, primitiveOf, rawValue, tailwindStep } from "./tokens.js"

export function Docs({ children }: { children: ReactNode }) {
  return <div className="vvd">{children}</div>
}

/* --- Colour ------------------------------------------------------------- */

/** Raw value -> primitive token -> semantic token: the diagram from the case study. */
export function TokenPyramid() {
  return (
    <img
      className="vvd vvd-scheme"
      src="./vv-token-architecture.jpg"
      alt="VV Foundations token architecture, a pyramid of three levels. A raw value, #F5F5F5, is named by a primitive token, --neutral-100, which is given a role by a semantic token, --color-background-secondary."
    />
  )
}

export function ColorTable({ prefix, roles }: { prefix: string; roles?: Record<string, string> }) {
  const list = byPrefix(prefix)
  return (
    <table className="vvd vvd-table vvd-colors">
      <thead>
        <tr>
          <th>Preview</th>
          <th>Token</th>
          <th>Primitive</th>
          <th className="vvd-hide-sm">Usage</th>
        </tr>
      </thead>
      <tbody>
        {list.map((t) => {
          const dark = darkValue(t.name)
          return (
            <tr key={t.name}>
              <td>
                <span className="vvd-swatch--pair" title="Light and dark">
                  <span style={{ background: t.value }} />
                  <span style={{ background: dark ?? t.value }} />
                </span>
              </td>
              <td><code className="vvd-name">{t.name}</code></td>
              <td>
                <span className="mono" title={rawValue(t.value)}>{primitiveOf(t.value) ?? t.value}</span>
                {dark && <span className="mono vvd-dark-value" title={rawValue(dark)}>dark: {primitiveOf(dark) ?? dark}</span>}
              </td>
              <td className="vvd-hide-sm">{roles?.[t.name] ?? ""}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

/** The two levels, read from tokens.css: one value followed through both. */
export function TokenLevels() {
  const raw = rawValue("var(--color-accent)")
  const rows = [
    ["Raw value", raw, "tokens.css only"],
    ["Primitive", `--${tailwindStep(lightTokens.find((t) => t.name === "--color-accent")?.value)}`, "Brand"],
    ["Brand", "--brand-700", "Semantic tokens"],
    ["Semantic", "--color-accent", "Components"],
  ]
  return (
    <table className="vvd vvd-table">
      <thead><tr><th>Level</th><th>Example</th><th>Read by</th></tr></thead>
      <tbody>{rows.map(([level, example, reader]) => <tr key={level}><td>{level}</td><td><code>{example}</code></td><td>{reader}</td></tr>)}</tbody>
    </table>
  )
}

/** Semantic and Primitives, one view at a time. Both stay in the page, so the contents list
 *  knows every heading; the headings of the hidden view leave the list. */
export function ColorTabs({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState("semantic")
  const root = useRef<HTMLDivElement>(null)
  const [hide, setHide] = useState("")
  useEffect(() => {
    const ids = Array.from(root.current?.querySelectorAll(`[data-panel]:not([data-panel="${tab}"]) :is(h2, h3)`) ?? []).map((h) => h.id).filter(Boolean)
    setHide(ids.map((id) => `.toc-wrapper li:has(> a[href$="#${id}"])`).join(",") + (ids.length ? "{display:none}" : ""))
    window.scrollTo(0, 0)
  }, [tab])
  return (
    <div ref={root} className="vvd-color-tabs" data-tab={tab}>
      <style>{hide}</style>
      <div className="sb-unstyled vvd">
        <Tabs aria-label="Colour tokens" items={[{ id: "semantic", label: "Semantic" }, { id: "primitives", label: "Primitives" }]} value={tab} onChange={setTab} />
      </div>
      {children}
    </div>
  )
}

const CONTRAST_PAIRS: [string, string][] = [
  ["text-primary", "background-primary"],
  ["text-secondary", "background-primary"],
  ["text-accent", "background-primary"],
  ["text-danger", "background-primary"],
  ["text-success", "background-primary"],
  ["text-primary", "surface-raised"],
  ["text-secondary", "surface-raised"],
  ["text-primary", "surface-sunken"],
  ["text-secondary", "surface-sunken"],
  ["text-inverse", "surface-inverse"],
  ["text-on-accent", "accent"],
  ["text-on-accent-subtle", "accent-subtle"],
  ["text-primary", "button-secondary"],
  ["text-on-accent", "button-danger"],
  ...["neutral", "info", "success", "attention", "warning", "critical"].map((t): [string, string] => [`status-${t}-on-subtle`, `status-${t}-subtle`]),
  ...["info", "success", "attention", "warning", "critical"].map((t): [string, string] => [`status-${t}-on-strong`, `status-${t}-strong`]),
]

const luminance = (hex: string) => {
  const full = hex.length === 4 ? hex.replace(/[0-9a-f]/gi, "$&$&") : hex
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(full.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
const grade = (ratio: number) => (ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "Large text only" : "Fail")

function ContrastCell({ fg, bg }: { fg: string; bg: string }) {
  const ratio = contrast(fg, bg)
  return (
    <td>
      <span className="vvd-contrast">
        <span className="vvd-contrast__sample" style={{ color: fg, background: bg }} aria-hidden="true">Aa</span>
        <span className="mono">{ratio.toFixed(1)}:1</span>
        <span>{grade(ratio)}</span>
      </span>
    </td>
  )
}

/** Every text and ground the system pairs, measured from tokens.css. */
export function ContrastPairs() {
  const value = (name: string, dark: boolean) => rawValue((dark && darkValue(`--color-${name}`)) || lightTokens.find((t) => t.name === `--color-${name}`)?.value)
  return (
    <table className="vvd vvd-table vvd-contrast-table">
      <thead><tr><th>Text</th><th>On</th><th>Light</th><th>Dark</th></tr></thead>
      <tbody>
        {CONTRAST_PAIRS.map(([fg, bg]) => (
          <tr key={fg + bg}>
            <td><code className="vvd-name">{fg}</code></td>
            <td><code className="vvd-name">{bg}</code></td>
            <ContrastCell fg={value(fg, false)} bg={value(bg, false)} />
            <ContrastCell fg={value(fg, true)} bg={value(bg, true)} />
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/** Every ramp as one strip. Hover a step for its hex value. */
export function PrimitiveRamps({ only }: { only?: string[] }) {
  return (
    <div className="vvd vvd-ramps">
      <div className="vvd-ramp vvd-ramp--head" aria-hidden="true">
        <span />
        <div className="vvd-ramp__steps">{STEPS.map((s) => <span key={s}>{s}</span>)}</div>
      </div>
      {(only ?? RAMPS.filter((r) => r !== tailwindStep("var(--brand-50)")?.replace(/-\d+$/, ""))).map((r) => (
        <div key={r} className="vvd-ramp">
          <span className="vvd-ramp__name">
            {r}
            {r === "brand" && <small>{tailwindStep("var(--brand-50)")?.replace(/-\d+$/, "")}</small>}
          </span>
          <div className="vvd-ramp__steps">
            {STEPS.map((s) => {
              const v = lightTokens.find((t) => t.name === `--${r}-${s}`)?.value
              return <span key={s} className="vvd-ramp__chip" style={{ background: v }} title={`${r}-${s} ${rawValue(v)}`} />
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

/** The promise of the system, working: change the project tokens, see it fit. */
const BRANDS = ["violet", "blue", "emerald", "rose", "orange"]
const CORNERS: [string, string, string][] = [["Sharp", "2px", "4px"], ["Default", "8px", "12px"], ["Soft", "12px", "24px"]]
const FONTS: [string, string][] = [["Inter", "Inter, system-ui, sans-serif"], ["Mono", "var(--font-mono)"]]

export function ProjectTheme() {
  const [brand, setBrand] = useState("violet")
  const [corner, setCorner] = useState("Default")
  const [font, setFont] = useState("Inter")
  const c = CORNERS.find((x) => x[0] === corner)!
  const style: Record<string, string> = {
    "--corner-control": c[1],
    "--corner-surface": c[2],
    "--font-sans": FONTS.find((x) => x[0] === font)![1],
  }
  for (const s of STEPS) style[`--brand-${s}`] = `var(--${brand}-${s})`
  const code = `:root {\n  /* point the brand at the ${brand} ramp */\n${["500", "700", "800"].map((s) => `  --brand-${s}: var(--${brand}-${s});`).join("\n")}\n  /* …all eleven steps */\n\n  --corner-control: ${c[1]};\n  --corner-surface: ${c[2]};\n  --font-sans: ${font === "Inter" ? "Inter, sans-serif" : "JetBrains Mono, monospace"};\n}`
  return (
    <div className="vvd vvd-theme">
      <div className="vvd-theme__controls">
        <SegmentedControl aria-label="Brand ramp" size="sm" value={brand} onChange={setBrand} options={BRANDS.map((b) => ({ value: b, label: b[0].toUpperCase() + b.slice(1) }))} />
        <SegmentedControl aria-label="Corners" size="sm" value={corner} onChange={setCorner} options={CORNERS.map(([n]) => ({ value: n, label: n }))} />
        <SegmentedControl aria-label="Font" size="sm" value={font} onChange={setFont} options={FONTS.map(([n]) => ({ value: n, label: n }))} />
      </div>
      <div className="vv-project vvd-theme__stage" style={style as CSSProperties}>
        <div className="vvd-theme__row">
          <Button iconLeading={<Icon name="plus" size={16} />}>New shipment</Button>
          <Button variant="outlined">Export</Button>
          <Link href="#" onClick={(e) => e.preventDefault()}>View details</Link>
        </div>
        <Field label="Order number" placeholder="ORD-0000" hint="ORD followed by four digits" />
        <div className="vvd-theme__row">
          <Checkbox label="Notify the receiver" defaultChecked />
          <Switch label="Book immediately" defaultChecked size="sm" />
        </div>
        <Tabs aria-label="Shipments" value="active" onChange={() => {}} items={[{ id: "active", label: "In progress", counter: 12 }, { id: "done", label: "Completed" }]} />
        <ProgressBar value={60} label="Upload progress" />
      </div>
      <pre className="vvd-theme__code"><code>{code}</code></pre>
    </div>
  )
}

/* --- Typography --------------------------------------------------------- */

const TEXT_ROLES = [
  { name: "Heading XL", role: "heading-xl", size: "3xl", weight: "medium" },
  { name: "Heading L", role: "heading-lg", size: "xl", weight: "medium" },
  { name: "Heading M", role: "heading-md", size: "lg", weight: "semibold" },
  { name: "Heading S", role: "heading-sm", size: "base", weight: "semibold" },
  { name: "Body", role: "body", size: "sm", weight: "normal" },
  { name: "Label", role: "label", size: "sm", weight: "medium" },
  { name: "Label strong", role: "label-strong", size: "sm", weight: "semibold" },
  { name: "Caption", role: "caption", size: "xs", weight: "normal" },
  { name: "Caption strong", role: "caption-strong", size: "xs", weight: "medium" },
  { name: "Code", role: "code", size: "sm", weight: "normal" },
]

export function TypeScale({ sample = "The quick brown fox jumps over the lazy dog" }: { sample?: string }) {
  return (
    <div className="vvd vvd-type">
      {TEXT_ROLES.map((r) => {
        const size = lightTokens.find((t) => t.name === `--font-size-${r.size}`)?.value
        const lh = lightTokens.find((t) => t.name === `--line-height-${r.size}`)?.value
        return (
          <div key={r.role} className="vvd-type__row">
            <div className="vvd-type__meta">
              <b style={{ fontSize: "var(--font-size-sm)", fontWeight: 600 }}>{r.name}</b>
              <code>text-{r.role}</code>
              <span className="mono" style={{ color: "var(--color-text-secondary)" }}>{size} / {lh} · {r.weight}</span>
            </div>
            <p
              className="vvd-type__sample"
              style={{
                fontSize: `var(--text-${r.role}-size)`,
                lineHeight: `var(--text-${r.role}-line-height)`,
                fontWeight: `var(--text-${r.role}-weight)`,
                fontFamily: r.role === "code" ? "var(--text-code-family)" : undefined,
              }}
            >
              {sample}
            </p>
          </div>
        )
      })}
    </div>
  )
}

/** The three families, each set in itself. */
export function FontFamilies() {
  const rows: [string, string][] = [["--font-sans", "Everything in the interface"], ["--font-serif", "Available; the system does not use it"], ["--font-mono", "Code and token names"]]
  return (
    <div className="vvd vvd-type-rows">
      {rows.map(([name, use]) => (
        <div key={name} className="vvd-type-row">
          <div><code className="vvd-name">{name.replace(/^--/, "")}</code><small>{use}</small></div>
          <span style={{ fontFamily: `var(${name})`, fontSize: "var(--font-size-xl)", lineHeight: "var(--line-height-xl)" }}>The quick brown fox jumps over the lazy dog</span>
        </div>
      ))}
    </div>
  )
}

/** Sizes with the line height each one comes paired with. */
export function FontSizeScale() {
  return (
    <table className="vvd vvd-table">
      <thead><tr><th>Size</th><th>Value</th><th>Line height</th><th>Value</th></tr></thead>
      <tbody>
        {byPrefix("--font-size-").map((t) => {
          const step = t.name.replace("--font-size-", "")
          return (
            <tr key={t.name}>
              <td><code className="vvd-name">{t.name.replace(/^--/, "")}</code></td>
              <td><span className="mono">{t.value}</span></td>
              <td><code className="vvd-name">line-height-{step}</code></td>
              <td><span className="mono">{lightTokens.find((x) => x.name === `--line-height-${step}`)?.value}</span></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

/** Tailwind's letter spacing. */
export function TrackingScale() {
  return (
    <div className="vvd vvd-type-rows">
      {byPrefix("--tracking-").map((t) => (
        <div key={t.name} className="vvd-type-row">
          <div><code className="vvd-name">{t.name.replace(/^--/, "")}</code><small className="mono">{t.value}</small></div>
          <span style={{ letterSpacing: `var(${t.name})`, fontSize: "var(--font-size-lg)", lineHeight: "var(--line-height-lg)" }}>The quick brown fox jumps over the lazy dog</span>
        </div>
      ))}
    </div>
  )
}

export function WeightScale() {
  return (
    <div className="vvd vvd-tiles">
      {byPrefix("--font-weight-").map((t) => (
        <div key={t.name} className="vvd-tile">
          <span style={{ fontSize: "var(--font-size-4xl)", lineHeight: "var(--line-height-4xl)", fontWeight: `var(${t.name})` }}>Aa</span>
          <p><code className="vvd-name">{t.name.replace(/^--/, "")}</code><span className="mono" style={{ color: "var(--color-text-secondary)" }}>{t.value}</span></p>
        </div>
      ))}
    </div>
  )
}

/* --- Space, radius, elevation ------------------------------------------- */

export function SpaceScale() {
  return (
    <div className="vvd vvd-scale">
      {byPrefix("--space-").map((t) => (
        <div key={t.name} className="vvd-scale__row">
          <code className="vvd-name">{t.name.replace(/^--/, "")}</code>
          <span className="mono" style={{ color: "var(--color-text-secondary)" }}>{t.value}</span>
          <div className="vvd-scale__bar" style={{ width: `var(${t.name})` }} />
        </div>
      ))}
    </div>
  )
}

export function SizeScale() {
  return (
    <table className="vvd vvd-table">
      <thead><tr><th>Token</th><th>Value</th><th className="vvd-hide-sm">Preview</th></tr></thead>
      <tbody>
        {byPrefix("--size-").map((t) => (
          <tr key={t.name}>
            <td><code className="vvd-name">{t.name.replace(/^--/, "")}</code></td>
            <td><span className="mono">{t.value}</span></td>
            <td className="vvd-hide-sm">
              <div style={{ height: `var(${t.name})`, width: t.name.includes("avatar") ? `var(${t.name})` : 120, borderRadius: t.name.includes("avatar") ? "var(--radius-full)" : "var(--radius-lg)", background: "var(--color-surface-subtle)" }} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function RadiusScale() {
  return (
    <div className="vvd vvd-tiles">
      {byPrefix("--radius-").map((t) => (
        <div key={t.name} className="vvd-tile">
          <div className="vvd-tile__shape vvd-tile__shape--radius" style={{ borderRadius: `var(${t.name})`, width: t.name === "--radius-full" ? 96 : undefined }} />
          <p><code className="vvd-name">{t.name.replace(/^--/, "")}</code><span className="mono" style={{ color: "var(--color-text-secondary)" }}>{t.value}</span></p>
        </div>
      ))}
    </div>
  )
}

const BORDERS: { token: string; use: string; width?: number }[] = [
  { token: "--color-border-default", use: "Inputs, cards, dividers" },
  { token: "--color-border-hover", use: "An input under the pointer" },
  { token: "--color-border-disabled", use: "A disabled input" },
  { token: "--color-border-danger", use: "An invalid input" },
  { token: "--color-border-accent", use: "A selected row" },
  { token: "--color-border-focus", use: "Focus, on every control", width: 2 },
]

/** The border colours, each on a sample of what it outlines. */
export function BorderScale() {
  return (
    <div className="vvd vvd-tiles">
      {BORDERS.map((b) => (
        <div key={b.token} className="vvd-tile">
          <div className="vvd-tile__shape vvd-tile__shape--border" style={{ borderColor: `var(${b.token})`, borderWidth: b.width ?? 1 }} />
          <p><code className="vvd-name">{b.token.replace(/^--color-/, "")}</code><span style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-xs)" }}>{b.use}</span></p>
        </div>
      ))}
    </div>
  )
}

/** The two widths in use. */
export function BorderWidths() {
  return (
    <div className="vvd vvd-tiles">
      {[{ width: 1, use: "Every outline and divider" }, { width: 2, use: "Focus, checked and current" }].map((w) => (
        <div key={w.width} className="vvd-tile">
          <div className="vvd-tile__shape vvd-tile__shape--border" style={{ borderColor: "var(--color-text-primary)", borderWidth: w.width }} />
          <p><code className="vvd-name">{w.width}px</code><span style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-xs)" }}>{w.use}</span></p>
        </div>
      ))}
    </div>
  )
}

const SHADOW_USE: Record<string, string> = {
  "--shadow-sm": "Resting cards, inputs on tinted ground",
  "--shadow-md": "Menus, popovers, tooltips",
  "--shadow-lg": "Toasts, floating panels",
  "--shadow-xl": "Modals and drawers",
}

export function ShadowScale() {
  return (
    <div className="vvd vvd-tiles vvd-tiles--shadow" style={{ padding: "var(--space-16)", borderRadius: "var(--radius-xl)" }}>
      {byPrefix("--shadow-").map((t) => (
        <div key={t.name} className="vvd-tile">
          <div className="vvd-tile__shape vvd-tile__shape--shadow" style={{ boxShadow: `var(${t.name})` }} />
          <p>
            <code className="vvd-name">{t.name.replace(/^--/, "")}</code>
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>{SHADOW_USE[t.name]}</span>
          </p>
        </div>
      ))}
    </div>
  )
}

/* --- Motion --------------------------------------------------------------- */

function MotionTrack({ name, value, on, easing }: { name: string; value: string; on: boolean; easing?: string }) {
  return (
    <div className="vvd-motion-row">
      <p><code className="vvd-name">{name}</code><small className="mono">{value}</small></p>
      <div className="vvd-motion-track">
        <span className="vvd-motion-dot" data-on={on || undefined} style={{ transitionDuration: value, transitionTimingFunction: easing ?? "var(--ease-out)" }} />
      </div>
    </div>
  )
}

function usePlay(): [boolean, () => void, string] {
  const [on, setOn] = useState(false)
  return [on, () => setOn(!on), on ? "Play back" : "Play"]
}

/** Each duration running the same distance, started together. */
export function MotionSpeeds() {
  const [on, play, label] = usePlay()
  const rows = ["--duration-fast", "--duration-moderate", "--duration-spin", "--duration-shimmer"]
  return (
    <div className="vvd vvd-motion">
      {rows.map((n) => <MotionTrack key={n} name={n.replace(/^--/, "")} value={lightTokens.find((t) => t.name === n)?.value ?? ""} on={on} />)}
      <div><Button variant="outlined" onClick={play}>{label}</Button></div>
    </div>
  )
}

/** The one curve, drawn, and racing a straight line over the same time. */
export function MotionEase() {
  const [on, play, label] = usePlay()
  const time = lightTokens.find((t) => t.name === "--duration-shimmer")?.value ?? ""
  return (
    <div className="vvd vvd-motion vvd-motion--ease">
      <svg className="vvd-motion-curve" viewBox="-4 -4 108 108" role="img" aria-label="The ease-out curve: a fast start that settles slowly">
        <path d="M0 100H100M0 100V0" className="vvd-motion-axis" fill="none" />
        <path d="M0 100C20 100 0 0 100 0" className="vvd-motion-line" fill="none" />
      </svg>
      <div className="vvd-motion-race">
        <MotionTrack name="ease-out" value={time} on={on} />
        <MotionTrack name="linear" value={time} on={on} easing="linear" />
        <div><Button variant="outlined" onClick={play}>{label}</Button></div>
      </div>
    </div>
  )
}

/** The durations where they are really used. */
export function MotionInUse() {
  const [open, setOpen] = useState(false)
  return (
    <div className="vvd vvd-tiles vvd-motion-use">
      <div className="vvd-tile">
        <div className="vvd-motion-stage"><Button>Hover me</Button></div>
        <p><code className="vvd-name">duration-fast</code><span>Hover and press</span></p>
      </div>
      <div className="vvd-tile">
        <div className="vvd-motion-stage">
          <Button variant="outlined" onClick={() => setOpen(!open)}>{open ? "Close" : "Open"}</Button>
          <span className="vvd-motion-pop" data-open={open || undefined}>Menu</span>
        </div>
        <p><code className="vvd-name">duration-moderate</code><span>Menus, tooltips, toasts</span></p>
      </div>
      <div className="vvd-tile">
        <div className="vvd-motion-stage"><Spinner label="Spinner example" /></div>
        <p><code className="vvd-name">duration-spin</code><span>A spinner turning</span></p>
      </div>
      <div className="vvd-tile">
        <div className="vvd-motion-stage vvd-motion-stage--wide"><Skeleton lines={2} /></div>
        <p><code className="vvd-name">duration-shimmer</code><span>A skeleton loading</span></p>
      </div>
    </div>
  )
}

export function TokenList({ prefix }: { prefix: string }) {
  return (
    <table className="vvd vvd-table">
      <thead><tr><th>Token</th><th>Value</th></tr></thead>
      <tbody>
        {byPrefix(prefix).map((t) => (
          <tr key={t.name}><td><code className="vvd-name">{t.name.replace(/^--/, "")}</code></td><td><span className="mono">{primitiveOf(t.value) ? `${primitiveOf(t.value)}, ${rawValue(t.value)}` : t.value}</span></td></tr>
        ))}
      </tbody>
    </table>
  )
}

/* --- Icons -------------------------------------------------------------- */

export function IconGallery() {
  const [q, setQ] = useState("")
  const [size, setSize] = useState<16 | 20 | 24>(24)
  const [open, setOpen] = useState<IconName | null>(null)
  const [stuck, setStuck] = useState(false)
  const sentinel = useRef<HTMLDivElement>(null)
  // The toolbar's line appears only once the page has scrolled past where it sits.
  useEffect(() => {
    if (!sentinel.current) return
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(sentinel.current)
    return () => io.disconnect()
  }, [])
  const names = (Object.keys(ICONS) as IconName[]).filter((n) => n.includes(q.trim().toLowerCase()))
  return (
    <div className="vvd">
      <div ref={sentinel} aria-hidden="true" />
      <div className="vvd-icons-tools" data-stuck={stuck || undefined}>
        <div style={{ width: 280 }}>
          <Input
            aria-label="Search icons"
            placeholder={`Search ${Object.keys(ICONS).length} icons`}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            iconLeading={<Icon name="search" size={16} />}
            size="sm"
          />
        </div>
        <div role="radiogroup" aria-label="Icon size" style={{ display: "flex", gap: 4 }}>
          {([16, 20, 24] as const).map((s) => (
            <button
              key={s}
              role="radio"
              aria-checked={size === s}
              onClick={() => setSize(s)}
              className="vvd-icon"
              style={{ height: 32, width: 48, flexDirection: "row", border: `1px solid var(${size === s ? "--color-accent" : "--color-border-default"})`, borderRadius: "var(--radius-lg)", background: size === s ? "var(--color-accent-subtle)" : undefined, color: size === s ? "var(--color-text-on-accent-subtle)" : undefined }}
            >
              {s}
            </button>
          ))}
        </div>
        <span className="vvd-hide-sm" style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>Click an icon for its details</span>
      </div>
      <div className="vvd-icons">
        {names.map((n) => (
          <button
            key={n}
            className="vvd-icon"
            aria-haspopup="dialog"
            onClick={() => setOpen(n)}
          >
            <Icon name={n} size={size} />
            <span>{n}</span>
          </button>
        ))}
      </div>
      <IconDetails name={open} initialSize={size} onPick={setOpen} onClose={() => setOpen(null)} />
      {names.length === 0 && <p style={{ color: "var(--color-text-secondary)" }}>No icon matches “{q}”.</p>}
    </div>
  )
}

/* --- Misc --------------------------------------------------------------- */

export function Rules({ items }: { items: { kind: "do" | "dont"; title: string; text: string }[] }) {
  return (
    <div className="vvd vvd-rules">
      {items.map((r, i) => (
        <div key={i} className={`vvd-rule vvd-rule--${r.kind}`}>
          <b>{r.kind === "do" ? "Do" : "Don’t"} — {r.title}</b>
          <p>{r.text}</p>
        </div>
      ))}
    </div>
  )
}


/* --- Grids --------------------------------------------------------------- */

const LAYOUTS = [
  { name: "Desktop", width: 1280, key: "desktop" },
  { name: "Tablet", width: 768, key: "tablet" },
  { name: "Phone", width: 375, key: "phone" },
]

export function GridLayouts() {
  const v = (n: string) => lightTokens.find((t) => t.name === n)?.value ?? ""
  return (
    <div className="vvd vvd-grids">
      {LAYOUTS.map((l) => {
        const cols = Number(v(`--grid-${l.key}-columns`))
        const gutter = parseFloat(v(`--grid-${l.key}-gutter`))
        const margin = parseFloat(v(`--grid-${l.key}-margin`))
        return (
          <figure key={l.key} className="vvd-grid">
            <div className="vvd-grid__frame" style={{ aspectRatio: `${l.width} / ${l.key === "phone" ? 520 : 400}`, maxWidth: l.key === "desktop" ? "100%" : l.key === "tablet" ? "62%" : "32%" }}>
              <div className="vvd-grid__cols" style={{ padding: `0 ${(margin / l.width) * 100}%`, gap: `${(gutter / l.width) * 100}%` }}>
                {Array.from({ length: cols }, (_, i) => <span key={i} />)}
              </div>
            </div>
            <figcaption>
              <b>{l.name} · {l.width}px</b>
              <span className="mono">{cols} columns · gutter {gutter}px · margin {margin}px</span>
            </figcaption>
          </figure>
        )
      })}
      <figure className="vvd-grid">
        <div className="vvd-grid__nested">
          {[12, 6, 5, 3, 2].map((n) => (
            <div key={n} className="vvd-grid__cols vvd-grid__cols--row" style={{ gap: 8 }}>
              {Array.from({ length: n }, (_, i) => <span key={i} />)}
            </div>
          ))}
        </div>
        <figcaption>
          <b>Content grids</b>
          <span className="mono">12, 6, 5, 3 and 2 columns (auto) · gutter 32px</span>
        </figcaption>
      </figure>
    </div>
  )
}
