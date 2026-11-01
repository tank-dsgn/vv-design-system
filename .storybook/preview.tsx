import * as React from "react"
import type { Preview } from "@storybook/react-vite"
import { vvTheme, vvThemeDark } from "./theme"
import { DocsPage } from "./DocsPage"
import { DocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks"
import "../src/styles/tokens.css"
import "../src/docs/docs.css"

// Links in examples are samples: they show a link and go nowhere. The page's table of contents
// listens on document for link clicks and fails on these, so they stop just below it.
const sampleLink = (e: Event) => {
  const link = (e.target as Element).closest?.("a[href]")
  return Boolean(link && (link.getAttribute("href") === "#" || link.closest("#storybook-root, .docs-story")))
}
document.addEventListener("click", (e) => { if (sampleLink(e)) e.preventDefault() }, true)
document.documentElement.addEventListener("click", (e) => { if (sampleLink(e)) e.stopPropagation() })

/* The theme lives outside Storybook's globals: changing a global re-renders the docs, which
   reloads every example on the page and shows its loading screen. The header saves the choice;
   every preview, nested ones too, hears it through the storage event and only swaps the class. */
function savedTheme() {
  try { return localStorage.getItem("vv-theme") } catch { return null }
}

const theme = {
  dark: savedTheme() ? savedTheme() === "dark" : new URLSearchParams(location.search).get("globals")?.includes("theme:dark") ?? false,
  listeners: new Set<() => void>(),
}

window.addEventListener("storage", (e) => {
  if (e.key !== "vv-theme") return
  theme.dark = e.newValue === "dark"
  document.documentElement.classList.toggle("dark", theme.dark)
  theme.listeners.forEach((l) => l())
})

function subscribeToTheme(listener: () => void) {
  theme.listeners.add(listener)
  return () => {
    theme.listeners.delete(listener)
  }
}

/** The contents list is headed by the page it belongs to. */
function PageName() {
  const id = new URLSearchParams(location.search).get("id")
  const index = (window as unknown as { __STORYBOOK_PREVIEW__?: { storyStoreValue?: { storyIndex?: { entries: Record<string, { title: string }> } } } }).__STORYBOOK_PREVIEW__
  const title = id ? index?.storyStoreValue?.storyIndex?.entries[id]?.title : undefined
  return <>{title?.split("/").pop() ?? "On this page"}</>
}

/* A page opened for the first time has to fetch its code, and that wait is what shows. So the
   site's own preview fetches them all ahead, one at a time, when the browser is idle. */
if (window.frameElement?.id === "storybook-preview-iframe" && !(navigator as { connection?: { saveData?: boolean } }).connection?.saveData) {
  const pages = Object.values(import.meta.glob(["../src/components/*.stories.tsx", "../src/docs/foundations/*.mdx"]))
  const idle = (fn: () => void) => ("requestIdleCallback" in window ? requestIdleCallback(fn) : setTimeout(fn, 200))
  const next = () => {
    const page = pages.shift()
    if (page) page().catch(() => {}).finally(() => idle(next))
  }
  setTimeout(next, 1000)
}

/** MDX pages have no story to run a decorator, so the docs wrapper follows the
 *  theme itself: the page's tokens through <html>, Storybook's own docs styles
 *  through the theme prop. */
function ThemedDocs(props: React.PropsWithChildren<DocsContainerProps>) {
  const dark = React.useSyncExternalStore(subscribeToTheme, () => theme.dark)
  React.useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])
  return <DocsContainer {...props} theme={dark ? vvThemeDark : vvTheme} />
}

/** react-docgen reports imported unions as just "union". Where a story lists
 *  the options for its control, show those values in the props table. */
const showOptions: NonNullable<Preview["argTypesEnhancers"]>[number] = (context) => {
  const out = { ...context.argTypes }
  for (const [name, arg] of Object.entries(out)) {
    const options = (arg.options ?? (arg.control as { options?: unknown[] } | undefined)?.options) as unknown[] | undefined
    if (options?.length) {
      out[name] = {
        ...arg,
        table: { ...arg.table, type: { summary: options.map((o) => (typeof o === "string" ? `"${o}"` : String(o))).join(" | ") } },
      }
    }
    if (["disabled", "readOnly", "required"].includes(name)) {
      out[name] = { ...out[name], control: { type: "boolean" }, table: { ...out[name].table, type: { summary: "boolean" } } }
    }
  }
  return out
}

const preview: Preview = {
  tags: ["autodocs"],
  argTypesEnhancers: [showOptions],
  /* Dark theme is a .dark class on <html>, exactly as tokens.css declares it.
     Token names never change; only their values do. */
  decorators: [
    (Story, context) => {
      const dark = React.useSyncExternalStore(subscribeToTheme, () => theme.dark)
      const docs = context.viewMode === "docs"
      React.useLayoutEffect(() => {
        if (!docs) document.documentElement.classList.toggle("dark", dark)
      }, [dark, docs])
      if (context.parameters.bare) return <Story />
      return (
        <div className="vv-frame" data-docs={docs || undefined}>
          <Story />
        </div>
      )
    },
  ],
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true, sort: "requiredFirst" },
    docs: {
      theme: vvTheme,
      page: DocsPage,
      container: ThemedDocs,
      toc: { headingSelector: "h2, h3", title: <PageName /> },
      codePanel: true,
    },
    options: {
      storySort: {
        order: [
          "Foundations",
          ["Tokens", "Colors", "Theming", "Typography", "Spacing & Size", "Border and Corner", "Shadows & Elevation", "Breakpoints & Grids", "Motion", "Icons", "Dark theme"],
          "Components",
          ["Actions", "Forms", "Navigation", "Feedback", "Overlays", "Content", "Data"],
        ],
      },
    },
  },
}

export default preview
