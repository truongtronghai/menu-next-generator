"use client";

import { useMemo } from "react";
import RoundCarousel from "../RoundCarousel";
import { getDrinkId, MENU_ITEMS } from "../../../data/menu";
import { useMenuFilter } from "../MenuFilterProvider";

interface CarouselImage {
  src: string;
  drinkId: string;
}

export default function DrinkCarousel() {
  const { selectDrink } = useMenuFilter();

  const images = useMemo<CarouselImage[]>(() => {
    const seen = new Set<string>();
    const distinct: CarouselImage[] = [];
    for (const item of MENU_ITEMS) {
      if (seen.has(item.image)) continue;
      seen.add(item.image);
      distinct.push({ src: item.image, drinkId: getDrinkId(item.name) });
    }
    return distinct;
  }, []);

  const handleImageClick = (src: string) => {
    const match = images.find((image) => image.src === src);
    if (match) selectDrink(match.drinkId);
  };

  return (
    <RoundCarousel
      images={images.map(({ src }) => ({ src }))}
      onImageClick={handleImageClick}
      background="#0c1f1c"
    />
  );
}
