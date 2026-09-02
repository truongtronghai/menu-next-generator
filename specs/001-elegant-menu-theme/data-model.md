# Data Model — Elegant Midnight Green & Brass Menu Theme

**Branch**: `001-elegant-menu-theme` | **Date**: 2026-09-02

This feature introduces **no changes to persistent or catalog data**. The domain entities (`MenuItem`, `MenuCategory`, `Filter`) are documented here because they are the unchanged contracts the restyle depends on; the one **new** model is the visual **ThemeToken** set defined for the restyle.

---

## 1. MenuItem (existing — unchanged)

The drink catalog and the single source of menu content.

| Field         | Type           | Constraint                                                        |
| ------------- | -------------- | ----------------------------------------------------------------- |
| `name`        | `string`       | non-empty, unique in practice (used for anchors via `getDrinkId`) |
| `price`       | `number`       | `>= 0`; formatted `$X.YY`                                         |
| `description` | `string`       | non-empty                                                         |
| `category`    | `MenuCategory` | one of the 5 categories below                                     |
| `image`       | `string`       | absolute URL of drink photo                                       |

**Source**: `data/menu.ts` (`MenuItem`, `MENU_ITEMS`). Not modified by this feature.

## 2. MenuCategory / Filter (existing — unchanged)

| Type                 | Value                                                              |
| -------------------- | ------------------------------------------------------------------ |
| `MenuCategory`       | `"Espresso" \| "Milk-Based" \| "Tea" \| "Cold Brew" \| "Seasonal"` |
| `Filter`             | `MenuCategory \| "All"`                                            |
| `CATEGORIES`         | ordered array of the 5 categories                                  |
| `Filter[]` for pills | `["All", ...CATEGORIES]`                                           |

**Relationships**: each `MenuItem.category` references one `MenuCategory`; `Filter` adds the "All" sentinel used by both the pill UI and the carousel's `selectDrink` reset.

### State transitions (existing — unchanged)

- Filter state: `"All" → <category> → "All"` (or any change). Held in `MenuFilterProvider.active`.
- `selectDrink(drinkId)`: sets `active = "All"`, then smooth-scrolls to the card with `id = drinkId` after two animation frames.

## 3. ThemeToken (new — defined centrally in `app/globals.css` via Tailwind v4 `@theme`)

The visual model: a single set of color + typography tokens all components consume as utilities.

| Token (utility group)  | Value                    | Used for                                |
| ---------------------- | ------------------------ | --------------------------------------- |
| `--color-nocturne-975` | `#061210`                | depth / footer fade                     |
| `--color-nocturne-950` | `#0C1F1C`                | page background (base)                  |
| `--color-nocturne-800` | `#12332C`                | card/surface background                 |
| `--color-brass`        | `#C9A35C`                | accents, prices, active pills, dividers |
| `--color-ivory`        | `#F3EFE4`                | headings, primary text                  |
| `--color-sage`         | `#A9B8B0`                | descriptions, meta, muted text          |
| `--color-hairline`     | `rgba(201,163,92,0.30)`  | gold hairline borders                   |
| `--font-serif`         | `var(--font-cormorant)`  | display headings, drink names           |
| `--font-sans`          | `var(--font-geist-sans)` | body, filters, meta (existing)          |

**Relationships**: `--font-serif` binds to the `Cormorant_Garamond` `variable` from `next/font/google` declared in `app/layout.tsx`; `--color-*` tokens generate Tailwind utilities (`bg-nocturne-950`, `text-brass`, `border-hairline`, `font-serif`, …). Every styled element in `page.tsx`, `MenuSection`, and `MenuCard` must reference these tokens only — no stray hardcoded hex colors (contract: `contracts/theme-tokens.md`).

### Invariants / validation

- All text–background pairs computed against `#0C1F1C` meet WCAG AA (AAA) — see `research.md` §R-3.
- Active filter pill = dark-green text (`#0C1F1C`) on brass fill (`#C9A35C`) to preserve contrast.
- No component may introduce its own palette values outside `@theme`.
