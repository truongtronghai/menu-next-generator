import type { MenuItem } from "../../../data/menu";
import { getDrinkId } from "../../../data/menu";

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  return (
    <article
      id={getDrinkId(item.name)}
      className="group scroll-mt-28 flex flex-col overflow-hidden rounded-2xl border border-hairline bg-nocturne-800 shadow-sm transition-shadow hover:border-brass/60 hover:shadow-[0_0_30px_rgba(201,163,92,0.15)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-nocturne-975">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg font-semibold text-ivory">
            {item.name}
          </h3>
          <span className="shrink-0 rounded-full bg-brass/15 px-3 py-1 text-sm font-semibold text-brass">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-sage">{item.description}</p>
      </div>
    </article>
  );
}
