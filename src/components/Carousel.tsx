import { useRef, useState, type ReactNode } from "react"
import { Icon } from "./Icon.js"
import { IconButton } from "./IconButton.js"
import "./Carousel.css"

export type CarouselProps = {
  /** Names the carousel: what the slides show. */
  label: string
  slides: ReactNode[]
}

/** A row of slides moved by arrows, or by swiping. It never moves on its own. */
export function Carousel({ label, slides }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const track = useRef<HTMLDivElement>(null)

  const go = (i: number) => {
    const el = track.current?.children[i] as HTMLElement | undefined
    if (!el || !track.current) return
    track.current.scrollTo({ left: el.offsetLeft - track.current.offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
    setIndex(i)
  }

  const onScroll = () => {
    const t = track.current
    if (t) setIndex(Math.round(t.scrollLeft / Math.max(1, t.clientWidth)))
  }

  return (
    <section aria-roledescription="carousel" aria-label={label} className="vv-carousel">
      <div ref={track} className="vv-carousel__track" tabIndex={0} role="group" aria-label="Slides" onScroll={onScroll}>
        {slides.map((s, i) => (
          <div key={i} className="vv-carousel__slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>{s}</div>
        ))}
      </div>
      <div className="vv-carousel__nav">
        <IconButton variant="outlined" size="sm" label="Previous slide" icon={<Icon name="arrow-left" size={16} />} disabled={index === 0} onClick={() => go(index - 1)} />
        <span className="vv-carousel__count" aria-live="polite">{index + 1} of {slides.length}</span>
        <IconButton variant="outlined" size="sm" label="Next slide" icon={<Icon name="arrow-right" size={16} />} disabled={index === slides.length - 1} onClick={() => go(index + 1)} />
      </div>
    </section>
  )
}
