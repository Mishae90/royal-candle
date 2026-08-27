import CandlePreview from "../components/CandlePreview";
import Reveal from "../components/Reveal";
import { ArrowIcon, BagIcon, FlameIcon } from "../components/Ornaments";
import { useStore } from "../context/StoreContext";
import { computeTotal, fmt, summaryLines } from "../data/catalog";

export default function Cart() {
  const { cart, setQty, removeItem, cartTotal, navigate, setDraft, notify } = useStore();

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
        <span className="mx-auto inline-block text-gold"><FlameIcon className="h-10 w-10" /></span>
        <h1 className="mt-6 font-display text-4xl font-medium text-ink sm:text-5xl">Your cart is waiting for a flame</h1>
        <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-relaxed text-ink-soft">
          Nothing rests here yet. Compose a candle in the atelier — it takes a few quiet minutes and stays saved as you go.
        </p>
        <button
          type="button"
          onClick={() => navigate("create")}
          className="group mt-9 inline-flex items-center gap-3 bg-espresso px-9 py-4 text-[11.5px] font-bold uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:bg-gold-deep"
        >
          Create your candle
          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">Your cart</p>
          <h1 className="mt-3 font-display text-4xl font-medium text-ink sm:text-5xl">
            {cart.length} candle{cart.length === 1 ? "" : "s"}, made for <em className="text-gold-deep italic">someone particular</em>
          </h1>
        </div>
        <button type="button" onClick={() => navigate("create")} className="group inline-flex items-center gap-2 border-b border-gold-soft pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-gold-deep hover:text-gold-deep">
          Add another candle
          <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_0.9fr]">
        <div className="space-y-6">
          {cart.map((item, idx) => {
            const lines = summaryLines(item.config);
            const unit = computeTotal(item.config);
            const childName = item.config.nameOn && item.config.childName.trim() ? item.config.childName.trim() : null;
            return (
              <Reveal key={item.id} delay={idx * 90}>
                <article className="grid gap-6 border border-gold-pale bg-shell p-5 sm:grid-cols-[200px_1fr] sm:p-6">
                  <div className="mx-auto w-full max-w-[200px] border border-gold-pale bg-gradient-to-b from-cream to-ivory">
                    <CandlePreview config={item.config} lit={false} />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-display text-2xl font-medium text-ink">Royal Candle — Custom Baptism Candle</h2>
                        {childName && (
                          <p className="mt-1 font-display text-lg text-gold-deep italic">For “{childName}”</p>
                        )}
                      </div>
                      <p className="font-display text-2xl font-medium text-ink">{fmt(unit * item.qty)}</p>
                    </div>

                    <ul className="mt-4 grid gap-x-6 gap-y-1.5 text-[12.5px] text-ink-soft sm:grid-cols-2">
                      {lines.map((l) => (
                        <li key={l.label} className="flex justify-between gap-3 border-b border-gold-pale/70 pb-1.5">
                          <span className="text-ink-faint">{l.label}</span>
                          <span className="text-right font-medium text-ink">{l.value}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center border border-gold-soft">
                        <button type="button" onClick={() => setQty(item.id, item.qty - 1)} aria-label="Decrease quantity" className="px-3.5 py-2 text-ink-soft transition-colors hover:bg-cream hover:text-ink">−</button>
                        <span className="w-8 text-center text-sm font-bold text-ink">{item.qty}</span>
                        <button type="button" onClick={() => setQty(item.id, item.qty + 1)} aria-label="Increase quantity" className="px-3.5 py-2 text-ink-soft transition-colors hover:bg-cream hover:text-ink">+</button>
                      </div>
                      <div className="flex items-center gap-5 text-[11px] font-bold uppercase tracking-[0.18em]">
                        <button
                          type="button"
                          onClick={() => {
                            setDraft({ ...item.config });
                            removeItem(item.id);
                            notify("Editing your design — re-add it when it's perfect");
                            navigate("create");
                          }}
                          className="text-gold-deep transition-colors hover:text-ink"
                        >
                          Edit design
                        </button>
                        <button type="button" onClick={() => removeItem(item.id)} className="text-ink-faint transition-colors hover:text-rose">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* summary */}
        <Reveal delay={150} className="lg:sticky lg:top-32 lg:self-start">
          <aside className="border border-gold-soft bg-espresso p-7 text-ivory shadow-luxe">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-soft">Order summary</p>
            <div className="mt-5 space-y-3 text-[13.5px]">
              <div className="flex justify-between text-ivory/70">
                <span>Candles ({cart.length})</span>
                <span>{fmt(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-ivory/70">
                <span>Keepsake packaging</span>
                <span className="text-gold-soft">Complimentary</span>
              </div>
              <div className="flex justify-between text-ivory/70">
                <span>Shipping</span>
                <span>At checkout</span>
              </div>
            </div>
            <div className="mt-6 flex items-end justify-between border-t border-ivory/15 pt-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-ivory/60">Subtotal</span>
              <span className="font-display text-4xl font-medium">{fmt(cartTotal)}</span>
            </div>
            <button
              type="button"
              onClick={() => navigate("checkout")}
              className="group mt-6 flex w-full items-center justify-center gap-3 bg-gold py-4 text-[11.5px] font-bold uppercase tracking-[0.22em] text-espresso transition-all duration-300 hover:bg-gold-soft"
            >
              <BagIcon className="h-4.5 w-4.5" />
              Proceed to checkout
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <p className="mt-4 text-center text-[11px] text-ivory/45">Handcrafted to order · made in 5–7 days · ships across Europe</p>
          </aside>
        </Reveal>
      </div>
    </main>
  );
}
