# Implementation Plan: Elegant Midnight Green & Brass Menu Theme

**Branch**: `001-elegant-menu-theme` | **Date**: 2026-09-02 | **Spec**: `specs/001-elegant-menu-theme/spec.md`

**Input**: Feature specification from `/specs/001-elegant-menu-theme/spec.md`

## Summary

Restyle the Brew & Co. coffee menu ("Nocturne" concept) from its current stone/amber look into an elegant midnight-green + brass theme. The change is visual only: add the Cormorant Garamond serif via `next/font/google`, add a centralized Tailwind v4 `@theme` color/font token set in `app/globals.css`, and restyle class markup across `app/page.tsx`, `app/components/MenuSection`, `app/components/MenuCard`, and the carousel backdrop. Menu data (`data/menu.ts`), filter logic, and carousel select-and-scroll behavior are preserved unchanged. Approach validated against the installed Next.js 16.3.4 docs (CSS + Fonts guides) per the repo's AGENTS.md rule.

## Technical Context

**Language/Version**: TypeScript ~5.x (strict), React 19.2.8, Next.js 16.3.4 (App Router)

**Primary Dependencies**: Tailwind CSS v4 (`@tailwindcss/postcss`, CSS-first `@theme` config in `globals.css`), `next/font/google` (self-hosted fonts), `@tanstack/react-query` (existing provider, untouched)

**Storage**: N/A — no data layer; catalog lives in `data/menu.ts`

**Testing**: No test framework configured. Verification = `npm run lint`, `npm run typecheck`, `npm run build` plus manual visual/interaction checks (see `quickstart.md`). TDD not applicable (CSS/Tailwind restyle).

**Target Platform**: Modern browsers (web), responsive mobile → desktop

**Project Type**: Web application (Next.js App Router, single static page)

**Performance Goals**: No new runtime JS or network font requests; fonts self-hosted by `next/font` with CSS-variable exposure (no FOUC/layout shift). Static page cost stays ~unchanged.

**Constraints**: Preserve all existing behavior and data; WCAG AA text contrast on dark backgrounds; no horizontal overflow on any breakpoint; RoundCarousel (vendored "Originkit") 3D logic untouched — only its `background` prop is overridden.

**Scale/Scope**: Single page restyle touching `app/layout.tsx`, `app/globals.css`, `app/page.tsx`, `app/components/{MenuSection,MenuCard,DrinkCarousel}/index.tsx`; ~7 files, purely presentational.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

The `.specify/memory/constitution.md` is an **unfilled template** (placeholder principles only, no ratified content). Effective project governance therefore comes from `AGENTS.md`, which is treated here as the governing constitution:

- **Meaningful names / no abbreviations**: satisfied — the only new identifiers are full-word theme token names (`nocturne-*`, `brass-*`, `ivory`, `sage`, `hairline`).
- **TDD only where valuable**: a pure CSS/Tailwind restyle with no business logic — TDD explicitly not required by AGENTS.md for visual/layout changes.
- **Read Next.js docs before writing code**: this plan records the mandatory reads — `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` and `13-fonts.md` (Tailwind v4 CSS-first setup; non-variable Google fonts require a `weight` array).
- **Verify before declaring complete**: `quickstart.md` mandates lint + typecheck + production build + manual interaction checks before sign-off.

**No gate violations.** Complexity Tracking section left unfilled.

## Project Structure

### Documentation (this feature)

```text
specs/001-elegant-menu-theme/
├── plan.md              # This file
├── research.md          # Phase 0 output — decisions & rationale
├── data-model.md        # Phase 1 output — menu model (unchanged) + token model
├── quickstart.md        # Phase 1 output — validation guide
├── contracts/           # Phase 1 output — stable interfaces + token contract
│   ├── menu-data.md
│   ├── component-interfaces.md
│   └── theme-tokens.md
└── tasks.md             # Phase 2 output (NOT created by this command)
```

### Source Code (repository root)

```text
app/
├── layout.tsx                 # [EDIT] add Cormorant_Garamond via next/font/google (variable)
├── globals.css                # [EDIT] add @theme tokens: colors + --font-serif
├── page.tsx                   # [EDIT] restyle header, hero, footer to midnight-green/brass
├── components/
│   ├── MenuSection/index.tsx  # [EDIT] restyle section heading + filter pills
│   ├── MenuCard/index.tsx     # [EDIT] restyle card: serif name, brass price, hairline, hover glow
│   ├── DrinkCarousel/index.tsx# [EDIT] pass dark theme background to RoundCarousel
│   ├── RoundCarousel/index.tsx# [NO-OP] vendored Originkit; receives background prop only
│   └── MenuFilterProvider/index.tsx # [NO-OP] logic unchanged
└── providers/queryClientProviders.tsx # [NO-OP]

data/menu.ts                   # [NO-OP] catalog, categories, helpers — unchanged
```

**Structure Decision**: Single Next.js App Router project (existing repo). No new directories, no new files in `app/`; all styling flows from the centralized `@theme` tokens in `globals.css`, mirroring the existing single-source-of-truth CSS setup.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations — section intentionally empty.
