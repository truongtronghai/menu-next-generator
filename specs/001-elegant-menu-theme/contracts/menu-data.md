# Contract — Menu Data Layer

**Branch**: `001-elegant-menu-theme` | **Status**: Unchanged (locked by this feature)

The `data/menu.ts` module is the single source of truth for menu content. This contract is **unchanged** and **must not be edited** by the restyle; the UI consumes it only.

## Exports

### Types

```ts
type MenuCategory =
  "Espresso" | "Milk-Based" | "Tea" | "Cold Brew" | "Seasonal";

interface MenuItem {
  name: string;
  price: number; // >= 0, formatted as $X.YY
  description: string;
  category: MenuCategory;
  image: string; // absolute photo URL
}
```

### Runtime values

- `SHOP_NAME: string` — brand name shown in header/footer ("Brew & Co.").
- `CATEGORIES: MenuCategory[]` — ordered category list (drives filter pills).
- `MENU_ITEMS: MenuItem[]` — the drink catalog (drives cards + carousel).
- `getDrinkId(name: string): string` — slug used for card anchors (`#espresso-macchiato`) and `selectDrink`.

## Consumers (unchanged)

- `app/components/MenuSection` — `CATEGORIES`, `MENU_ITEMS`, `SHOP_NAME`
- `app/components/MenuCard` — `MenuItem`, `getDrinkId`
- `app/components/DrinkCarousel` — `MENU_ITEMS`, `getDrinkId`
- `app/components/MenuFilterProvider` — `MenuCategory` (for `Filter` type)

**Contract rule**: this feature changes presentation only. Adding/removing/renaming any export above, or any `MenuItem` value, is out of scope for the restyle.
