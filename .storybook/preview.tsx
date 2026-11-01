import * as React from "react"
import type { Preview } from "@storybook/react-vite"
import { vvTheme, vvThemeDark } from "./theme"
import { DocsPage } from "./DocsPage"
import { DocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks"
import { addons } from "storybook/preview-api"
import "../src/styles/tokens.css"
import "../src/docs/docs.css"

// Links in examples are samples: they show a link and go nowhere.
document.addEventListener("click", (e) => {
  const link = (e.target as Element).closest?.("a[href]")
  if (link?.closest("#storybook-root, .docs-story")) e.preventDefault()
}, true)

/* The current theme lives outside React. Storybook remounts the docs container
   when globals change, and the iframe's URL still holds the previous value at
   that moment, so a remount must not start from the URL. */
/** The header's saved choice wins: the iframe may reload with a stale URL. */
function savedTheme() {
  try { return localStorage.getItem("vv-theme") } catch { return null }
}

const theme = {
  dark: savedTheme() ? savedTheme() === "dark" : new URLSearchParams(location.search).get("globals")?.includes("theme:dark") ?? false,
  listeners: new Set<() => void>(),
  listening: false,
}

function subscribeToTheme(listener: () => void) {
  if (!theme.listening) {
    theme.listening = true
    const channel = addons.getChannel()
    const on = ({ globals }: { globals: { theme?: string } }) => {
      theme.dark = globals.theme === "dark"
      theme.listeners.forEach((l) => l())
    }
    channel.on("globalsUpdated", on)
    channel.on("setGlobals", on)
  }
  theme.listeners.add(listener)
  return () => {
    theme.listeners.delete(listener)
  }
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
  // No toolbar entry: the sun/moon button in manager.tsx sets this.
  globalTypes: { theme: { description: "Theme" } },
  // From the saved choice: an embedded example is a preview of its own, and starting it on
  // light would broadcast that to the page around it.
  initialGlobals: { theme: savedTheme() ?? "light" },
  /* Dark theme is a .dark class on <html>, exactly as tokens.css declares it.
     Token names never change; only their values do. */
  decorators: [
    (Story, context) => {
      const dark = context.globals.theme === "dark"
      const docs = context.viewMode === "docs"
      if (!docs) theme.dark = dark
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
      toc: { headingSelector: "h2, h3", title: "On this page" },
      codePanel: true,
    },
    options: {
      storySort: {
        order: [
          "Foundations",
          ["Tokens", "Colors", "Theming", "Typography", "Spacing & Size", "Border and Corner", "Shadows & Elevation", "Breakpoints & Grids", "Motion", "Icons", "Dark theme"],
          "Components",
          ["Actions", "Forms", "Navigation", "Feedback", "Overlays", "Content", "Data", "AI"],
        ],
      },
    },
  },
}

export default preview
