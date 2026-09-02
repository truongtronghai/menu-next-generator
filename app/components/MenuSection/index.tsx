"use client";

import { CATEGORIES, MENU_ITEMS, SHOP_NAME } from "../../../data/menu";
import { useMenuFilter, type Filter } from "../MenuFilterProvider";
import MenuCard from "../MenuCard";

const FILTERS: Filter[] = ["All", ...CATEGORIES];

export default function MenuSection() {
  const { active, setActive } = useMenuFilter();

  const visibleItems =
    active === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === active);

  return (
    <section id="menu" className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="mb-10 text-center">
        <h2 className="font-serif text-3xl font-semibold text-ivory sm:text-4xl">
          Our {SHOP_NAME} Menu
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sage">
          Hand-picked beans, slow-infused teas and seasonal favorites, crafted
          fresh every morning.
        </p>
      </div>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
              active === filter
                ? "border-brass bg-brass text-nocturne-950"
                : "border-brass/40 bg-transparent text-ivory hover:border-brass hover:text-brass"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item) => (
          <MenuCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
