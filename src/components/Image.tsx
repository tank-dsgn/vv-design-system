import { useState, type ReactNode } from "react"
import { Icon } from "./Icon.js"
import "./Image.css"

export type ImageProps = {
  src: string
  /** Describes the image. Pass "" only when it is decoration. */
  alt: string
  /** Width / height, e.g. "16 / 9". The box keeps its shape while loading. */
  ratio?: string
  fit?: "cover" | "contain"
  radius?: "none" | "md" | "lg"
  caption?: ReactNode
}

/** A content image that holds its shape while loading and shows a calm
 *  fallback if it fails, instead of a broken-image icon. */
export function Image({ src, alt, ratio = "16 / 9", fit = "cover", radius = "md", caption }: ImageProps) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const box = (
    <div className={`vv-image vv-image--r-${radius}`} style={{ aspectRatio: ratio }} data-loaded={loaded || undefined}>
      {failed ? (
        <div className="vv-image__fallback" role={alt ? "img" : undefined} aria-label={alt || undefined}>
          <Icon name="image" size={24} />
        </div>
      ) : (
        <img src={src} alt={alt} loading="lazy" style={{ objectFit: fit }} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
      )}
    </div>
  )
  return caption ? (
    <figure className="vv-image__figure">
      {box}
      <figcaption>{caption}</figcaption>
    </figure>
  ) : box
}
