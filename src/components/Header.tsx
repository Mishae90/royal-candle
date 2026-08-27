import { useEffect, useState } from "react";
import { useStore } from "../context/StoreContext";
import type { Page } from "../context/StoreContext";
import { BagIcon, BookmarkIcon, LogoMark, SearchIcon, Wordmark } from "./Ornaments";

const NAV: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Create Your Candle", page: "create" },
  { label: "Baptism", page: "baptism" },
  { label: "Gallery", page: "gallery" },
  { label: "Our Story", page: "story" },
];

export default function Header() {
  const { page, navigate, cartCount, notify } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [page]);

  const go = (p: Page) => {
    setMenuOpen(false);
    setSearchOpen(false);
    navigate(p);
  };

  return (
    <>
      <div className="bg-espresso text-center text-[10.5px] font-semibold tracking-[0.22em] text-gold-soft">
        <p className="mx-auto max-w-7xl px-4 py-2 uppercase">
          Handcrafted to order · Delivered across Europe in 5–7 days · Complimentary keepsake packaging
        </p>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          scrolled ? "border-gold-pale bg-ivory/92 shadow-soft backdrop-blur-md" : "border-transparent bg-ivory/60 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* logo */}
          <button type="button" onClick={() => go("home")} className="group flex items-center gap-3 text-left" aria-label="Royal Candle — home">
            <span className="text-gold transition-transform duration-500 group-hover:scale-105">
              <LogoMark className="h-11 w-11" />
            </span>
            <span className="hidden sm:block">
              <Wordmark />
            </span>
            <span className="sm:hidden">
              <span className="font-display text-lg font-semibold tracking-[0.14em] text-ink">ROYAL CANDLE</span>
            </span>
          </button>

          {/* desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV.map((n) => (
              <button
                key={n.page}
                type="button"
                onClick={() => go(n.page)}
                className={`group relative py-2 text-[12.5px] font-semibold tracking-[0.14em] uppercase transition-colors ${
                  page === n.page ? "text-gold-deep" : "text-ink-soft hover:text-ink"
                }`}
              >
                {n.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-400 ${
                    page === n.page ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setSearchOpen((v) => !v)}
                aria-expanded={searchOpen}
                aria-label="Search"
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream hover:text-gold-deep"
              >
                <SearchIcon className="h-[18px] w-[18px]" />
              </button>
              {searchOpen && (
                <div className="fade-soft absolute right-0 top-12 w-64 border border-gold-pale bg-ivory p-2 shadow-luxe">
                  <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-ink-faint">Explore</p>
                  {(
                    [
                      ["Create your candle", "create"],
                      ["The meaning of Baptism", "baptism"],
                      ["The Royal Gallery", "gallery"],
                      ["Our story", "story"],
                      ["Questions & answers", "faq"],
                      ["Contact the atelier", "contact"],
                    ] as [string, Page][]
                  ).map(([label, p]) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => go(p)}
                      className="block w-full rounded-md px-3 py-2 text-left text-[13px] font-medium text-ink-soft transition-colors hover:bg-cream hover:text-ink"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                go("create");
                notify("Your saved designs wait for you in the atelier, below the preview");
              }}
              aria-label="Saved designs"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream hover:text-gold-deep"
            >
              <BookmarkIcon className="h-[18px] w-[18px]" />
            </button>

            <button
              type="button"
              onClick={() => go("cart")}
              aria-label={`Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream hover:text-gold-deep"
            >
              <BagIcon className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-ivory">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => go("create")}
              className="ml-1 hidden items-center gap-2 bg-espresso px-5 py-2.5 text-[11px] font-bold tracking-[0.18em] text-ivory uppercase transition-all duration-300 hover:bg-gold-deep hover:shadow-soft md:inline-flex"
            >
              Create your candle
            </button>

            {/* mobile burger */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label="Menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full text-ink transition-colors hover:bg-cream lg:hidden"
            >
              <span className={`h-px w-5 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`h-px w-5 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-px w-5 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      {menuOpen && (
        <div className="fade-soft fixed inset-0 z-40 bg-ivory/98 pt-28 backdrop-blur-sm lg:hidden">
          <nav className="flex flex-col items-center gap-2 px-6" aria-label="Mobile">
            {NAV.map((n, i) => (
              <button
                key={n.page}
                type="button"
                onClick={() => go(n.page)}
                className={`fade-soft font-display text-3xl font-medium transition-colors ${page === n.page ? "text-gold-deep italic" : "text-ink hover:text-gold-deep"}`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {n.label}
              </button>
            ))}
            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="ornament-rule w-40 text-gold">
                <span className="text-[10px] tracking-[0.3em] text-gold">✦</span>
              </div>
              <button type="button" onClick={() => go("create")} className="bg-espresso px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ivory">
                Create your candle
              </button>
              <div className="mt-2 flex gap-6 text-[12px] font-semibold tracking-[0.14em] text-ink-soft uppercase">
                <button type="button" onClick={() => go("faq")} className="hover:text-gold-deep">FAQ</button>
                <button type="button" onClick={() => go("contact")} className="hover:text-gold-deep">Contact</button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
