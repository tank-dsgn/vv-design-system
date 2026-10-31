# VV Design System

A design system by Ivan Grigorenko: tokens on Tailwind's scales, 100 components in React, both themes,
every state documented.

**See it live: https://vv-foundations.vercel.app**

## What is here

- `src/styles/tokens.css`: two levels of tokens. Primitives are Tailwind's palette and scales, semantic tokens give them a role.
- `src/components`: the components, each with its stories, usage rules and states.
- `src/docs`: the Foundations pages.
- `.storybook`: the documentation site.
- `scripts`: token rules, accessibility checks across both themes, keyboard scenarios.

## Run it

```
npm ci
npm run storybook
```

`npm run check` runs the types and token rules. `npm run build-storybook`, then `npm run test:a11y` and
`npm run test:interactions` and `npm run test:crawl`, run the rest.

## Licence

All rights reserved. The source is here to read; using it needs the author's written permission.
See [LICENSE](LICENSE). Third-party material keeps its own licence: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
