"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MenuCategory } from "../../../data/menu";

export type Filter = MenuCategory | "All";

export const ALL_FILTER: Filter = "All";

interface MenuFilterContextValue {
  active: Filter;
  setActive: (filter: Filter) => void;
  selectDrink: (drinkId: string) => void;
}

const MenuFilterContext = createContext<MenuFilterContextValue | null>(null);

export function MenuFilterProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<Filter>(ALL_FILTER);

  const selectDrink = useCallback((drinkId: string) => {
    setActive(ALL_FILTER);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById(drinkId)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }, []);

  const value = useMemo(
    () => ({ active, setActive, selectDrink }),
    [active, selectDrink]
  );

  return (
    <MenuFilterContext.Provider value={value}>
      {children}
    </MenuFilterContext.Provider>
  );
}

export function useMenuFilter() {
  const context = useContext(MenuFilterContext);
  if (!context) {
    throw new Error("useMenuFilter must be used within MenuFilterProvider");
  }
  return context;
}
