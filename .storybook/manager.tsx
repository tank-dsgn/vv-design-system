import * as React from "react"
import { flushSync } from "react-dom"
import { createRoot } from "react-dom/client"
import { addons, type API } from "storybook/manager-api"
import { MobileMenu, PanelButton } from "./mobile-menu"
import { navLabel } from "./nav-icons"
import { Rail } from "./rail"
import { mountSearch } from "./search"
import { vvTheme, vvThemeDark } from "./theme"

/* The site header. Storybook has no slot above its layout, so it mounts its own
   React root; manager-head.html moves Storybook down by the header's height.

   The header owns three things: which section is open (the sidebar shows only
   that section), the theme, and whether the sidebar and toolbar show at all. */

addons.setConfig({
  theme: vvTheme,
  sidebar: { showRoots: true, renderLabel: navLabel },
  enableShortcuts: false,
})

type Section = "foundations" | "components"

const HOME = "/docs/foundations-tokens--docs"
const LINKS: { id: Section; label: string; to: string }[] = [
  { id: "foundations", label: "Foundations", to: HOME },
  { id: "components", label: "Components", to: "/docs/components-button--docs" },
]

const sectionOf = (path = ""): Section => (path.includes("/components-") ? "components" : "foundations")

const KEY = "vv-theme"
const readTheme = () => {
  try { return localStorage.getItem(KEY) } catch { return null }
}

const Sun = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
    <circle cx="8" cy="8" r="3" />
    <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1" />
  </svg>
)
const Moon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13.5 9.6A5.5 5.5 0 1 1 6.4 2.5a4.5 4.5 0 0 0 7.1 7.1Z" />
  </svg>
)

/** Gives every preview, nested ones too, the theme at once instead of waiting for the storage event. */
function applyToPreviews(dark: boolean, doc: Document = document) {
  doc.querySelectorAll("iframe").forEach((frame) => {
    try {
      const win = frame.contentWindow as (Window & { vvApplyTheme?: (dark: boolean) => void }) | null
      win?.vvApplyTheme?.(dark)
      if (frame.contentDocument) applyToPreviews(dark, frame.contentDocument)
    } catch { /* a frame from another origin keeps its own theme */ }
  })
}

// WebKit, which is every browser on an iPhone, snapshots the page for a view transition without
// the preview inside it, so the fade shows the preview change on its own. There the theme swaps at once.
const webkit = /AppleWebKit/.test(navigator.userAgent) && !/Chrome\/|Chromium|Edg\//.test(navigator.userAgent)

function Header({ api }: { api: API }) {
  const [path, setPath] = React.useState(() => api.getUrlState().path)
  const [dark, setDark] = React.useState(readTheme() === "dark")
  const [drawer, setDrawer] = React.useState(false)
  const closeDrawer = React.useCallback(() => setDrawer(false), [])
  const section = sectionOf(path)
  // The page's name from the index, by the id in the address. The index may arrive after the first
  // render, so every navigation event renders again.
  const [, rerender] = React.useReducer((n: number) => n + 1, 0)
  const entries = (api.getIndex() as unknown as { entries?: Record<string, { title?: string }> } | undefined)?.entries
  const page = entries?.[path?.split("/").pop() ?? ""]?.title?.split("/").pop()

  // Follow navigation from anywhere: the sidebar, links inside a page, Back.
  React.useEffect(() => {
    const sync = () => { setPath(api.getUrlState().path); rerender() }
    const channel = addons.getChannel()
    const events = ["storyChanged", "storyRendered", "docsRendered", "storySpecified", "setCurrentStory"]
    events.forEach((e) => channel.on(e, sync))
    window.addEventListener("popstate", sync)
    return () => {
      events.forEach((e) => channel.off(e, sync))
      window.removeEventListener("popstate", sync)
    }
  }, [api])

  // manager-head.html reads this: the sidebar shows only the open section.
  React.useEffect(() => {
    document.documentElement.dataset.vvSection = section
  }, [section])

  React.useEffect(() => {
    document.documentElement.dataset.vvView = path?.startsWith("/story/") ? "story" : "docs"
  }, [path])

  // The preview follows on its own: it listens for the saved choice (preview.tsx).
  React.useEffect(() => {
    document.documentElement.dataset.vvTheme = dark ? "dark" : "light"
    api.setOptions({ theme: dark ? vvThemeDark : vvTheme })
  }, [api, dark])

  const go = (e: React.MouseEvent, to: string) => {
    if (e.metaKey || e.ctrlKey) return
    e.preventDefault()
    api.navigate(to)
    setPath(to)
  }
  const label = dark ? "Switch to light theme" : "Switch to dark theme"
  const setTheme = (next: boolean) => {
    try { localStorage.setItem(KEY, next ? "dark" : "light") } catch { /* the choice just won't persist */ }
    const apply = () => {
      flushSync(() => setDark(next))
      applyToPreviews(next)
    }
    // The old picture holds until the whole window has the new theme, then fades over.
    if (!document.startViewTransition || webkit) apply()
    else document.startViewTransition(apply)
  }

  return (
    <header className="vv-header">
      {/* A phone says where you are under the header. */}
      <p className="vv-header__crumbs">
        {LINKS.find((l) => l.id === section)?.label}
        {page && <><span aria-hidden="true"> • </span><b>{page}</b></>}
      </p>
      <a className="vv-header__logo" href={`./?path=${HOME}`} aria-label="VV Design System, home" onClick={(e) => go(e, HOME)}>
        <span aria-hidden="true">VV</span>
        <small aria-hidden="true">Design System</small>
      </a>
      <nav className="vv-header__nav" aria-label="Sections">
        {LINKS.map((l) => (
          <a key={l.id} href={`./?path=${l.to}`} aria-current={section === l.id ? "page" : undefined} onClick={(e) => go(e, l.to)}>
            <span className="vv-header__label" data-label={l.label}>{l.label}</span>
          </a>
        ))}
      </nav>
      <button
        type="button"
        className="vv-header__theme"
        aria-label={label}
        title={label}
        onClick={() => setTheme(!dark)}
      >
        {dark ? <Sun /> : <Moon />}
      </button>
      <PanelButton open={drawer} onClick={() => setDrawer(!drawer)} />
      <MobileMenu api={api} open={drawer} path={path} section={section} onClose={closeDrawer} sections={LINKS} />
      <Rail api={api} section={section} path={path} />
    </header>
  )
}

addons.register("vv/header", (api) => {
  const host = document.createElement("div")
  host.id = "vv-header"
  document.body.prepend(host)
  createRoot(host).render(<Header api={api} />)
  addons.getChannel().on("vv/navigate", (path: string) => api.navigate(path))
  mountSearch(api)
  // Restores the sidebar for anyone whose saved layout has it dragged away.
  ;(api as unknown as { setSizes: (s: { navSize: number }) => void }).setSizes({ navSize: 300 })
})
