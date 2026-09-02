import DrinkCarousel from "./components/DrinkCarousel";
import MenuSection from "./components/MenuSection";
import { MenuFilterProvider } from "./components/MenuFilterProvider";
import { SHOP_NAME } from "../data/menu";

export default function Home() {
  return (
    <main className="min-h-screen bg-nocturne-950 text-ivory">
      <header className="sticky top-0 z-10 border-b border-hairline bg-nocturne-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-serif text-xl font-semibold tracking-tight text-brass">
            {SHOP_NAME}
          </span>
          <nav>
            <a
              href="#menu"
              className="flex items-center justify-center rounded-full bg-brass px-5 py-2 text-sm font-medium text-nocturne-950 transition-colors hover:bg-brass/90"
            >
              View Menu
            </a>
          </nav>
        </div>
      </header>

      <MenuFilterProvider>
        <section className="relative flex flex-col items-center gap-10 overflow-hidden px-6 py-16 sm:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-24 z-0 mx-auto h-80 w-full max-w-3xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,163,92,0.16),transparent_70%)]"
          />
          <div className="relative z-10 text-center">
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
          <div className="relative z-10 h-72 w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl shadow-black/40">
            <DrinkCarousel />
          </div>
        </section>

        <MenuSection />
      </MenuFilterProvider>

      <footer className="border-t border-hairline bg-nocturne-975">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-sage sm:flex-row">
          <span>
            © {new Date().getFullYear()} {SHOP_NAME}. All rights reserved.
          </span>
          <div className="flex flex-col items-center gap-1 sm:items-end">
            <span>123 Coffee Street, San Francisco, CA</span>
            <span>(415) 555-0123</span>
            <span>Open daily · 7:00 AM – 7:00 PM</span>
            <a
              href="https://maps.google.com/?q=123+Coffee+Street,+San+Francisco,+CA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full px-4 py-1.5 text-brass transition-colors hover:text-brass/80"
            >
              Find us on Google Maps
            </a>
            <div className="mt-2 flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-nocturne-800 text-sage transition-colors hover:border-brass hover:text-brass"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.43-4.92 8.43-9.94Z" />
                </svg>
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-nocturne-800 text-sage transition-colors hover:border-brass hover:text-brass"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.13 2 11.23c0 3.12 1.8 5.87 4.56 7.39V22l4.12-2.26c.43.06.87.1 1.32.1 5.52 0 10-4.13 10-9.23S17.52 2 12 2Z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-nocturne-800 text-sage transition-colors hover:border-brass hover:text-brass"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
