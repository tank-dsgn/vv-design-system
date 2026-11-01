/* The theme lives outside Storybook's globals: changing a global re-renders the docs, which
   reloads every example on the page and shows its loading screen. The header saves the choice;
   every preview, nested ones too, hears it through the storage event and only swaps the class. */
function savedTheme() {
  try { return localStorage.getItem("vv-theme") } catch { return null }
}

export const theme = {
  dark: savedTheme() ? savedTheme() === "dark" : new URLSearchParams(location.search).get("globals")?.includes("theme:dark") ?? false,
  listeners: new Set<() => void>(),
}

window.addEventListener("storage", (e) => {
  if (e.key !== "vv-theme") return
  theme.dark = e.newValue === "dark"
  document.documentElement.classList.toggle("dark", theme.dark)
  theme.listeners.forEach((l) => l())
})

export function subscribeToTheme(listener: () => void) {
  theme.listeners.add(listener)
  return () => {
    theme.listeners.delete(listener)
  }
}
