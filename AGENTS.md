<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent Development Policy

Superpowers is installed and available.

Use Superpowers skills when they provide meaningful value, but use engineering judgment
about process overhead.

For simple, low-risk changes such as:

- CSS/Tailwind changes
- simple JSX changes
- visual/layout changes
- renaming
- mechanical refactoring
- obvious configuration changes

do not invoke TDD.

For normal features:

- implement the feature
- run relevant tests
- fix failures
- verify the result

Use test-driven-development for:

- complex business logic
- complex state transitions
- authentication/authorization
- non-trivial data transformations
- complex hooks
- high-risk behavior
- regression bugs where a regression test is valuable

When a bug is discovered, prefer writing a regression test before fixing it.

Always perform appropriate verification before declaring the task complete.
