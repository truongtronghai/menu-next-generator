export type MenuCategory =
  "Espresso" | "Milk-Based" | "Tea" | "Cold Brew" | "Seasonal";

export interface MenuItem {
  name: string;
  price: number;
  description: string;
  category: MenuCategory;
  image: string;
}

export const SHOP_NAME = "Brew & Co.";

export function getDrinkId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const CATEGORIES: MenuCategory[] = [
  "Espresso",
  "Milk-Based",
  "Tea",
  "Cold Brew",
  "Seasonal",
];

export const MENU_ITEMS: MenuItem[] = [
  {
    name: "Classic Espresso",
    price: 3.5,
    description: "A rich double shot pulled from our house roast blend.",
    category: "Espresso",
    image: "/images/drinks/classic-espresso.jpg",
  },
  {
    name: "Café Latte",
    price: 4.5,
    description:
      "Silky steamed milk over a double espresso with a delicate foam cap.",
    category: "Milk-Based",
    image: "/images/drinks/cafe-latte.jpg",
  },
  {
    name: "Jasmine Green Tea",
    price: 3.75,
    description:
      "Delicately scented jasmine with a clean, refreshing green tea base.",
    category: "Tea",
    image: "/images/drinks/jasmine-green-tea.jpg",
  },
  {
    name: "Nitro Cold Brew",
    price: 5.0,
    description:
      "Velvety, nitrogen-infused cold brew poured with a cascading head.",
    category: "Cold Brew",
    image: "/images/drinks/nitro-cold-brew.jpg",
  },
  {
    name: "Honey Oat Cappuccino",
    price: 5.25,
    description:
      "Espresso with frothed oat milk, finished with a ribbon of local honey.",
    category: "Seasonal",
    image: "/images/drinks/honey-oat-cappuccino.jpg",
  },
  {
    name: "Iced Vanilla Latte",
    price: 4.75,
    description:
      "Cold milk, espresso and vanilla syrup over ice for a smooth pick-me-up.",
    category: "Milk-Based",
    image: "/images/drinks/iced-vanilla-latte.jpg",
  },
  {
    name: "Earl Grey Tea",
    price: 3.5,
    description: "Classic bergamot black tea, brewed to order and served hot.",
    category: "Tea",
    image: "/images/drinks/earl-grey-tea.jpg",
  },
  {
    name: "Cinnamon Cold Brew",
    price: 5.5,
    description:
      "Slow-steeped cold brew touched with cinnamon and a whisper of cardamom.",
    category: "Cold Brew",
    image: "/images/drinks/cinnamon-cold-brew.jpg",
  },
  {
    name: "Matcha Latte",
    price: 5.25,
    description: "Ceremonial-grade matcha whisked into velvety steamed milk.",
    category: "Seasonal",
    image: "/images/drinks/matcha-latte.jpg",
  },
  {
    name: "Espresso Macchiato",
    price: 3.75,
    description: "A double espresso marked with a dollop of steamed milk foam.",
    category: "Espresso",
    image: "/images/drinks/espresso-macchiato.jpg",
  },
];
