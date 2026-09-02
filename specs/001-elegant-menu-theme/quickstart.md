# Quickstart — Validate the Elegant Midnight Green & Brass Menu

**Branch**: `001-elegant-menu-theme` | **Purpose**: Prove the restyle works end-to-end

Reference: `contracts/theme-tokens.md` (expected tokens), `contracts/component-interfaces.md` (stable behavior), `data-model.md` (unchanged data).

## Prerequisites

- Node + npm installed; dependencies already installed (`node_modules` present).
- This feature's edits applied to `app/layout.tsx`, `app/globals.css`, `app/page.tsx`, `app/components/{MenuSection,MenuCard,DrinkCarousel}/index.tsx`.

## Static verification (must pass)

```bash
npm run lint
npm run typecheck
npm run build
```

**Expected**: all three exit 0 with no errors. `next build` must compile and prerender the home route successfully (this also catches Tailwind v4 token generation issues and font load failures).

## Visual & interaction checks

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

### 1. Hero — "wow" moment (P1)

- [ ] Page background is deep midnight green (`#0C1F1C`), no leftover stone/white.
- [ ] Eyebrow line is brass, uppercase, letter-spaced; headline is ivory serif (Cormorant Garamond) with a brass divider rule.
- [ ] 3D drink carousel renders against a dark green backdrop (brass ring/highlights not inverted).

### 2. Menu browsing (P2)

- [ ] Section title uses the serif font; subtitle is sage.
- [ ] Filter pills: inactive = brass outline on dark; active = **brass fill with dark-green text**. Clicking each of the 5 categories + "All" updates the grid (same item set as `data/menu.ts`).
- [ ] Each card: dark green surface, thin gold hairline border, serif ivory name, brass price, sage description.
- [ ] Hovering a card shows a subtle brass glow/border and gentle image zoom.

### 3. Cohesion (P3)

- [ ] Sticky header is dark/translucent with a brass wordmark and brass "View Menu" pill; text stays readable over scrolling content.
- [ ] Footer is dark with a gold hairline top border and ivory/sage text; hours + copyright correct.

### 4. Regression checks (contract safety)

- [ ] Clicking a carousel drink scrolls to its card (filter resets to "All").
- [ ] `#espresso-macchiato`-style anchors still resolve — `getDrinkId` ids preserved on cards.
- [ ] Resize to mobile (< 640px): no horizontal scroll; grid → single column; pills wrap; carousel fits.
- [ ] Longest drink name ("Honey Oat Cappuccino") wraps cleanly in its card.

## Expected failure signals (and what they mean)

| Symptom                                     | Likely cause                                                                                   |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Serif not applied                           | `--font-cormorant` not wired in `layout.tsx`, or `weight` array omitted                        |
| Utilities like `bg-nocturne-950` unresolved | token missing/typo in `@theme` block of `globals.css`                                          |
| Ivory text on brass pill unreadable         | inverse pairing reverted (use dark-green text on brass)                                        |
| Layout regressions                          | a token-based class replaced a layout/behavior class — see `contracts/component-interfaces.md` |

**Done when**: all static checks pass and every box above is checked.
