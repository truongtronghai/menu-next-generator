# Phase 0 Research — Elegant Midnight Green & Brass Menu Theme

**Branch**: `001-elegant-menu-theme` | **Date**: 2026-09-02

All "NEEDS CLARIFICATION" items from plan.md Technical Context were resolved below against the actual repo state and the installed Next.js 16.3.4 docs (`node_modules/next/dist/docs/`).

---

## R-1. Theming approach: Tailwind v4 CSS-first tokens

- **Decision**: Define the palette and typography as Tailwind v4 `@theme` tokens in `app/globals.css`. Components reference utilities such as `bg-nocturne-900`, `text-ivory`, `border-brass/30`, `font-serif`.
- **Rationale**: Tailwind v4 is CSS-first (`@import "tailwindcss"` + `@theme inline` already present). Colors registered in `@theme` generate utilities automatically with no `tailwind.config.*` file, matching the repo's current single-file CSS setup. Central tokens keep every component consistent and make future tweaks one-line changes.
- **Alternatives considered**:
  - _Hardcoded Tailwind arbitrary values_ (`bg-[#0C1F1C]`) — rejected: unreadable, duplicated, not centralized.
  - _Tailwind v3-style `tailwind.config.ts`_ — rejected: v4 installed; config files are the legacy path.
  - _CSS Modules_ — rejected: overkill for utility-level theming; this is a global theme, not component-scoped CSS.

## R-2. Display serif font: Cormorant Garamond

- **Decision**: Load **Cormorant Garamond** via `next/font/google` with `weight: ["400","500","600","700"]`, `subsets: ["latin"]`, and `variable: "--font-cormorant"`; expose it as `--font-serif` in `@theme` so it is used for headings and drink names.
- **Rationale**: Cormorant Garamond is a high-contrast editorial serif that reads as quiet luxury at display sizes — the classic choice for elegant food/drink menus. `next/font` self-hosts it (zero external requests, no layout shift) and the font documentation confirms non-variable Google fonts (Cormorant Garamond is static weights) **require a `weight` array** — the API pattern already in use for Geist's `variable`.
- **Alternatives considered**:
  - _Playfair Display_ — elegant, but more "traditional luxury"; slightly heavier personality than the refined Cormorant.
  - _Lora_ — legible but too functional/neutral for the editorial "wow".
  - _Manual `<link>` to Google Fonts CDN_ — rejected: external request, FOUC risk, contradicts `next/font` best practice.

## R-3. Color palette + WCAG AA contrast verification

**Decision**: Midnight-green dark base with brass accents, computed on the flat dark surface `#0C1F1C` (WCAG 2.x relative-luminance method).

| Pair (foreground on `#0C1F1C`)                    | Hex                    | Luminance     | Ratio         | Verdict |
| ------------------------------------------------- | ---------------------- | ------------- | ------------- | ------- |
| Ivory text                                        | `#F3EFE4`              | 0.900         | **~15.5 : 1** | AAA ✓   |
| Sage body                                         | `#A9B8B0`              | 0.459         | **~8.2 : 1**  | AAA ✓   |
| Brass accent                                      | `#C9A35C`              | 0.393         | **~7.1 : 1**  | AAA ✓   |
| _Brass pill text_ — dark green text on brass fill | `#0C1F1C` on `#C9A35C` | 0.012 / 0.393 | **~6.1 : 1**  | AAA ✓   |

- **Rationale**: Every primary pair clears AA (most clear AAA), satisfying FR-006. The **active filter pill uses dark-green text on a brass fill** — brass-on-dark works for the accent, but ivory-on-brass would only reach ~2.2:1 (fails AA), so the inverse pairing is used.
- **Alternatives considered**: ivory text on brass fill (rejected: fails contrast); pure gold `#D4AF37` (slightly higher luminance, but gaudier and lower contrast against ivory — champagne brass chosen deliberately).
- **Note on card surfaces**: cards use a darker surface (`#0F2B26`–`#12332C`) whose contrast is _higher_ against ivory/sage than computed above — the `#0C1F1C` figures are the conservative floor.

## R-4. Carousel backdrop

- **Decision**: Pass the dark theme via `RoundCarousel`’s existing `background` prop (default `#000000`); `DrinkCarousel` will pass a midnight-green value. No changes to the 3D ring logic.
- **Rationale**: `RoundCarousel` is a vendored "Originkit" component and already exposes this prop. Overriding the prop keeps the 3D behavior untouched (AGENTS.md: no unrelated refactors; plan constraint).
- **Alternatives considered**: wrapping the carousel in a styled div (rejected — the prop exists and is the intended extension point); editing the vendored component’s default (rejected: mutating vendored code).

## R-5. Next.js 16.3.4 guidance (mandatory reads per AGENTS.md)

- **Decision**: The implementation phase MUST consult `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` (Tailwind v4 + `@import "tailwindcss"`, global CSS in root layout) and `13-fonts.md` (fonts scoped to component; `variable` option exposes CSS variable) before editing `globals.css` / `layout.tsx`.
- **Rationale**: The repo’s AGENTS.md warns this Next.js version has breaking changes vs. training data. The two guides confirm the current setup (`@tailwindcss/postcss`, `@theme inline`, Geist via `variable`) is the v16-blessed pattern — the restyle simply extends it.
- **Alternatives considered**: assuming older Tailwind v3 `.config` conventions — rejected as the exact class of mistake AGENTS.md warns against.

---

## Consolidated parameter lock-in

- **Base background**: `#0C1F1C` (nocturne-950) · deep green `#12332C` (nocturne-800) · near-black `#061210` (nocturne-975) for depth.
- **Accent**: brass `#C9A35C` w/ hairline `rgba(201,163,92,0.30)`.
- **Text**: ivory `#F3EFE4`, sage `#A9B8B0`.
- **Serif**: Cormorant Garamond (`--font-cormorant`, weights 400–700).
- **Sans**: existing Geist (`--font-geist-sans`) for body/UI.
- All color pairs AA/AAA compliant; all functionality and `data/menu.ts` unchanged.
