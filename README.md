# VV Design System

**Problem.** The studio's design system in Figma was not finished: five token systems, three brand colours, seven versions of the dropdown.

**Idea.** Code is the source of truth. Primitive tokens are Tailwind's palette and scales. Semantic tokens give each value a role.

**Built.** 85 React components and 300 icons, light and dark themes, a Storybook site with every state. Checks: token rules, axe on every story in both themes, keyboard scenarios, a crawl of every page on desktop and phone.

**Decision.** Two token levels, not three. Developers already know Tailwind's names, so there is no extra layer to learn.

A design system by Ivan Grigorenko: tokens on Tailwind's scales, 85 components in React, both themes,
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
