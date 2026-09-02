# Contract — Theme Tokens ("Nocturne" Midnight Green & Brass)

**Branch**: `001-elegant-menu-theme` | **Status**: New (defined by this feature)

This is the visual design contract. Implementation MUST produce these tokens in `app/globals.css` (Tailwind v4 `@theme`) and bind the serif font in `app/layout.tsx`; all styled components MUST consume only these tokens.

## Palette

| Token                  | Utility example           | Value                   | Purpose                                |
| ---------------------- | ------------------------- | ----------------------- | -------------------------------------- |
| `--color-nocturne-975` | `bg-nocturne-975`         | `#061210`               | near-black green depth                 |
| `--color-nocturne-950` | `bg-nocturne-950`         | `#0C1F1C`               | page background                        |
| `--color-nocturne-800` | `bg-nocturne-800`         | `#12332C`               | card / surface                         |
| `--color-brass`        | `text-brass` / `bg-brass` | `#C9A35C`               | accents, prices, active pill, dividers |
| `--color-ivory`        | `text-ivory`              | `#F3EFE4`               | headings / primary text                |
| `--color-sage`         | `text-sage`               | `#A9B8B0`               | descriptions / meta                    |
| `--color-hairline`     | `border-hairline`         | `rgba(201,163,92,0.30)` | gold hairline borders                  |

## Typography

| Token          | Value                    | Purpose                                       |
| -------------- | ------------------------ | --------------------------------------------- |
| `--font-serif` | `var(--font-cormorant)`  | display headings, drink names, section titles |
| `--font-sans`  | `var(--font-geist-sans)` | body, filters, meta (existing, reused)        |

`--font-cormorant` MUST be produced by `Cormorant_Garamond` in `app/layout.tsx`:
`next/font/google` with `subsets: ["latin"]`, `weight: ["400","500","600","700"]`, `variable: "--font-cormorant"`.

## Composition rules (how elements may combine)

- **Active filter pill**: dark-green text on brass fill → `text-nocturne-950 bg-brass` (inverse pairing preserves contrast; ivory-on-brass would fail WCAG AA).
- **Inactive pill**: `border-brass/40 text-ivory`, hover `border-brass text-brass` on transparent/dark surface.
- **Menu card**: `bg-nocturne-800`, `border hairline`, serif name in `text-ivory`, price pill `bg-brass/15 text-brass` (or brass fill per contrast rule), description `text-sage`.
- **Hairline dividers**: `border-t hairline` for section rules and footer top edge.
- **Hero**: ivory serif headline, brass eyebrow (uppercase, wide tracking), brass rule divider.

## Invariants

1. No hardcoded hex colors outside `@theme` in any component file.
2. All foreground–background pairs meet WCAG AA (see research.md §R-3).
3. `--font-serif` is applied via `font-serif` utility (Tailwind maps `--font-serif`).
4. Browser fallbacks: for any missing token, component should degrade gracefully (dark background default) rather than crash.
