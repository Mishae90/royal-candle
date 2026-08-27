import { useMemo, useState } from "react";
import Reveal from "../components/Reveal";
import { ArrowIcon, BagIcon, BlossomIcon, OrnamentDivider } from "../components/Ornaments";
import { useStore } from "../context/StoreContext";
import { DEFAULT_CONFIG, fmt } from "../data/catalog";
import { CATEGORY_LABELS } from "../data/products";
import type { ProductCategory } from "../data/products";

export default function Boutique() {
  const { products, addProductToCart, setDraft, navigate } = useStore();
  const [filter, setFilter] = useState<ProductCategory | "all">("all");

  const cats = useMemo(() => {
    const present = Array.from(new Set(products.map((p) => p.category)));
    return present;
  }, [products]);

  const shown = products.filter((p) => filter === "all" || p.category === filter);

  const composeWith = (id: string, category: ProductCategory) => {
    const base = { ...DEFAULT_CONFIG, customExtras: {} };
    if (category === "candle") base.customCandle = id;
    else if (category !== "boutique") base.customExtras = { [category]: id };
    setDraft(base);
    navigate("create");
  };

  return (
    <main>
      <section className="border-b border-gold-pale bg-cream/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">La Boutique</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-medium leading-[1.04] text-ink sm:text-6xl lg:text-7xl">
            From our hands, <em className="text-gold-deep italic">to yours</em>
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            The candles and keepsakes our atelier has ready today — each one photographed as it truly is. Add them to your
            order, or begin a composition around the one you love.
          </p>
          {cats.length > 0 && (
            <div className="mt-9 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFilter("all")}
                aria-pressed={filter === "all"}
                className={`border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  filter === "all" ? "border-espresso bg-espresso text-ivory" : "border-gold-soft bg-ivory text-ink-soft hover:border-espresso hover:text-ink"
                }`}
              >
                All ({products.length})
              </button>
              {cats.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  aria-pressed={filter === c}
                  className={`border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    filter === c ? "border-espresso bg-espresso text-ivory" : "border-gold-soft bg-ivory text-ink-soft hover:border-espresso hover:text-ink"
                  }`}
                >
                  {CATEGORY_LABELS[c]}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        {products.length === 0 ? (
          <div className="mx-auto max-w-xl border border-gold-pale bg-shell px-8 py-16 text-center">
            <span className="mx-auto inline-block text-gold">
              <BlossomIcon className="h-10 w-10" />
            </span>
            <h2 className="mt-6 font-display text-3xl font-medium text-ink">The boutique is about to open</h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
              The atelier is still placing its first creations on these shelves. Meanwhile, every candle can be composed
              personally — ribbon by ribbon, blossom by blossom.
            </p>
            <button
              type="button"
              onClick={() => navigate("create")}
              className="group mt-8 inline-flex items-center gap-3 bg-espresso px-9 py-4 text-[11.5px] font-bold uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:bg-gold-deep"
            >
              Create your candle
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {shown.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 110}>
                <article className="group flex h-full flex-col border border-gold-pale bg-shell transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe">
                  <div className="relative overflow-hidden">
                    <div className="aspect-square overflow-hidden bg-cream">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                      />
                    </div>
                    <span className="absolute left-4 top-4 border border-gold-soft bg-ivory/95 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.2em] text-gold-deep">
                      {CATEGORY_LABELS[p.category]}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col border-t border-gold-pale bg-ivory p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="font-display text-2xl font-medium text-ink">{p.name}</h2>
                      <p className="shrink-0 font-display text-xl text-gold-deep">{fmt(p.price)}</p>
                    </div>
                    {p.detail && <p className="mt-1 text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-faint">{p.detail}</p>}
                    <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink-soft">{p.description}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => addProductToCart(p)}
                        className="inline-flex items-center gap-2 bg-espresso px-5 py-3 text-[10.5px] font-bold uppercase tracking-[0.18em] text-ivory transition-all duration-300 hover:bg-gold-deep"
                      >
                        <BagIcon className="h-4 w-4" /> Add to cart
                      </button>
                      {p.category !== "boutique" && (
                        <button
                          type="button"
                          onClick={() => composeWith(p.id, p.category)}
                          className="group/c inline-flex items-center gap-2 border-b border-gold-soft pb-0.5 text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
                        >
                          Compose with it
                          <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/c:translate-x-1" />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="mt-20 text-center">
          <OrnamentDivider className="mx-auto max-w-xs text-gold" />
          <p className="mx-auto mt-8 max-w-lg font-display text-2xl leading-snug text-ink italic sm:text-3xl">
            Looking for something that doesn't exist yet? That is precisely our favourite kind of request.
          </p>
          <button
            type="button"
            onClick={() => navigate("contact")}
            className="group mt-7 inline-flex items-center gap-2 border-b border-gold-soft pb-1 text-[11.5px] font-bold uppercase tracking-[0.22em] text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
          >
            Commission a custom piece
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </Reveal>
      </section>
    </main>
  );
}
