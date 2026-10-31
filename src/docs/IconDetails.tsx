/* What opens when an icon in the library is clicked: everything about it, and
   the ways to take it. */
import { useEffect, useState } from "react"
import { ICONS, type IconName } from "../icons/icons.js"
import { Button } from "../components/Button.js"
import { CodeBlock } from "../components/CodeBlock.js"
import { DescriptionList } from "../components/DescriptionList.js"
import { Icon } from "../components/Icon.js"
import { IconButton } from "../components/IconButton.js"
import { Link } from "../components/Link.js"
import { Modal } from "../components/Modal.js"

const isLucide = (name: IconName) => ICONS[name].includes('scale(0.83333)')

type Size = 16 | 20 | 24
type Usage = "icon" | "button" | "outlined" | "iconButton"

const svgOf = (name: IconName, size: Size) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 20 20" fill="none">${ICONS[name]}</svg>`

/** The code for what is selected. 20 is the default size, so it is left out. */
function codeOf(name: IconName, size: Size, usage: Usage) {
  const icon = `<Icon name="${name}"${size === 20 ? "" : ` size={${size}}`} />`
  if (usage === "button") return `<Button iconLeading={${icon}}>Book shipment</Button>`
  if (usage === "outlined") return `<Button variant="outlined" iconLeading={${icon}}>Export</Button>`
  if (usage === "iconButton") return `<IconButton variant="outlined" label="Name the action" icon={${icon}} />`
  return `${icon}\n<Icon name="${name}"${size === 20 ? "" : ` size={${size}}`} label="Name it when it stands alone" />`
}

/** Its family: the icons that share the first word of its name. */
function relatedTo(name: IconName) {
  const family = name.split("-")[0]
  return (Object.keys(ICONS) as IconName[]).filter((n) => n !== name && (n === family || n.startsWith(`${family}-`))).slice(0, 12)
}

export function IconDetails({ name, onPick, onClose }: { name: IconName | null; onPick: (name: IconName) => void; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const [size, setSize] = useState<Size>(20)
  const [usage, setUsage] = useState<Usage>("icon")
  useEffect(() => setCopied(false), [name, size])
  if (!name) return null

  const copySvg = () => {
    navigator.clipboard?.writeText(svgOf(name, size)).then(() => setCopied(true)).catch(() => {})
  }
  const download = () => {
    const url = URL.createObjectURL(new Blob([svgOf(name, size)], { type: "image/svg+xml" }))
    const a = document.createElement("a")
    a.href = url
    a.download = `${name}-${size}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }
  const related = relatedTo(name)
  const lucide = isLucide(name)
  const pick = (u: Usage) => setUsage(usage === u ? "icon" : u)

  return (
    <Modal
      open
      size="large"
      title={name}
      onClose={onClose}
      headerActions={<IconButton variant="ghost" size="sm" label="Close details" icon={<Icon name="close" size={16} />} onClick={onClose} />}
      footer={
        <>
          <Button variant="outlined" onClick={copySvg}>{copied ? "SVG copied" : "Copy SVG"}</Button>
          <Button variant="outlined" onClick={download}>Download SVG</Button>
        </>
      }
    >
      <div className="vvd-icon-card">
        <div className="vvd-icon-card__top">
          <div className="vvd-icon-card__preview">
            <svg width="96" height="96" viewBox="0 0 20 20" fill="none" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[name] }} />
          </div>
          <DescriptionList
            items={[
              { term: "Source", description: lucide ? <Link href="https://lucide.dev" target="_blank">Lucide</Link> : "VV Foundations" },
              { term: "Licence", description: lucide ? "ISC, free for any use" : "Part of this system" },
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
                <Icon name={name} size={s} />
                <small>{s}px</small>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 id="vvd-icon-usage">In use</h3>
          <div className="vvd-icon-card__row" role="group" aria-labelledby="vvd-icon-usage">
            <span className="vvd-icon-card__use" data-on={usage === "button" || undefined}>
              <Button aria-pressed={usage === "button"} iconLeading={<Icon name={name} size={size} />} onClick={() => pick("button")}>Book shipment</Button>
            </span>
            <span className="vvd-icon-card__use" data-on={usage === "outlined" || undefined}>
              <Button variant="outlined" aria-pressed={usage === "outlined"} iconLeading={<Icon name={name} size={size} />} onClick={() => pick("outlined")}>Export</Button>
            </span>
            <span className="vvd-icon-card__use" data-on={usage === "iconButton" || undefined}>
              <IconButton variant="outlined" aria-pressed={usage === "iconButton"} label="Icon button" icon={<Icon name={name} size={size} />} onClick={() => pick("iconButton")} />
            </span>
          </div>
        </section>

        <section>
          <h3>Code</h3>
          <div aria-live="polite">
            <CodeBlock title="React" code={codeOf(name, size, usage)} />
          </div>
        </section>

        {related.length > 0 && (
          <section>
            <h3>Related</h3>
            <div className="vvd-icon-card__related">
              {related.map((n) => (
                <button key={n} type="button" aria-label={n} title={n} onClick={() => onPick(n)}><Icon name={n} /></button>
              ))}
            </div>
          </section>
        )}
      </div>
    </Modal>
  )
}
