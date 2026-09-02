# Contract — Component Interfaces

**Branch**: `001-elegant-menu-theme` | **Status**: Stable (props/context unchanged; styling changes only)

The restyle alters class markup and consumed tokens, **never** these interfaces. Any change here is a breaking change for consumers.

## MenuFilterProvider / useMenuFilter

```ts
type Filter = MenuCategory | "All";
const ALL_FILTER: Filter = "All";

interface MenuFilterContextValue {
  active: Filter;
  setActive: (filter: Filter) => void;
  selectDrink: (drinkId: string) => void; // resets active to "All", smooth-scrolls to card
}
```

- `MenuFilterProvider({ children })` — context provider (must remain a client component).
- `useMenuFilter(): MenuFilterContextValue` — throws if used outside the provider.

## MenuCard

```ts
interface MenuCardProps {
  item: MenuItem;
}
```

- Renders `<article id={getDrinkId(item.name)}>` — the **id** is the scroll target for `selectDrink`, so anchor behavior must be preserved after restyle.

## RoundCarousel (vendored "Originkit" — 3D logic immutable)

```ts
interface RoundCarouselProps {
  images?: { src: string }[];
  imageWidth?: number; // default 300
  imageHeight?: number; // default 300
  spacing?: number; // default 3
  speed?: number; // default 2
  direction?: "right" | "left";
  drag?: boolean;
  sensitivity?: number;
  tilt?: number;
  perspective?: number;
  cornerRadius?: number;
  innerDim?: number;
  background?: string; // ← the ONLY prop the restyle overrides (dark green)
  style?: React.CSSProperties;
  onImageClick?: (src: string) => void;
}
```

Contract: do **not** modify this component's implementation or default values. Pass `background` to restyle the backdrop.

## DrinkCarousel

```ts
interface CarouselImage {
  src: string;
  drinkId: string;
}
export default function DrinkCarousel(): JSX.Element;
```

- Dedupes menu images and maps click → `selectDrink(drinkId)` (unchanged). Restyle = forward a themed `background` to `RoundCarousel`.

## MenuSection

```ts
export default function MenuSection(): JSX.Element;
```

- Builds pills from `["All", ...CATEGORIES]` and renders filtered `MenuCard`s (unchanged logic). Restyle = token-based styling of section heading and pills.

## Contract rules

- No changes to any prop/context/return signature above.
- No changes to `MenuFilterProvider` source at all.
- `RoundCarousel` implementation and defaults untouched.
- Anchor ids on menu cards preserved (scroll integration).
