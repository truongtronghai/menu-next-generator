# Feature Specification: Elegant Midnight Green & Brass Menu Theme

**Feature Branch**: `001-elegant-menu-theme`

**Created**: 2026-09-02

**Status**: Approved

**Input**: User description: "build a drink shop menu with elegant theme and color to impress customer"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Elegant First Impression (Priority: P1)

As a customer landing on the Brew & Co. page, I am greeted by a refined midnight-green and brass hero: an ivory serif headline with a brass "eyebrow" label, a soft brass-green glow, and the signature 3D drink carousel. This visual statement is what makes the shop feel premium and worth browsing.

**Why this priority**: The hero is the single strongest "wow" moment and the direct expression of the "elegant theme to impress customers" requirement.

**Independent Test**: Render the home page at desktop width and confirm the hero uses the new palette (deep green background, brass accents, serif headline) and the carousel renders. This delivers the headline impression on its own even before the menu section restyle.

**Acceptance Scenarios**:

1. **Given** a fresh load of the home page at desktop viewport, **When** the hero renders, **Then** the background is deep midnight green, the headline is ivory serif text, and accent elements (eyebrow, divider, button) use brass.
2. **Given** the hero section, **When** the customer clicks a carousel drink, **Then** the filter resets to "All" and the page smooth-scrolls to that drink's card.

---

### User Story 2 - Elegant Menu Browsing (Priority: P2)

As a customer, I can filter the drinks by category using brass-styled pills and read refined dark cards (serif name, brass price, sage description) with gold hairlines and a soft hover glow.

**Why this priority**: The menu grid and filters are the primary interaction; restyling them makes the whole browse experience feel elegant, not just the hero.

**Independent Test**: Click every filter pill and confirm the visible cards update and each card follows the midnight-green/brass treatment. This delivers the browse experience independently of the hero.

**Acceptance Scenarios**:

1. **Given** the menu section, **When** a category pill is active, **Then** it is brass-filled with dark green text and the grid shows only items of that category.
2. **Given** a menu card, **When** it is hovered, **Then** a subtle brass glow/border appears and the image zooms gently.
3. **Given** the filter state "Tea", **When** the user switches to "All", **Then** all items render with no stale filtering.

---

### User Story 3 - Cohesive Theme Details (Priority: P3)

As a customer, the header and footer match the dark elegant theme — a dark glass sticky header with a brass wordmark and "View Menu" pill, and a matching footer with a gold hairline — so nothing breaks the premium illusion.

**Why this priority**: Completes the polish; lower priority because it does not affect core interaction.

**Independent Test**: Visually scan header and footer and confirm they use the same color/token system as hero and cards.

**Acceptance Scenarios**:

1. **Given** the page, **When** scrolling, **Then** the header is a dark translucent bar with a brass wordmark that stays readable over content.
2. **Given** the page footer, **When** rendered, **Then** it uses the dark palette, gold hairline top border, and ivory/sage text.

---

### Edge Cases

- **Mobile viewport (< 640px)**: grid collapses to one column, filter pills wrap, carousel still fits — no horizontal overflow.
- **Long drink names**: card name/price row wraps gracefully; price pill never overflows.
- **Reused carousel images**: `DrinkCarousel` already dedupes images; behavior unchanged.
- **Empty images array**: `RoundCarousel` already falls back to `DEFAULT_IMAGES`; background prop must remain honored.
- **Reduced-motion preference**: carousel motion is pre-existing and out of scope; no new motion is introduced.
- **Text contrast**: active pill uses dark-green text on brass (brass + ivory fails WCAG AA for normal text) — see research.md ratios.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: Home page MUST apply the midnight-green + brass theme consistently to header, hero, carousel backdrop, filters, menu cards, and footer.
- **FR-002**: Display typography MUST use the Cormorant Garamond serif (loaded via `next/font/google`, self-hosted) for the headline, section title, and drink names.
- **FR-003**: Existing menu data (`data/menu.ts`), filtering logic, and carousel select-and-scroll behavior MUST remain functionally unchanged.
- **FR-004**: Menu cards MUST present the drink name in serif ivory, price in a brass pill/medallion, and description in sage text on a dark green surface with a gold hairline border.
- **FR-005**: Theme colors and fonts MUST be defined as Tailwind v4 `@theme` tokens in `app/globals.css` so all components consume the same central tokens.
- **FR-006**: All text/background color pairs MUST meet WCAG AA contrast (see research.md §R-3 for computed ratios).
- **FR-007**: Layout MUST remain responsive across mobile, tablet, and desktop widths with no horizontal scroll.

### Key Entities _(include if feature involves data)_

- **MenuItem** _(existing, unchanged)_: name, price, description, category, image — the drink catalog rendered by the menu.
- **MenuCategory / Filter** _(existing, unchanged)_: the union of 5 categories plus "All" used by filters and carousel selection.
- **ThemeToken** _(new)_: the centralized color/font design tokens (midnight green, brass, ivory, sage, hairline, serif font) consumed by every styled element.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: `npm run lint`, `npm run typecheck`, and `npm run build` all pass with zero errors after the restyle.
- **SC-002**: All existing interactions still work after the restyle: category filtering updates the grid, and clicking a carousel drink scrolls to its card.
- **SC-003**: Every text–background pair used on the page meets WCAG AA; computed contrast ratios are recorded in research.md.
- **SC-004**: The serif and sans fonts load without layout shift / FOUC (fonts self-hosted by `next/font`, exposed as CSS variables at build time).
- **SC-005**: The page renders the full theme at mobile, tablet, and desktop widths with no horizontal scrolling (manual checks in quickstart.md).

## Assumptions

- The restyle retains the "Brew & Co." identity and coffee-house content; no rebranding.
- No data changes, no new routes, no new npm dependencies (fonts self-host via `next/font/google`, already installed in the framework).
- TDD is not applicable: this is a pure CSS/Tailwind visual restyle (per AGENTS.md guidance on CSS/Tailwind changes).
- RoundCarousel is a vendored "Originkit" component; changes are limited to passing the dark theme background, not altering its 3D logic.
