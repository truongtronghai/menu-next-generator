import DrinkCarousel from "./components/DrinkCarousel";
import MenuSection from "./components/MenuSection";
import { MenuFilterProvider } from "./components/MenuFilterProvider";
import { SHOP_NAME } from "../data/menu";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-nocturne-950 text-ivory">
      <Header shopName={SHOP_NAME} />

      <MenuFilterProvider>
        <section className="relative flex flex-col items-center gap-10 overflow-hidden px-6 py-16 sm:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-24 z-0 mx-auto h-80 w-full max-w-3xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,163,92,0.16),transparent_70%)]"
          />
          <div className="relative z-9 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brass">
              Specialty Coffee House
            </p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-ivory sm:text-6xl">
              Crafted Caffeine, <br className="hidden sm:block" />
              Served Daily
            </h1>
            <div
              aria-hidden
              className="mx-auto mt-6 h-px w-24 bg-linear-to-r from-transparent via-brass to-transparent"
            />
            <p className="mx-auto mt-5 max-w-xl text-lg text-sage">
              From single-origin espresso to silky cold brew, explore our menu
              and find your new favorite cup.
            </p>
          </div>
          <div className="relative z-9 h-72 w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl shadow-black/40">
            <DrinkCarousel />
          </div>
        </section>

        <MenuSection />
      </MenuFilterProvider>

      <Footer shopName={SHOP_NAME} />
    </main>
  );
}
