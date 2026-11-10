# VV Design System

**Problem.** The studio worked on several projects with no shared system. Products grew apart, solutions were made again from scratch, and components were built separately for each project.

**Idea.** One source of truth for tokens, components and patterns. Tokens use Tailwind CSS scales, without extra customisation.

**Built.** 85 React components and 147 icons in two styles, outline and filled. Light and dark themes, a Storybook site with every state. Checks: token rules, axe on every story in both themes, keyboard scenarios, a crawl of every page on desktop and phone.

**Decision.** Two token levels, chosen on purpose to avoid extra complexity. Primitives hold raw values. Semantic tokens give each value its role in the interface.

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
