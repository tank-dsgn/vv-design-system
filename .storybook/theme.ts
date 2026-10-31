import { create } from "storybook/theming"

/* The chrome follows the system's own colours: neutrals for surfaces and
   states, the Brand ramp (--color-text-accent) for what is a link or a current
   position. Sidebar states: manager-head.html. */
export const vvTheme = create({
  base: "light",
  brandTitle:
    '<span style="display:inline-flex;align-items:center;gap:8px;font-family:Inter,system-ui,sans-serif;font-size:15px;font-weight:600;color:#0a0a0a;letter-spacing:-0.01em">' +
    '<span style="display:inline-grid;place-items:center;width:28px;height:28px;border-radius:8px;background:#2e1065;color:#fff;font-size:12px;font-weight:700;letter-spacing:0">VV</span>' +
    "Foundations</span>",
  brandUrl: "./",
  brandTarget: "_self",

  colorPrimary: "#6d28d9",
  colorSecondary: "#6d28d9",

  appBg: "#ffffff",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#e5e5e5",
  appBorderRadius: 8,

  fontBase: "Inter, system-ui, -apple-system, sans-serif",
  fontCode: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",

  textColor: "#0a0a0a",
  textInverseColor: "#ffffff",
  textMutedColor: "#525252",

  barTextColor: "#525252",
  barHoverColor: "#0a0a0a",
  barSelectedColor: "#6d28d9",
  barBg: "#ffffff",

  inputBg: "#ffffff",
  inputBorder: "#d4d4d4",
  inputTextColor: "#0a0a0a",
  inputBorderRadius: 8,
})

export const vvThemeDark = create({
  base: "dark",
  brandTitle:
    '<span style="display:inline-flex;align-items:center;gap:8px;font-family:Inter,system-ui,sans-serif;font-size:15px;font-weight:600;color:#fafafa;letter-spacing:-0.01em">' +
    '<span style="display:inline-grid;place-items:center;width:28px;height:28px;border-radius:8px;background:#6d28d9;color:#fff;font-size:12px;font-weight:700;letter-spacing:0">VV</span>' +
    "Foundations</span>",
  brandUrl: "./",
  brandTarget: "_self",

  colorPrimary: "#a78bfa",
  colorSecondary: "#a78bfa",

  appBg: "#0a0a0a",
  appContentBg: "#0a0a0a",
  appPreviewBg: "#0a0a0a",
  appBorderColor: "#262626",
  appBorderRadius: 8,

  fontBase: "Inter, system-ui, -apple-system, sans-serif",
  fontCode: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",

  textColor: "#fafafa",
  textInverseColor: "#0a0a0a",
  textMutedColor: "#a3a3a3",

  barTextColor: "#a3a3a3",
  barHoverColor: "#fafafa",
  barSelectedColor: "#a78bfa",
  barBg: "#0a0a0a",

  inputBg: "#171717",
  inputBorder: "#404040",
  inputTextColor: "#fafafa",
  inputBorderRadius: 8,
})
