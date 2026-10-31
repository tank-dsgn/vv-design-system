import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../src/docs/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "storybook-addon-pseudo-states"],
  framework: { name: "@storybook/react-vite", options: {} },
  staticDirs: ["./public"],
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  features: { sidebarOnboardingChecklist: false, menuOnboardingChecklist: false },
}

export default config
