---
description: "Task list for the Elegant Midnight Green & Brass menu theme restyle"
---

# Tasks: Elegant Midnight Green & Brass Menu Theme

**Input**: Design documents from `/specs/001-elegant-menu-theme/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No automated test tasks — this is a pure CSS/Tailwind visual restyle (per plan.md "Testing" and AGENTS.md guidance). Validation is `npm run lint` / `npm run typecheck` / `npm run build` plus the manual checks in quickstart.md (Polish phase).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Single Next.js App Router project at repo root: `app/` (page shell + components), `data/` (unchanged catalog).
- Theme tokens are centralized in `app/globals.css` (`@theme`), the serif font in `app/layout.tsx` — no `tailwind.config.*` exists (Tailwind v4 CSS-first).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish a clean baseline and confirm the Next.js 16 conventions this feature extends.

- [x] T001 Verify baseline checks pass before any edits: run `npm run lint`, `npm run typecheck`, and `npm run build` from repo root and confirm all exit 0
- [x] T002 Read the mandatory Next.js 16.3.4 guides (required by AGENTS.md before writing code): `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` (Tailwind v4 `@import "tailwindcss"` + `@theme`) and `13-fonts.md` (non-variable Google fonts need a `weight` array; `variable` exposes a CSS variable); confirm the patterns in research.md §R-5

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The theme infrastructure every user story depends on — the serif font and the centralized "Nocturne" token set.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T003 [P] Add Cormorant Garamond to `app/layout.tsx`: import `Cormorant_Garamond` from `next/font/google` with `subsets: ["latin"]`, `weight: ["400","500","600","700"]`, `variable: "--font-cormorant"`; append `cormorant.variable` to the existing Geist variables on the `<html>` element (do not remove existing fonts)
- [x] T004 [P] Define the "Nocturne" theme in `app/globals.css`: add `--color-nocturne-975` (#061210), `--color-nocturne-950` (#0C1F1C), `--color-nocturne-800` (#12332C), `--color-brass` (#C9A35C), `--color-ivory` (#F3EFE4), `--color-sage` (#A9B8B0), `--color-hairline` (rgba(201,163,92,0.30)) plus `--font-serif: var(--font-cormorant)` to the `@theme inline` block; set `body` background to `--color-nocturne-950` and foreground to `--color-ivory`; remove/replace the placeholder white/dark-mode `:root` contrast values so the theme is always dark
- [x] T005 Verify the foundation compiles: run `npm run lint` and `npm run typecheck` and fix any issues (tokens are inert until used by components; full build deferred to Polish)

**Checkpoint**: Foundation ready — serif font wired and tokens available as `bg-nocturne-*`, `text-brass`, `font-serif`, etc. User story implementation can now begin.

---

## Phase 3: User Story 1 - Elegant First Impression (Priority: P1) 🎯 MVP

**Goal**: The hero and page background read as premium midnight-green + brass — the "wow" moment.

**Independent Test**: Run `npm run dev`, open `http://localhost:3000`, and confirm the page background is deep green, the eyebrow is brass, the headline is ivory serif with a brass divider, and the 3D carousel renders against a dark green backdrop.

### Implementation for User Story 1

- [x] T006 [US1] Restyle the page shell + hero in `app/page.tsx`: change `<main>` to `bg-nocturne-950 text-ivory`; restyle the hero `section` (eyebrow label → `text-brass` uppercase tracking-widest; `<h1>` → `font-serif` ivory with a brass rule divider; subtitle → `text-sage`); add a soft radial brass-on-green glow behind the carousel container (e.g. decorative absolutely-positioned gradient or shadow) while keeping the `DrinkCarousel` usage itself unchanged
- [x] T007 [P] [US1] Pass the dark backdrop to the carousel in `app/components/DrinkCarousel/index.tsx`: forward `background="#0C1F1C"` (or a `nocturne` value) to `RoundCarousel` in `app/components/RoundCarousel/index.tsx` — do NOT modify `RoundCarousel` itself, `MENU_ITEMS` mapping, or `selectDrink` wiring

**Checkpoint**: User Story 1 should be fully functional and testable independently (hero impression complete).

---

## Phase 4: User Story 2 - Elegant Menu Browsing (Priority: P2)

**Goal**: The menu grid and filters adopt the dark, gold-edged treatment — elegant browsing.

**Independent Test**: Click every filter pill and confirm the active pill is brass-filled with dark-green text, inactive pills are brass-outlined, and each card uses the serif ivory name, brass price, sage description, gold hairline, and hover glow.

### Implementation for User Story 2

- [x] T008 [US2] Restyle the menu section in `app/components/MenuSection/index.tsx`: section title → `font-serif` ivory; subtitle → `text-sage`; filter pills → inactive = `border-brass/40 text-ivory` transparent surface with `hover:border-brass hover:text-brass`, active = `bg-brass text-nocturne-950` (dark text on brass fill for contrast, per contracts/theme-tokens.md); keep the `FILTERS` array, `useMenuFilter`, and filtering logic unchanged
- [x] T009 [P] [US2] Restyle menu cards in `app/components/MenuCard/index.tsx`: card surface → `bg-nocturne-800`, border → `border-hairline`, name → `font-serif` ivory, price → brass pill (`bg-brass/15 text-brass`) — or brass fill with dark text — description → `text-sage`; add hover glow (`hover:shadow-[0_0_30px_rgba(201,163,92,0.15)]` or equivalent) and keep the existing image zoom + `id={getDrinkId(...)}` anchor
- [x] T010 [US2] Verify card anchors still work after restyle: confirm `id={getDrinkId(item.name)}` and `scroll-mt-28` are preserved on the `<article>` in `app/components/MenuCard/index.tsx` (no class-scope changes); no edits expected

**Checkpoint**: User Stories 1 AND 2 both work independently (hero + full menu browsing elegance).

---

## Phase 5: User Story 3 - Cohesive Theme Details (Priority: P3)

**Goal**: Header and footer complete the premium illusion with the same tokens.

**Independent Test**: Scan header/footer on the running page — dark translucent sticky header with brass wordmark and brass pill, dark footer with gold hairline and ivory/sage text.

### Implementation for User Story 3

- [x] T011 [US3] Restyle the sticky header in `app/page.tsx`: `bg-nocturne-950/80 backdrop-blur border-b border-hairline`; wordmark → `font-serif` brass (or ivory with brass accent); "View Menu" pill → `bg-brass text-nocturne-950 hover:bg-brass/90` (sequential after T006 — same file)
- [x] T012 [US3] Restyle the footer in `app/page.tsx`: `border-t border-hairline bg-nocturne-975` (near-black green), text → `text-sage`, keep hours + copyright content unchanged (sequential after T011 — same file)

**Checkpoint**: All three user stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Static verification and full end-to-end validation of the restyle.

- [x] T013 Run `npm run format:check` and `npm run lint` from repo root; fix any formatting/lint issues in the edited files (`app/layout.tsx`, `app/globals.css`, `app/page.tsx`, `app/components/MenuSection/index.tsx`, `app/components/MenuCard/index.tsx`, `app/components/DrinkCarousel/index.tsx`)
- [x] T014 Run `npm run typecheck` from repo root and confirm zero errors
- [x] T015 Run `npm run build` from repo root and confirm the production build succeeds and the home route prerenders
- [x] T016 Run the quickstart.md validation checklist end-to-end: hero theme, filter behavior on all pills, card hover, header/footer cohesion, carousel click → scroll-to-card (filter resets to "All"), mobile (< 640px) no horizontal overflow, longest name ("Honey Oat Cappuccino") wraps cleanly

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately (T001 baseline, T002 docs read)
- **Foundational (Phase 2)**: Depends on Setup; T003 ∥ T004 run in parallel, then T005 verifies — **BLOCKS all user stories**
- **User Stories (Phase 3–5)**: All depend on Foundational completion. Run sequentially in priority order (P1 → P2 → P3) because stories share `app/page.tsx` (US1 hero and US3 header/footer both edit it — must be sequential)
- **Polish (Phase 6)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: No dependency on other stories (needs Foundational only)
- **User Story 2 (P2)**: No dependency on other stories (needs Foundational only)
- **User Story 3 (P3)**: Same file as US1 (`app/page.tsx`) — must run after US1 completes; no functional dependency on US2

### Within Each User Story

- Components before visual interpolation: theme tokens exist globally, so each story is class-edits only
- No business logic changes anywhere; data, filter state, and carousel behavior must remain byte-identical in behavior

### Parallel Opportunities

- T003 ∥ T004 (foundational, different files: `app/layout.tsx` vs `app/globals.css`)
- T006 ∥ T007 (US1, different files: `app/page.tsx` vs `app/components/DrinkCarousel/index.tsx`) _(T007 is [P] after T006 in the list; both may be worked together)_
- T008 ∥ T009 (US2, different files: `app/components/MenuSection/index.tsx` vs `app/components/MenuCard/index.tsx`)

---

## Parallel Example: User Story 2

```bash
# Launch the two US2 implementation tasks together (different files, no deps):
Task: "T008 Restyle the menu section in app/components/MenuSection/index.tsx"
Task: "T009 Restyle menu cards in app/components/MenuCard/index.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 (T006, T007)
4. **STOP and VALIDATE**: `npm run dev` — hero renders as deep green + brass with serif headline and dark carousel backdrop
5. Deploy/demo the hero impression if ready

### Incremental Delivery

1. Complete Setup + Foundational → foundation ready (font + tokens)
2. Add User Story 1 → test independently → demo (MVP!)
3. Add User Story 2 → test independently → demo (menu elegance)
4. Add User Story 3 → test independently → demo (full cohesion)
5. Each story adds elegance without breaking the previous stories' behavior

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (hero + carousel backdrop)
   - Developer B: User Story 2 (menu section + cards)
3. Story 1 completes → Developer A does User Story 3 (header/footer, same file as hero)
4. Final integration in Polish phase

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- No automated tests to "fail first" — this is a CSS/Tailwind restyle; behavioral regressions are guarded by the contract documents (`contracts/`) and Polish-phase manual checks
- Commit after each task or logical group
- Stop at each checkpoint to validate the story independently
- Avoid: introducing hardcoded hex colors outside `@theme` in `app/globals.css` (contract: contracts/theme-tokens.md); editing `data/menu.ts` or `app/components/MenuFilterProvider/index.tsx` (contracts: contracts/menu-data.md, contracts/component-interfaces.md)
