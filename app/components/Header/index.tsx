const Header = ({ shopName }: { shopName: string }) => {
  return (
    <header className="sticky top-0 z-10 border-b border-hairline bg-nocturne-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="font-serif text-xl font-semibold tracking-tight text-brass">
          {shopName}
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
  );
};

export default Header;
