import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Reveal from "../components/Reveal";
import { BagIcon, CheckIcon, FlameIcon } from "../components/Ornaments";
import { useStore } from "../context/StoreContext";
import { fmt } from "../data/catalog";
import { CATEGORY_LABELS } from "../data/products";
import type { CustomProduct, ProductCategory } from "../data/products";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as ProductCategory[];

const field =
  "w-full border border-gold-pale bg-ivory px-4 py-3 text-sm text-ink placeholder:text-ink-faint/60 transition-colors focus:border-gold focus:outline-none";
const label = "mb-1.5 block text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-faint";

interface FormState {
  name: string;
  category: ProductCategory;
  price: string;
  detail: string;
  description: string;
  image: string;
}

const EMPTY: FormState = { name: "", category: "candle", price: "", detail: "", description: "", image: "" };

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct, notify } = useStore();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1_500_000) {
      notify("Photo too large — please use an image under 1.5 MB (or paste a URL)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, image: String(reader.result) }));
      notify("Photo loaded — remember to save the product");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Give the piece a name";
    const price = Number(form.price.replace(",", "."));
    if (!form.price || Number.isNaN(price) || price <= 0) errs.price = "A price greater than zero";
    if (form.description.trim().length < 5) errs.description = "One or two sentences about the piece";
    if (!form.image.trim()) errs.image = "Add a photo — paste a URL or upload a file";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const payload = {
      name: form.name.trim(),
      category: form.category,
      price: Math.round(price * 100) / 100,
      detail: form.detail.trim() || undefined,
      description: form.description.trim(),
      image: form.image.trim(),
    };

    if (editingId) {
      updateProduct(editingId, payload);
      notify(`“${payload.name}” updated`);
    } else {
      addProduct(payload);
    }
    setForm(EMPTY);
    setEditingId(null);
  };

  const startEdit = (p: CustomProduct) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      detail: p.detail ?? "",
      description: p.description,
      image: p.image,
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">Atelier Manager</p>
          <h1 className="mt-3 font-display text-4xl font-medium text-ink sm:text-5xl">
            Your creations, <em className="text-gold-deep italic">on the shelves</em>
          </h1>
          <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-ink-soft">
            Add the candles you make and the accessories you sell. They appear instantly in <strong className="font-semibold text-ink">La Boutique</strong>,
            and — if you choose a category — also inside the matching step of the candle configurator.
          </p>
        </div>
        <span className="flex items-center gap-2 border border-gold-soft bg-shell px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-deep">
          <BagIcon className="h-4 w-4" /> {products.length} product{products.length === 1 ? "" : "s"} live
        </span>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        {/* ---------- form ---------- */}
        <Reveal>
          <form onSubmit={submit} noValidate className="border border-gold-pale bg-shell p-6 shadow-soft sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-medium text-ink">{editingId ? "Edit product" : "Add a new product"}</h2>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(EMPTY);
                    setErrors({});
                  }}
                  className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-faint transition-colors hover:text-rose"
                >
                  Cancel editing
                </button>
              )}
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="p-name" className={label}>Name</label>
                <input id="p-name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="The Eleni Candle" className={field} />
                {errors.name && <p className="mt-1 text-[11.5px] text-rose">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="p-category" className={label}>Category</label>
                <select id="p-category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })} className={field}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {CATEGORY_LABELS[c]}
                      {c === "boutique" ? " (sold only in the boutique)" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="p-price" className={label}>Price (€)</label>
                <input id="p-price" type="text" inputMode="decimal" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="59" className={field} />
                {errors.price && <p className="mt-1 text-[11.5px] text-rose">{errors.price}</p>}
              </div>
              <div>
                <label htmlFor="p-detail" className={label}>Small spec line (optional)</label>
                <input id="p-detail" type="text" value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} placeholder="Beeswax · 42 cm · hand poured" className={field} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="p-desc" className={label}>Description</label>
                <textarea id="p-desc" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Tell the family what makes this piece special…" className={field} />
                {errors.description && <p className="mt-1 text-[11.5px] text-rose">{errors.description}</p>}
              </div>

              {/* photo */}
              <div className="sm:col-span-2">
                <span className={label}>Photo</span>
                <div className="grid gap-4 sm:grid-cols-[110px_1fr]">
                  <div className="flex h-[110px] w-[110px] items-center justify-center overflow-hidden border border-gold-pale bg-cream">
                    {form.image ? (
                      <img src={form.image} alt="Product preview" className="h-full w-full object-cover" />
                    ) : (
                      <FlameIcon className="h-6 w-6 text-gold-soft" />
                    )}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="p-url" className="sr-only">Image URL</label>
                      <input id="p-url" type="text" value={form.image.startsWith("data:") ? "" : form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Paste an image URL (your site, Drive, Instagram…)" className={field} />
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" aria-label="Upload a photo from your device" />
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="border border-gold-soft px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ivory"
                      >
                        Upload from device
                      </button>
                      {form.image && (
                        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gold-deep">
                          <CheckIcon className="h-3.5 w-3.5" /> Photo ready
                        </span>
                      )}
                    </div>
                    {errors.image && <p className="text-[11.5px] text-rose">{errors.image}</p>}
                    <p className="text-[11px] leading-relaxed text-ink-faint">
                      Best results: square photo, soft daylight, ivory background, under 1.5 MB. For production we recommend
                      hosting photos and pasting URLs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="mt-7 w-full bg-espresso py-4 text-[11.5px] font-bold uppercase tracking-[0.24em] text-ivory transition-all duration-300 hover:bg-gold-deep hover:shadow-luxe">
              {editingId ? "Save changes" : "Add to the boutique"}
            </button>
          </form>

          {/* production note */}
          <div className="mt-6 border border-gold-pale bg-cream/70 p-6">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-gold-deep">Where this data lives</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">
              Right now products are saved <strong className="font-semibold text-ink">in this browser</strong> — perfect for preparing your catalogue and
              showing the site to others on this device. When you are ready to sell publicly, this exact structure connects to a
              cloud database (Supabase) or your shop platform without changing the design.
            </p>
          </div>
        </Reveal>

        {/* ---------- list ---------- */}
        <Reveal delay={120}>
          <h2 className="font-display text-2xl font-medium text-ink">On the shelves ({products.length})</h2>
          {products.length === 0 ? (
            <div className="mt-5 border border-dashed border-gold-soft bg-ivory px-6 py-14 text-center">
              <p className="font-display text-xl text-ink italic">Nothing here yet — the shelves are freshly dusted.</p>
              <p className="mx-auto mt-2 max-w-xs text-[12.5px] leading-relaxed text-ink-soft">
                Add your first candle on the left: name, category, price and one good photograph are all it takes.
              </p>
            </div>
          ) : (
            <ul className="mt-5 space-y-3">
              {products.map((p) => (
                <li key={p.id} className="fade-soft group flex items-center gap-4 border border-gold-pale bg-ivory p-3.5 transition-all duration-300 hover:border-gold-soft hover:shadow-soft">
                  <div className="h-16 w-16 shrink-0 overflow-hidden border border-gold-pale bg-cream">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-ink">{p.name}</p>
                    <p className="text-[11.5px] text-ink-faint">
                      {CATEGORY_LABELS[p.category]} · <span className="font-semibold text-gold-deep">{fmt(p.price)}</span>
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(p)}
                      className="border border-gold-soft px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold hover:text-ivory"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Remove “${p.name}” from the boutique?`)) deleteProduct(p.id);
                      }}
                      className="border border-gold-pale px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint transition-colors hover:border-rose hover:text-rose"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </main>
  );
}
