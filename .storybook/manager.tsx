import * as React from "react"
import { createRoot } from "react-dom/client"
import { addons, type API } from "storybook/manager-api"
import { Burger, MobileMenu } from "./mobile-menu"
import { Rail } from "./rail"
import { mountSearch } from "./search"
import { vvTheme, vvThemeDark } from "./theme"

/* The site header. Storybook has no slot above its layout, so it mounts its own
   React root; manager-head.html moves Storybook down by the header's height.

   The header owns three things: which section is open (the sidebar shows only
   that section), the theme, and whether the sidebar and toolbar show at all. */

addons.setConfig({
  theme: vvTheme,
  sidebar: { showRoots: true },
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

function Header({ api }: { api: API }) {
  const [path, setPath] = React.useState(() => api.getUrlState().path)
  const [dark, setDark] = React.useState(readTheme() === "dark")
  const [drawer, setDrawer] = React.useState(false)
  const closeDrawer = React.useCallback(() => setDrawer(false), [])
  const section = sectionOf(path)

  // Follow navigation from anywhere: the sidebar, links inside a page, Back.
  React.useEffect(() => {
    const sync = () => setPath(api.getUrlState().path)
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

  // Theme: the saved choice wins, re-applied when globals arrive, because an
  // update sent before the preview is ready gets overwritten by its defaults.
  React.useEffect(() => {
    const theme = dark ? "dark" : "light"
    document.documentElement.dataset.vvTheme = theme
    api.setOptions({ theme: dark ? vvThemeDark : vvTheme })
    const channel = addons.getChannel()
    const apply = (e?: { globals?: { theme?: string } }) => {
      if (e?.globals?.theme !== theme) channel.emit("updateGlobals", { globals: { theme } })
    }
    apply()
    channel.on("setGlobals", apply)
    channel.on("globalsUpdated", apply)
    return () => {
      channel.off("setGlobals", apply)
      channel.off("globalsUpdated", apply)
    }
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
    setDark(next)
  }

  return (
    <header className="vv-header">
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
      <Burger open={drawer} onClick={() => setDrawer(!drawer)} />
      <MobileMenu api={api} open={drawer} path={path} section={section} dark={dark} onTheme={setTheme} onClose={closeDrawer} sections={LINKS} />
      <Rail api={api} section={section} path={path} />
    </header>
  )
}

addons.register("vv/header", (api) => {
  const host = document.createElement("div")
  host.id = "vv-header"
  document.body.prepend(host)
  createRoot(host).render(<Header api={api} />)
  mountSearch(api)
  // Restores the sidebar for anyone whose saved layout has it dragged away.
  ;(api as unknown as { setSizes: (s: { navSize: number }) => void }).setSizes({ navSize: 300 })
})
