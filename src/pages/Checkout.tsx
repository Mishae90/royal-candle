import { useState } from "react";
import type { FormEvent } from "react";
import CandlePreview from "../components/CandlePreview";
import Reveal from "../components/Reveal";
import { ArrowIcon, BagIcon, CheckIcon, OrnamentDivider } from "../components/Ornaments";
import { useStore } from "../context/StoreContext";
import { computeTotal, fmt, summaryLines } from "../data/catalog";
import type { PlacedOrder } from "../context/StoreContext";

const field =
  "w-full border border-gold-pale bg-ivory px-4 py-3 text-sm text-ink placeholder:text-ink-faint/60 transition-colors focus:border-gold focus:outline-none";
const label = "mb-1.5 block text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-faint";

export function Checkout() {
  const { cart, cartTotal, placeOrder, navigate, products } = useStore();
  const [form, setForm] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    postal: "",
    country: "Italy",
    shipping: "standard",
    card: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
        <h1 className="font-display text-4xl font-medium text-ink">Nothing to bless yet</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft">Your cart is empty. Compose a candle first — it will wait for you here.</p>
        <button type="button" onClick={() => navigate("create")} className="mt-8 inline-flex items-center gap-3 bg-espresso px-9 py-4 text-[11.5px] font-bold uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-gold-deep">
          Create your candle <ArrowIcon className="h-4 w-4" />
        </button>
      </main>
    );
  }

  const shippingCost = form.shipping === "express" ? 14 : 0;
  const total = cartTotal + shippingCost;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "We need a valid email for the confirmation";
    if (form.name.trim().length < 2) errs.name = "Your name, please";
    if (form.address.trim().length < 4) errs.address = "Where should the candle travel?";
    if (form.city.trim().length < 2) errs.city = "City is required";
    if (form.card.replace(/\s/g, "").length < 12) errs.card = "A longer card number is needed";
    if (form.expiry.trim().length < 4) errs.expiry = "MM/YY";
    if (form.cvc.trim().length < 3) errs.cvc = "3 digits";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setPlacing(true);
    const lines = cart.map((i) =>
      i.product
        ? { itemLines: [] as ReturnType<typeof summaryLines>, qty: i.qty, total: i.product.price, product: { name: i.product.name, image: i.product.image } }
        : { itemLines: summaryLines(i.config, products), qty: i.qty, total: computeTotal(i.config, products), product: undefined },
    );
    window.setTimeout(() => {
      placeOrder({ email: form.email, name: form.name, shipping: form.shipping }, lines);
      navigate("confirmation");
    }, 900);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">Checkout</p>
      <h1 className="mt-3 font-display text-4xl font-medium text-ink sm:text-5xl">Almost <em className="text-gold-deep italic">alight</em></h1>

      <form onSubmit={submit} noValidate className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_0.95fr]">
        <div className="space-y-10">
          {/* contact */}
          <Reveal>
            <h2 className="flex items-center gap-4 font-display text-2xl font-medium text-ink">
              <span className="font-display text-lg text-gold-deep italic">01</span> Contact
            </h2>
            <div className="mt-5">
              <label htmlFor="co-email" className={label}>Email — your confirmation letter goes here</label>
              <input id="co-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className={field} />
              {errors.email && <p className="mt-1 text-[11.5px] text-rose">{errors.email}</p>}
            </div>
          </Reveal>

          {/* delivery */}
          <Reveal delay={80}>
            <h2 className="flex items-center gap-4 font-display text-2xl font-medium text-ink">
              <span className="font-display text-lg text-gold-deep italic">02</span> Delivery
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="co-name" className={label}>Full name</label>
                <input id="co-name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Maria Rossi" className={field} />
                {errors.name && <p className="mt-1 text-[11.5px] text-rose">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="co-country" className={label}>Country</label>
                <select id="co-country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={field}>
                  {["Italy", "Romania", "Greece", "France", "Germany", "United Kingdom", "United States", "Other"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="co-address" className={label}>Address</label>
                <input id="co-address" type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Via della Luce 14" className={field} />
                {errors.address && <p className="mt-1 text-[11.5px] text-rose">{errors.address}</p>}
              </div>
              <div>
                <label htmlFor="co-city" className={label}>City</label>
                <input id="co-city" type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Firenze" className={field} />
                {errors.city && <p className="mt-1 text-[11.5px] text-rose">{errors.city}</p>}
              </div>
              <div>
                <label htmlFor="co-postal" className={label}>Postal code</label>
                <input id="co-postal" type="text" value={form.postal} onChange={(e) => setForm({ ...form, postal: e.target.value })} placeholder="50100" className={field} />
              </div>
            </div>
          </Reveal>

          {/* shipping method */}
          <Reveal delay={140}>
            <h2 className="flex items-center gap-4 font-display text-2xl font-medium text-ink">
              <span className="font-display text-lg text-gold-deep italic">03</span> Shipping
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {(
                [
                  ["standard", "Standard", "Crafted & delivered in 8–10 days", "Complimentary"],
                  ["express", "Priority atelier", "Your candle jumps the queue · 5–6 days", "+€14"],
                ] as const
              ).map(([id, t, d, price]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setForm({ ...form, shipping: id })}
                  aria-pressed={form.shipping === id}
                  className={`border px-5 py-4 text-left transition-all duration-300 ${
                    form.shipping === id ? "border-gold bg-gold-pale/40 shadow-soft" : "border-gold-pale bg-ivory hover:border-gold-soft"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-ink">{t}</span>
                    <span className="text-[12.5px] font-semibold text-gold-deep">{price}</span>
                  </span>
                  <span className="mt-1 block text-[12px] text-ink-soft">{d}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* payment */}
          <Reveal delay={200}>
            <h2 className="flex items-center gap-4 font-display text-2xl font-medium text-ink">
              <span className="font-display text-lg text-gold-deep italic">04</span> Payment
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-[2fr_1fr_1fr]">
              <div>
                <label htmlFor="co-card" className={label}>Card number</label>
                <input
                  id="co-card"
                  type="text"
                  inputMode="numeric"
                  value={form.card}
                  onChange={(e) => setForm({ ...form, card: e.target.value.replace(/[^\d ]/g, "").slice(0, 19) })}
                  placeholder="4242 4242 4242 4242"
                  className={field}
                />
                {errors.card && <p className="mt-1 text-[11.5px] text-rose">{errors.card}</p>}
              </div>
              <div>
                <label htmlFor="co-expiry" className={label}>Expiry</label>
                <input id="co-expiry" type="text" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value.slice(0, 5) })} placeholder="MM/YY" className={field} />
                {errors.expiry && <p className="mt-1 text-[11.5px] text-rose">{errors.expiry}</p>}
              </div>
              <div>
                <label htmlFor="co-cvc" className={label}>CVC</label>
                <input id="co-cvc" type="text" inputMode="numeric" value={form.cvc} onChange={(e) => setForm({ ...form, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })} placeholder="123" className={field} />
                {errors.cvc && <p className="mt-1 text-[11.5px] text-rose">{errors.cvc}</p>}
              </div>
            </div>
            <p className="mt-3 text-[11px] text-ink-faint">This atelier is a demonstration — no real payment is taken.</p>
          </Reveal>
        </div>

        {/* summary */}
        <Reveal delay={120} className="lg:sticky lg:top-32 lg:self-start">
          <aside className="border border-gold-soft bg-espresso p-7 text-ivory shadow-luxe">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-soft">Your order</p>
            <div className="mt-5 space-y-5">
              {cart.map((item) => {
                const childName = item.config.nameOn && item.config.childName.trim() ? item.config.childName.trim() : null;
                const unit = item.product ? item.product.price : computeTotal(item.config, products);
                return (
                  <div key={item.id} className="flex items-center gap-4 border-b border-ivory/10 pb-5">
                    <div className="w-20 shrink-0 overflow-hidden border border-ivory/15 bg-ivory">
                      {item.product ? (
                        <img src={item.product.image} alt={item.product.name} className="aspect-square w-full object-cover" loading="lazy" />
                      ) : (
                        <CandlePreview config={item.config} lit={false} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold">
                        {item.product ? item.product.name : `Custom Baptism Candle${childName ? ` · “${childName}”` : ""}`}
                      </p>
                      <p className="text-[11.5px] text-ivory/55">
                        {item.product ? "From the atelier · " : ""}Qty {item.qty} · {fmt(unit)} each
                      </p>
                    </div>
                    <p className="shrink-0 font-display text-lg text-gold-soft">{fmt(unit * item.qty)}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 space-y-2.5 text-[13px] text-ivory/70">
              <div className="flex justify-between"><span>Subtotal</span><span>{fmt(cartTotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shippingCost === 0 ? "Complimentary" : fmt(shippingCost)}</span></div>
            </div>
            <div className="mt-5 flex items-end justify-between border-t border-ivory/15 pt-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-ivory/60">Total</span>
              <span key={total} className="price-pop font-display text-4xl font-medium">{fmt(total)}</span>
            </div>
            <button
              type="submit"
              disabled={placing}
              className="group mt-6 flex w-full items-center justify-center gap-3 bg-gold py-4 text-[11.5px] font-bold uppercase tracking-[0.22em] text-espresso transition-all duration-300 hover:bg-gold-soft disabled:opacity-70"
            >
              {placing ? (
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-espresso" /> Sealing your order…
                </span>
              ) : (
                <>
                  <BagIcon className="h-4.5 w-4.5" /> Complete order
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
            <p className="mt-4 text-center text-[11px] text-ivory/45">Secure & encrypted · confirmation letter by email</p>
          </aside>
        </Reveal>
      </form>
    </main>
  );
}

/* ================= confirmation ================= */

const TIMELINE = [
  { t: "Order received", d: "Your letter is in our hands." },
  { t: "The atelier crafts", d: "Poured, wrapped, engraved — by hand." },
  { t: "Blessed & boxed", d: "Resting in its keepsake box." },
  { t: "Journey to you", d: "Tracked, insured, cradled in pulp." },
];

export function Confirmation() {
  const { order, navigate } = useStore();
  const o: PlacedOrder | null = order;

  if (!o) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
        <h1 className="font-display text-4xl font-medium text-ink">No recent order found</h1>
        <button type="button" onClick={() => navigate("create")} className="mt-8 inline-flex items-center gap-3 bg-espresso px-9 py-4 text-[11.5px] font-bold uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-gold-deep">
          Create your candle <ArrowIcon className="h-4 w-4" />
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:py-24">
      <div className="text-center">
        <span className="fade-soft mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold bg-gold-pale/50 text-gold-deep">
          <CheckIcon className="h-9 w-9" />
        </span>
        <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">Order {o.number}</p>
        <h1 className="mt-4 font-display text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
          The flame is <em className="text-gold-deep italic">lit</em>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-[14.5px] leading-relaxed text-ink-soft">
          Thank you, {o.name.split(" ")[0]}. A confirmation letter is on its way to <span className="font-semibold text-ink">{o.email}</span>. Your candle now
          enters the atelier — we will write again the day it leaves our hands.
        </p>
      </div>

      <Reveal delay={150} className="mt-14 border border-gold-pale bg-shell p-7 sm:p-9">
        <div className="grid gap-3 sm:grid-cols-4">
          {TIMELINE.map((s, i) => (
            <div key={s.t} className="relative border-t border-gold-soft pt-4">
              <span className={`absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full ${i === 0 ? "bg-gold" : "border border-gold bg-ivory"}`} />
              <p className="font-display text-lg font-medium text-ink">{s.t}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-9 space-y-5 border-t border-gold-pale pt-7">
          {o.lines.map((l, i) => (
            <div key={i} className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <div>
                {l.product ? (
                  <div className="flex items-center gap-4">
                    <img src={l.product.image} alt={l.product.name} className="h-16 w-16 border border-gold-pale object-cover" loading="lazy" />
                    <div>
                      <p className="font-display text-xl font-medium text-ink">
                        {l.product.name} × {l.qty}
                      </p>
                      <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-gold-deep">From the atelier</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-display text-xl font-medium text-ink">Royal Candle — Custom Baptism Candle × {l.qty}</p>
                    <ul className="mt-2 grid gap-x-8 gap-y-1 text-[12.5px] text-ink-soft sm:grid-cols-2">
                      {l.itemLines.map((line) => (
                        <li key={line.label}>
                          <span className="text-ink-faint">{line.label}: </span>
                          {line.value}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <p className="font-display text-xl text-gold-deep">{fmt(l.total * l.qty)}</p>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-gold-pale pt-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint">
              {o.shipping === "express" ? "Priority atelier · total" : "Standard · total"}
            </p>
            <p className="font-display text-3xl font-medium text-ink">{fmt(o.total)}</p>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 text-center">
        <OrnamentDivider className="mx-auto max-w-[220px] text-gold" />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button type="button" onClick={() => navigate("home")} className="border border-espresso px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-espresso transition-all duration-300 hover:bg-espresso hover:text-ivory">
            Return home
          </button>
          <button type="button" onClick={() => navigate("create")} className="bg-espresso px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-gold-deep">
            Create another candle
          </button>
        </div>
      </div>
    </main>
  );
}
