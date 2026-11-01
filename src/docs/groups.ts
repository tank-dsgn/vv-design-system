/* The component groups, in sidebar order. Each story's title names its group;
   scripts/check-tokens.sh fails if a component is missing here or filed elsewhere.
   DocsPage walks this list for the previous and next arrows. */
export const GROUPS: Record<string, string[]> = {
  Actions: ["Button", "ButtonGroup", "Command", "ContextMenu", "IconButton", "Kbd", "Link", "Menu", "Menubar", "ToggleButton", "ToggleButtonGroup"],
  Forms: ["Calendar", "Checkbox", "ChoiceCard", "ChoiceList", "Combobox", "DatePicker", "Dropzone", "Field", "FileItem", "FilterList", "Input", "InputGroup", "Label", "NumberInput", "OtpInput", "Radio", "SegmentedControl", "Select", "Slider", "Switch", "Tag", "Textarea", "ThemeSwitcher"],
  Navigation: ["Breadcrumbs", "HeaderStrip", "NavigationMenu", "PageHeader", "Pagination", "Sidebar", "Stepper", "Tabs", "TopNav"],
  Feedback: ["Badge", "Banner", "Callout", "EmptyState", "InlineMessage", "OutcomeBanner", "ProgressBar", "SeverityPill", "Skeleton", "Spinner", "StatusChip", "Toast"],
  Overlays: ["AlertDialog", "Drawer", "HoverCard", "Modal", "Popover", "Tooltip"],
  Content: ["Accordion", "AspectRatio", "Avatar", "Card", "Carousel", "ChecklistItem", "CodeBlock", "Collapsible", "Divider", "EntityCard", "ExplainerBlock", "Icon", "Image", "ListItem", "NextStepCard", "Resizable", "ScrollArea"],
  Data: ["BarChart", "DescriptionList", "DonutChart", "MetricCard", "Stat", "Table", "Timeline"],
}

export const COMPONENTS = Object.values(GROUPS).flat()
