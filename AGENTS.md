# Agent instructions

This repository is the Tranqui landing page (formerly SafeMap) (Astro 7 + Tailwind 4, deployed to GitHub Pages at https://tranqui.jahattrinidad.com/; repository `trinity-bytes/tranqui`).

## Active work

The landing is being reimplemented from an approved Figma design. Before changing anything, read the implementation plan in full:

- `odd/tasks/landing-implementation.md`: the source of truth for the implementation. Pick the first pending task whose dependencies are done, do one task per commit, and update its `## Tasks` row and `## Log` when you finish.
- `odd/tasks/landing-redesign.md`: design context. Read only the sections and log entries that the plan cites.

## Rules

- Landing copy is neutral Spanish with `tú` (Peruvian audience; never `vos`). Code, identifiers and comments are in English.
- Never invent metrics, testimonials, partner logos, user counts or links. Missing data is listed in the plan (section 4).
- Commits follow Conventional Commits, with no AI attribution lines. Do not push or open pull requests; the user decides that.
- Checks: `npm ci`, `npm run build`, `npm run lint`, `npm run type-check`.
