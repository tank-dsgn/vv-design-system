/* The "Usage" section of every component page, rendered by DocsPage in one
   layout. `[Button]` links to that component. scripts/check-tokens.sh fails if a
   component has no entry or a link leads nowhere. */
export type Usage = { use: string[]; avoid: string[]; write?: string[] }

export const USAGE: Record<string, Usage> = {
  Accordion: {
    use: ["FAQs, settings and details on a long page", "Sections people open one or two of"],
    avoid: ["Content needed on every visit: leave it open on the page", "One section: use [Collapsible]", "Switching views of the same content: use [Tabs]"],
    write: ["Titles name what is inside, so people can skip without opening"],
  },
  AlertDialog: {
    use: ["Irreversible actions, or ones that affect other people", "Deleting, cancelling a booked pickup"],
    avoid: ["Reversible actions: do it at once and offer Undo in a [Toast]", "A task with fields: use [Modal]"],
    write: ["The title is the question, with the object's name", "The body says what will be lost", "Both buttons say what they do. Never Yes and No"],
  },
  AspectRatio: {
    use: ["Video, maps and images whose shape must hold while loading", "Grids where every tile keeps one shape"],
    avoid: ["A plain image: [Image] already keeps its shape", "Text content: it will overflow a fixed shape"],
  },
  Avatar: {
    use: ["A person or a company beside their name", "Lists where a face or a logo speeds up scanning"],
    avoid: ["Decoration without a name behind it", "Status: use [Badge]"],
  },
  Badge: {
    use: ["A short, read-only status on an object", "Strong: the one status that must stand out in a list"],
    avoid: ["Keywords people add themselves: use [Tag]", "Where a process is: use [StatusChip]", "How serious something is: use [SeverityPill]"],
    write: ["One or two words, the same word for the same state everywhere", "Tone reinforces the word. It never replaces it"],
  },
  Banner: {
    use: ["A message about a whole page or section", "System status, or a consequence of the person's data"],
    avoid: ["One field: use [InlineMessage]", "A short confirmation: use [Toast]", "Static context: use [Callout]", "The whole session: use [HeaderStrip]"],
    write: ["Lead with the consequence. Say what happened, then what to do"],
  },
  BarChart: {
    use: ["Comparing values across categories or periods", "Stacked, when the series add up to a whole"],
    avoid: ["Fewer than four values: use [Stat]", "Part of a whole with few slices: use [DonutChart]", "Exact values to read: use [Table]"],
  },
  Breadcrumbs: {
    use: ["Hierarchies three or more levels deep"],
    avoid: ["A flat app: the back link in [PageHeader] is enough", "Steps of a process: use [Stepper]"],
  },
  Button: {
    use: ["Triggering an action", "One primary per view for the main way forward", "Destructive only for actions that delete or cannot be undone"],
    avoid: ["Going to another page: use [Link]", "Nothing but an icon: use [IconButton]", "A state that stays on: use [ToggleButton]"],
    write: ["A verb and an object: Book shipment. Each label makes sense read alone", "To fit, shorten the object, never the verb", "Sentence case. Never Submit, OK or Click here"],
  },
  ButtonGroup: {
    use: ["Two to four related actions of equal weight"],
    avoid: ["Picking one of several options: use [SegmentedControl]", "Toggles that stay on: use [ToggleButtonGroup]", "Mixing variants inside a group"],
  },
  Calendar: {
    use: ["Picking a date when seeing the month matters", "Inline on a page with room for it"],
    avoid: ["A form field: use [DatePicker]", "Birth dates and other far-off years: type them in a [Field]"],
  },
  Callout: {
    use: ["Context worth reading, inside a page or a form"],
    avoid: ["An event that just happened: use [Banner]", "An explanation of how something works: use [ExplainerBlock]", "Several on one screen: nothing stands out any more"],
  },
  Card: {
    use: ["Facts about one object, in a grid of objects", "With onClick, when the whole card opens one thing"],
    avoid: ["Comparing many objects on the same fields: use [Table]", "A person or a company: use [EntityCard]", "Cards inside cards"],
  },
  Carousel: {
    use: ["Peer items where seeing one at a time is enough", "Photos, steps of a guide"],
    avoid: ["Content everyone must see: the later slides are rarely reached", "Anything that moves on its own"],
  },
  Checkbox: {
    use: ["An option that applies when the form is submitted", "Indeterminate: a parent over a partly checked list"],
    avoid: ["A setting that applies at once: use [Switch]", "One answer out of several: use [Radio]", "Options answering one question: use [ChoiceList]"],
    write: ["The label states what is true when checked"],
  },
  ChecklistItem: {
    use: ["Tasks people work through: onboarding, a pre-departure check"],
    avoid: ["A form option: use [Checkbox]", "Steps in a fixed order: use [Stepper]"],
    write: ["Each task starts with a verb"],
  },
  ChoiceCard: {
    use: ["A choice that needs a sentence or a price per option"],
    avoid: ["Options that fit in a few words: use [Radio]", "More than five options: use [Select]"],
  },
  ChoiceList: {
    use: ["Related choices under one question"],
    avoid: ["A single on or off option: use [Checkbox]", "A long list: use [Select] or [Combobox]"],
    write: ["The title is the question. Errors go on the group: Choose at least one document"],
  },
  CodeBlock: {
    use: ["Code to read and copy: an API example, a config, a tool's output"],
    avoid: ["A key or a shortcut in text: use [Kbd]", "Structured values: use [DescriptionList]"],
  },
  Collapsible: {
    use: ["One section of details most people skip"],
    avoid: ["Several sections in a stack: use [Accordion]", "Content people need to act: leave it open"],
  },
  Combobox: {
    use: ["More options than a list can hold, when people know what they want", "Cities, carriers, customers"],
    avoid: ["Up to 15 known options: use [Select]", "Free text with no list: use [Field]", "Running commands: use [Command]"],
  },
  Command: {
    use: ["Every action in a large app, for people who prefer the keyboard"],
    avoid: ["The only way to reach an action: everything must also be on screen", "Picking a value in a form: use [Combobox]"],
    write: ["Each command starts with a verb"],
  },
  ContextMenu: {
    use: ["Shortcuts in canvases and dense tools"],
    avoid: ["The only way to an action: touch screens have no right click", "A visible overflow button: use [Menu]"],
  },
  DatePicker: {
    use: ["A date in a form, with the calendar one click away"],
    avoid: ["The month is the point of the screen: use [Calendar]", "Far-off dates: type them in a [Field]"],
    write: ["Write dates in words: 12 Nov 2026. 11/12/2026 reads differently in London and in Boston"],
  },
  DescriptionList: {
    use: ["Facts about one object as label and value"],
    avoid: ["Many objects with the same fields: use [Table]", "One key figure: use [Stat]"],
  },
  Divider: {
    use: ["Separating groups when spacing alone does not"],
    avoid: ["Between every row: use space first", "Sections already separated by a heading"],
  },
  DonutChart: {
    use: ["Part of a whole, up to six slices"],
    avoid: ["More than six slices: use [Table]", "Comparing periods: use [BarChart]"],
  },
  Drawer: {
    use: ["An object's details or a longer form, with the list in view behind it"],
    avoid: ["A short decision: use [Modal]", "A question before something irreversible: use [AlertDialog]"],
  },
  Dropzone: {
    use: ["Adding files to a form or a page"],
    avoid: ["Showing what was uploaded: use [FileItem]"],
    write: ["State the accepted types and the size limit up front"],
  },
  EmptyState: {
    use: ["A list, a table or a page with nothing to show"],
    avoid: ["Content on its way: use [Skeleton]", "A failure: use [Banner] with the cause and a retry"],
    write: ["Nothing yet: say what will appear, offer the action that creates it", "Nothing matches: say the filters found nothing, offer to clear them", "No access: say who can grant it", "One primary action. An empty state with no action is a dead end"],
  },
  EntityCard: {
    use: ["People, companies or vehicles in a grid", "When the same two to four facts tell them apart"],
    avoid: ["A free layout: use [Card]", "A plain row: use [ListItem]", "Comparing across many fields: use [Table]"],
  },
  ExplainerBlock: {
    use: ["A short answer to how this works, next to the feature"],
    avoid: ["A note that does not explain a mechanism: use [Callout]", "Interactive content: use [Popover]"],
    write: ["The title is the question people have"],
  },
  Field: {
    use: ["Every text field in a form"],
    avoid: ["The label is already on screen, as in a search bar: use [Input]", "Several lines: use [Textarea]"],
    write: ["The label says what to enter, as a noun. It stays visible while typing", "The placeholder is an example, never the label", "An error says how to fix it: Enter ORD followed by four digits", "Check when the person leaves the field, not on every keystroke. Mark optional, not required"],
  },
  FileItem: {
    use: ["One file in an upload list, with progress and retry"],
    avoid: ["Choosing a file: use [Dropzone]"],
    write: ["On failure name the file and the limit: dock-photo.jpg is over 5 MB"],
  },
  FilterList: {
    use: ["Collapsible filter sections in a side panel"],
    avoid: ["One or two filters: use [Select]", "Page navigation: use [Sidebar]"],
  },
  HeaderStrip: {
    use: ["A condition of the whole session: a demo, viewing as someone else, a planned outage"],
    avoid: ["A message about one page: use [Banner]", "Several at once: pick the most important"],
  },
  HoverCard: {
    use: ["A preview of a linked object: a carrier, a person"],
    avoid: ["Essential information: touch screens may never show it", "Buttons inside: use [Popover]", "A short name for a control: use [Tooltip]"],
  },
  Icon: {
    use: ["Beside text, to speed up recognition", "With a label when the icon alone carries the meaning"],
    avoid: ["A clickable icon: use [IconButton]", "Decoration without meaning"],
  },
  IconButton: {
    use: ["Toolbars, table rows and dense headers", "Actions everyone recognises by icon"],
    avoid: ["An action that needs explaining: use [Button]", "A state that stays on: use [ToggleButton]"],
    write: ["The label is required and becomes the tooltip: Delete shipment, not Delete"],
  },
  Image: {
    use: ["Content images that load and may fail"],
    avoid: ["A person or a company: use [Avatar]", "Icons and marks: use [Icon]"],
    write: ["Alt text says what the image shows. Empty only for decoration"],
  },
  InlineMessage: {
    use: ["A one-line message attached to a field or a small block"],
    avoid: ["A message about a page: use [Banner]", "Form field errors: [Field] already shows them"],
    write: ["What happened, why if it helps, what to do now"],
  },
  Input: {
    use: ["A text field whose label is already on screen: a search bar, a table filter"],
    avoid: ["A form field: use [Field]", "A stepped number: use [NumberInput]", "Several lines: use [Textarea]"],
  },
  InputGroup: {
    use: ["Controls that together give one answer: an amount and its currency, a code and its Apply"],
    avoid: ["Separate questions: give each its own [Field]", "A fixed unit: use the suffix on [Input]"],
  },
  Kbd: {
    use: ["A key or a shortcut in menus, tooltips and help text"],
    avoid: ["Code or values: use [CodeBlock]", "A status: use [Badge]"],
  },
  Label: {
    use: ["Naming a control you built yourself"],
    avoid: ["Text fields: [Field] already has one", "Text that is not tied to a control"],
    write: ["Mark the rarer case: optional, not required"],
  },
  Link: {
    use: ["Going somewhere: another page or resource"],
    avoid: ["Doing something: use [Button]"],
    write: ["Link text makes sense out of context: View the cancellation policy, never Click here"],
  },
  ListItem: {
    use: ["Rows in a simple list: people, files, carriers"],
    avoid: ["Comparing across columns: use [Table]", "A grid of objects: use [Card]"],
  },
  Menu: {
    use: ["Secondary actions that do not earn a place on screen", "Destructive actions last, in their own section"],
    avoid: ["Picking a value: use [Select]", "Only one or two actions: show them as [Button]"],
    write: ["Each item starts with a verb"],
  },
  Menubar: {
    use: ["A desktop-like tool: an editor, a canvas"],
    avoid: ["Page navigation: use [TopNav] or [NavigationMenu]", "A few actions: use [Menu]"],
  },
  MetricCard: {
    use: ["A key figure with its change over a period"],
    avoid: ["A figure with no change: use [Stat]", "A series worth reading as a shape: use [BarChart]"],
    write: ["Sentiment follows meaning, not direction: a rising overdue balance is bad news"],
  },
  Modal: {
    use: ["A decision or a short task that must be finished first", "A form of a few fields"],
    avoid: ["Reversible actions: do it and offer Undo in a [Toast]", "A question before something irreversible: use [AlertDialog]", "Longer content beside a list: use [Drawer]"],
    write: ["Costly to get wrong: ask first. Reversible: do it. Dialogs on everything train people to click through them"],
  },
  NavigationMenu: {
    use: ["A marketing or docs site with more pages than fit in a row"],
    avoid: ["An app with a handful of pages: use [TopNav]", "An app with many sections: use [Sidebar]", "Actions in the panels: use [Menu]"],
  },
  NextStepCard: {
    use: ["The one next thing to do, on a page that is otherwise for reading"],
    avoid: ["Several steps: use [ChecklistItem]", "More than one per page", "A page with an obvious primary [Button]"],
    write: ["The title is the action. The description says why now"],
  },
  NumberInput: {
    use: ["An exact number usually changed by a little: pallets, seats"],
    avoid: ["A free-form amount: use [Input] with a suffix", "Position matters more than the number: use [Slider]"],
    write: ["State the limit without blame: A truck takes up to 33 pallets"],
  },
  OtpInput: {
    use: ["A one-time code from SMS or email"],
    avoid: ["Passwords, or codes with letters: use [Field]"],
    write: ["On an expired code, say so and offer a new one"],
  },
  OutcomeBanner: {
    use: ["The result of a finished process: an import, a batch, a check"],
    avoid: ["A quick confirmation: use [Toast]", "A status that is still changing: use [StatusChip]", "A page condition: use [Banner]"],
    write: ["Partial results give the count: 45 of 48 imported", "Say what did not happen: Nothing was imported"],
  },
  PageHeader: {
    use: ["The top of every page: its title, status and page actions"],
    avoid: ["Section headings inside a page", "Site-wide navigation: use [TopNav]"],
    write: ["The primary action sits last on the right"],
  },
  Pagination: {
    use: ["A long list split into pages", "Pages: jumping to a number. Compact: moving on through a table"],
    avoid: ["Short lists that fit on a page", "Steps of a process: use [Stepper]"],
  },
  Popover: {
    use: ["Interactive content on a button: a short filter form, an explanation with a link"],
    avoid: ["A plain label: use [Tooltip]", "A list of actions: use [Menu]", "A task that must be finished first: use [Modal]"],
  },
  ProgressBar: {
    use: ["Measurable work: an upload, an inspection"],
    avoid: ["Work of unknown length: use [Spinner]", "A figure that is not progress: use [Stat]"],
  },
  Radio: {
    use: ["One option from two to five that should be seen together"],
    avoid: ["More than five: use [Select]", "Options needing a sentence each: use [ChoiceCard]", "Switching views: use [SegmentedControl]"],
  },
  Resizable: {
    use: ["Tools where people decide how much room each side gets"],
    avoid: ["Fixed layouts: choose the proportions yourself", "Phones: stack the panes"],
  },
  ScrollArea: {
    use: ["Its own scroll inside a fixed layout: a side panel"],
    avoid: ["The main page: let the page scroll", "Content that fits without scrolling"],
  },
  SegmentedControl: {
    use: ["Switching two to five views of the same content in place"],
    avoid: ["Page sections: use [Tabs]", "Any number on at once: use [ToggleButtonGroup]", "A value in a form: use [Radio]"],
  },
  Select: {
    use: ["One value from 4 to 15 known options"],
    avoid: ["Two or three options: use [Radio]", "Many options: use [Combobox]", "Actions: use [Menu]"],
  },
  SeverityPill: {
    use: ["How serious something is: incidents, defects, audit findings"],
    avoid: ["A status with no ranking: use [Badge]", "Where a process is: use [StatusChip]"],
  },
  Sidebar: {
    use: ["An app with many sections, grouped under headings"],
    avoid: ["A handful of pages: use [TopNav]", "Filters: use [FilterList]"],
  },
  Skeleton: {
    use: ["Content whose shape is known: same sizes, same number of lines"],
    avoid: ["Unknown shape or a short wait: use [Spinner]", "Nothing to show: use [EmptyState]"],
  },
  Slider: {
    use: ["Picking from a range when the position matters more than the number"],
    avoid: ["An exact number: use [NumberInput]", "A few named options: use [SegmentedControl]"],
  },
  Spinner: {
    use: ["Loading of unknown shape, or under a few seconds"],
    avoid: ["The layout is known: use [Skeleton]", "Measurable work: use [ProgressBar]"],
    write: ["The label says what is loading"],
  },
  Stat: {
    use: ["A compact figure with a note, in a summary row"],
    avoid: ["A figure with its change: use [MetricCard]", "A shape over time: use [BarChart]"],
  },
  StatusChip: {
    use: ["Where a process is: queued, running, paused, done or failed"],
    avoid: ["A state of an object outside a process: use [Badge]", "A finished process's full result: use [OutcomeBanner]"],
  },
  Stepper: {
    use: ["A fixed sequence of four to six steps: a booking flow"],
    avoid: ["Fewer steps: they do not need it", "Tasks in any order: use [ChecklistItem]"],
  },
  Switch: {
    use: ["A setting that takes effect at once, with no Save", "Anywhere you would say toggle: this is the sliding one"],
    avoid: ["Applies on submit: use [Checkbox]", "A control in a toolbar: use [ToggleButton]"],
    write: ["The label names the setting, not its state"],
  },
  Table: {
    use: ["Objects that share attributes, to compare, sort and act on in bulk"],
    avoid: ["One object's facts: use [DescriptionList]", "A simple list: use [ListItem]"],
    write: ["Always pass an empty state, so a filtered-out table explains itself"],
  },
  Tabs: {
    use: ["Views of the same content without leaving the page"],
    avoid: ["Moving between pages: use [TopNav] or [Sidebar]", "A small mode switch: use [SegmentedControl]"],
  },
  Tag: {
    use: ["A keyword people attach to label, group or filter"],
    avoid: ["A status set by the system: use [Badge]", "Choosing an option in a form: use [ChoiceList]"],
  },
  Textarea: {
    use: ["Multi-line text: notes, descriptions, comments"],
    avoid: ["An answer that fits on one line: use [Field]"],
  },
  ThemeSwitcher: {
    use: ["A theme choice on a settings page"],
    avoid: ["A shortcut in a header: use [ToggleButton]"],
  },
  Timeline: {
    use: ["What happened to an object, in order"],
    avoid: ["Steps still to come: use [Stepper]"],
    write: ["Newest first for the current state, oldest first for the story"],
  },
  Toast: {
    use: ["A brief confirmation of what someone just did", "Undo after a reversible action"],
    avoid: ["Anything the person must act on: use [Banner] or [Modal]", "Errors in a form: use [Field]"],
    write: ["Say the specific thing: Shipment booked. No exclamation marks"],
  },
  ToggleButton: {
    use: ["A button that stays on: show a map, pin a panel"],
    avoid: ["A setting in a list: use [Switch]", "An action that finishes at once: use [Button]"],
  },
  ToggleButtonGroup: {
    use: ["Related toggles where any number can be on: map layers"],
    avoid: ["Exactly one must be on: use [SegmentedControl]", "Actions with no lasting state: use [ButtonGroup]"],
  },
  Tooltip: {
    use: ["Naming a control, most often an [IconButton]", "Showing a shortcut"],
    avoid: ["Essential information: touch screens may never show it", "Interactive content: use [Popover]", "A preview of an object: use [HoverCard]"],
  },
  TopNav: {
    use: ["An app with a handful of top-level pages"],
    avoid: ["Many sections: use [Sidebar]", "A marketing site with panels: use [NavigationMenu]", "Views within a page: use [Tabs]"],
  },
}
