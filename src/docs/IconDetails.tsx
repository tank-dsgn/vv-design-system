/* What opens when an icon in the library is clicked: everything about it, and
   the ways to take it. */
import { useEffect, useState } from "react"
import { ICONS, ICONS_FILLED, type IconName } from "../icons/icons.js"
import { Button } from "../components/Button.js"
import { CodeBlock } from "../components/CodeBlock.js"
import { DescriptionList } from "../components/DescriptionList.js"
import { Icon } from "../components/Icon.js"
import { IconButton } from "../components/IconButton.js"
import { Link } from "../components/Link.js"
import { Modal } from "../components/Modal.js"

type Size = 16 | 20 | 24
type Usage = "icon" | "button" | "outlined" | "iconButton"

const pathsOf = (name: IconName, filled: boolean) => (filled && ICONS_FILLED[name]) || ICONS[name]
const svgOf = (name: IconName, size: Size, filled: boolean) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">${pathsOf(name, filled)}</svg>`

/** The code for what is selected. 20 and the outlined style are the defaults, so they are left out. */
function codeOf(name: IconName, size: Size, usage: Usage, filled: boolean) {
  const props = `${size === 20 ? "" : ` size={${size}}`}${filled ? " filled" : ""}`
  const icon = `<Icon name="${name}"${props} />`
  if (usage === "button") return `<Button iconLeading={${icon}}>Book shipment</Button>`
  if (usage === "outlined") return `<Button variant="outlined" iconLeading={${icon}}>Export</Button>`
  if (usage === "iconButton") return `<IconButton variant="outlined" label="Name the action" icon={${icon}} />`
  return `${icon}\n<Icon name="${name}"${props} label="Name it when it stands alone" />`
}

/** Its family: the icons that share the first word of its name. */
function relatedTo(name: IconName) {
  const family = name.split("-")[0]
  return (Object.keys(ICONS) as IconName[]).filter((n) => n !== name && (n === family || n.startsWith(`${family}-`))).slice(0, 12)
}

export function IconDetails({ name, initialSize = 20, filled = false, onPick, onClose }: { name: IconName | null; initialSize?: Size; filled?: boolean; onPick: (name: IconName) => void; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const [size, setSize] = useState<Size>(initialSize)
  // Opens at the size chosen in the library; moving to a related icon keeps the one picked here.
  const isOpen = name !== null
  useEffect(() => { if (isOpen) setSize(initialSize) }, [isOpen, initialSize])
  const [usage, setUsage] = useState<Usage>("icon")
  useEffect(() => setCopied(false), [name, size])
  if (!name) return null

  const copySvg = () => {
    navigator.clipboard?.writeText(svgOf(name, size, filled)).then(() => { setCopied(true); window.setTimeout(() => setCopied(false), 2000) }).catch(() => {})
  }
  const download = () => {
    const url = URL.createObjectURL(new Blob([svgOf(name, size, filled)], { type: "image/svg+xml" }))
    const a = document.createElement("a")
    a.href = url
    a.download = `${name}${filled ? "-filled" : ""}-${size}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }
  const related = relatedTo(name)
  const pick = (u: Usage) => setUsage(usage === u ? "icon" : u)

  return (
    <Modal
      open
      size="lg"
      title={name}
      onClose={onClose}
      headerActions={<IconButton variant="ghost" size="sm" label="Close details" icon={<Icon name="close" size={16} />} onClick={onClose} />}
      footer={
        <>
          <Button variant={copied ? "primary" : "outlined"} onClick={copySvg}>{copied ? "SVG copied" : "Copy SVG"}</Button>
          <Button variant="outlined" onClick={download}>Download SVG</Button>
        </>
      }
    >
      <div className="vvd-icon-card">
        <div className="vvd-icon-card__top">
          <div className="vvd-icon-card__preview">
            <svg width="96" height="96" viewBox="0 0 20 20" fill="none" aria-hidden="true" dangerouslySetInnerHTML={{ __html: pathsOf(name, filled) }} />
          </div>
          <DescriptionList
            items={[
              { term: "Source", description: <Link href="https://phosphoricons.com" target="_blank">Phosphor</Link> },
              { term: "Licence", description: "MIT, free for any use" },
              { term: "Style", description: "Outlined and Filled" },
              { term: "Grid", description: "20px" },
              { term: "Colour", description: "Takes the colour of the text next to it" },
            ]}
          />
        </div>

        <section>
          <h3 id="vvd-icon-sizes">Size</h3>
          <div className="vvd-icon-card__row" role="group" aria-labelledby="vvd-icon-sizes">
            {([16, 20, 24] as const).map((s) => (
              <button key={s} type="button" className="vvd-icon-card__size" aria-pressed={size === s} onClick={() => setSize(s)}>
                <Icon name={name} size={s} filled={filled} />
                <small>{s}px</small>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 id="vvd-icon-usage">In use</h3>
          <div className="vvd-icon-card__row" role="group" aria-labelledby="vvd-icon-usage">
            <span className="vvd-icon-card__use" data-on={usage === "button" || undefined}>
              <Button aria-pressed={usage === "button"} iconLeading={<Icon name={name} size={size} filled={filled} />} onClick={() => pick("button")}>Book shipment</Button>
            </span>
            <span className="vvd-icon-card__use" data-on={usage === "outlined" || undefined}>
              <Button variant="outlined" aria-pressed={usage === "outlined"} iconLeading={<Icon name={name} size={size} filled={filled} />} onClick={() => pick("outlined")}>Export</Button>
            </span>
            <span className="vvd-icon-card__use" data-on={usage === "iconButton" || undefined}>
              <IconButton variant="outlined" aria-pressed={usage === "iconButton"} label="Icon button" icon={<Icon name={name} size={size} filled={filled} />} onClick={() => pick("iconButton")} />
            </span>
          </div>
        </section>

        <section>
          <h3>Code</h3>
          <div aria-live="polite">
            <CodeBlock title="React" code={codeOf(name, size, usage, filled)} />
          </div>
        </section>

        {related.length > 0 && (
          <section>
            <h3>Related</h3>
            <div className="vvd-icon-card__related">
              {related.map((n) => (
                <button key={n} type="button" aria-label={n} title={n} onClick={() => onPick(n)}><Icon name={n} filled={filled} /></button>
              ))}
            </div>
          </section>
        )}
      </div>
    </Modal>
  )
}
