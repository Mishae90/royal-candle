import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import CandlePreview from "../components/CandlePreview";
import Reveal from "../components/Reveal";
import { ArrowIcon, BagIcon, BookmarkIcon, CheckIcon } from "../components/Ornaments";
import { useStore } from "../context/StoreContext";
import {
  BOW_STYLES,
  CANDLES,
  CROSSES,
  EXTRAS,
  FLOWERS,
  HOLDERS,
  NAME_PRICE,
  RIBBONS,
  TOYS,
  TOWELS,
  computeTotal,
  fmt,
  getOption,
  summaryLines,
} from "../data/catalog";
import type { CandleConfig, OptionDef } from "../data/catalog";
import { DEFAULT_CONFIG } from "../data/catalog";

/* ---------- accordion section shell ---------- */
function Section({
  index,
  title,
  current,
  open,
  onToggle,
  children,
}: {
  index: string;
  title: string;
  current?: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className={`border transition-colors duration-500 ${open ? "border-gold-soft bg-shell" : "border-gold-pale bg-ivory hover:border-gold-soft"}`}>
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6">
        <span className={`font-display text-lg italic ${open ? "text-gold-deep" : "text-ink-faint"}`}>{index}</span>
        <span className="flex-1">
          <span className="block text-[12px] font-bold uppercase tracking-[0.2em] text-ink">{title}</span>
          {current && <span className="mt-0.5 block truncate text-[12.5px] text-ink-soft">{current}</span>}
        </span>
        <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 text-gold transition-transform duration-500 ${open ? "rotate-45" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <div className={`acc-body ${open ? "open" : ""}`}>
        <div>
          <div className="px-5 pb-6 pt-1 sm:px-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- option card ---------- */
function OptionCard({
  opt,
  selected,
  onSelect,
  disabled,
  note,
  priceLabel,
}: {
  opt: OptionDef;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  note?: string;
  priceLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      title={disabled ? note : undefined}
      className={`group relative flex w-full items-center gap-3.5 border px-3.5 py-3 text-left transition-all duration-300 ${
        selected
          ? "border-gold bg-ivory shadow-soft"
          : disabled
            ? "cursor-not-allowed border-gold-pale bg-cream/50 opacity-55"
            : "border-gold-pale bg-ivory hover:-translate-y-0.5 hover:border-gold-soft hover:shadow-soft"
      }`}
    >
      {opt.swatch && (
        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-black/5" style={{ background: `linear-gradient(135deg, ${opt.swatch2 ?? opt.swatch}, ${opt.swatch})` }}>
          <span className="absolute left-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-white/60 blur-[2px]" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold text-ink">{opt.name}</span>
        <span className="block truncate text-[11.5px] text-ink-faint">{disabled ? note : opt.detail ?? opt.desc}</span>
      </span>
      <span className="shrink-0 text-right">
        <span className={`block text-[13px] font-bold ${selected ? "text-gold-deep" : "text-ink-soft"}`}>{priceLabel}</span>
      </span>
      {selected && (
        <span className="absolute -right-px -top-px flex h-5 w-5 items-center justify-center bg-gold text-ivory">
          <CheckIcon className="h-3 w-3" />
        </span>
      )}
    </button>
  );
}

function priceLabel(opt: OptionDef, isBase = false): string {
  if (isBase) return fmt(opt.price);
  if (opt.price === 0) return "Included";
  return `+${fmt(opt.price)}`;
}

/* ==================================================================== */

export default function Configurator() {
  const { draft, setDraft, addToCart, saved, saveDesign, deleteDesign, notify } = useStore();
  const [config, setConfig] = useState<CandleConfig>(() => (draft ? { ...draft } : { ...DEFAULT_CONFIG }));
  const [openIdx, setOpenIdx] = useState(0);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (draft) {
      setConfig({ ...draft });
      setDraft(null);
      notify("Design loaded — continue where you left off");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = useMemo(() => computeTotal(config), [config]);
  const lines = useMemo(() => summaryLines(config), [config]);

  /* compatibility guard: reset holder when it no longer fits the candle */
  useEffect(() => {
    const h = getOption("holder", config.holder);
    if (h && h.candles && !h.candles.includes(config.candle)) {
      setConfig((c) => ({ ...c, holder: "none" }));
      notify("That holder doesn't fit this candle — we've set it aside");
    }
  }, [config.candle, config.holder, notify]);

  const set = <K extends keyof CandleConfig>(key: K, value: CandleConfig[K]) => setConfig((c) => ({ ...c, [key]: value }));

  const candleName = getOption("candle", config.candle)?.name ?? "";
  const sections = [
    { title: "The Candle", current: candleName },
    { title: "Ribbons", current: getOption("ribbon", config.ribbon)?.name },
    { title: "Child's Name", current: config.nameOn ? config.childName.trim() || "Engraving on" : "Not engraved" },
    { title: "Candle Holder", current: getOption("holder", config.holder)?.name },
    { title: "Towel / Blanket", current: getOption("towel", config.towel)?.name },
    { title: "Additional Candles", current: getOption("extra", config.extra)?.name },
    { title: "Keepsake Toys", current: getOption("toy", config.toy)?.name },
    { title: "Crosses & Chains", current: getOption("cross", config.cross)?.name },
    { title: "Blossoms", current: getOption("flower", config.flower)?.name },
  ];

  const toggle = (i: number) => setOpenIdx((cur) => (cur === i ? -1 : i));

  return (
    <main className="pb-24 lg:pb-0">
      {/* page head */}
      <div className="border-b border-gold-pale bg-cream/60">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">The atelier</p>
              <h1 className="mt-3 font-display text-4xl font-medium leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
                Create Your <em className="text-gold-deep italic">Royal Candle</em>
              </h1>
              <p className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-ink-soft">
                A light made uniquely yours. Compose the candle piece by piece — the preview listens with every choice.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowSaved((v) => !v)}
              className="inline-flex items-center gap-2 border border-gold-soft px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:border-gold hover:text-gold-deep"
            >
              <BookmarkIcon className="h-4 w-4 text-gold" filled={saved.length > 0} />
              Saved designs ({saved.length})
            </button>
          </div>

          {showSaved && (
            <div className="fade-soft mt-6 border border-gold-pale bg-ivory p-4">
              {saved.length === 0 ? (
                <p className="text-sm text-ink-soft">No saved designs yet. Compose a candle, then press “Save this design” to keep it here.</p>
              ) : (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {saved.map((d) => (
                    <li key={d.id} className="flex items-center justify-between gap-3 border border-gold-pale bg-shell px-3.5 py-2.5">
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold text-ink">{d.label}</p>
                        <p className="text-[11px] text-ink-faint">{fmt(computeTotal(d.config))} · {new Date(d.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button type="button" onClick={() => { setConfig({ ...d.config }); notify(`“${d.label}” loaded`); }} className="border border-gold-soft px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-gold hover:text-ivory">
                          Load
                        </button>
                        <button type="button" onClick={() => deleteDesign(d.id)} aria-label={`Delete ${d.label}`} className="border border-gold-pale px-2.5 py-1.5 text-[12px] text-ink-faint transition-colors hover:border-rose hover:text-rose">
                          ✕
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          {/* ============ LEFT — live preview ============ */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden border border-gold-pale bg-gradient-to-b from-shell via-ivory to-cream shadow-soft">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-gold-pale/60 blur-3xl" />
              </div>
              <div className="relative">
                <CandlePreview config={config} interactive className="mx-auto max-w-[430px] px-4 pt-2" />
              </div>
              <p className="relative border-t border-gold-pale bg-ivory/80 px-5 py-3 text-center text-[10.5px] font-semibold uppercase tracking-[0.24em] text-ink-faint">
                Live preview · updates with every choice
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => saveDesign(config)}
                className="inline-flex items-center gap-2 border border-gold-soft px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ivory"
              >
                <BookmarkIcon className="h-4 w-4" /> Save this design
              </button>
              <p className="text-[11.5px] tracking-wide text-ink-faint">Handcrafted to order · ready in 5–7 days</p>
            </div>
          </div>

          {/* ============ RIGHT — configuration ============ */}
          <div>
            <div className="space-y-3">
              {/* 01 — candle */}
              <Section index="01" title={sections[0].title} current={sections[0].current} open={openIdx === 0} onToggle={() => toggle(0)}>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {CANDLES.map((o) => (
                    <OptionCard key={o.id} opt={o} selected={config.candle === o.id} onSelect={() => set("candle", o.id)} priceLabel={priceLabel(o, true)} />
                  ))}
                </div>
              </Section>

              {/* 02 — ribbons */}
              <Section index="02" title={sections[1].title} current={sections[1].current} open={openIdx === 1} onToggle={() => toggle(1)}>
                <p className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-faint">Colour & material</p>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {RIBBONS.map((o) => (
                    <OptionCard key={o.id} opt={o} selected={config.ribbon === o.id} onSelect={() => set("ribbon", o.id)} priceLabel={priceLabel(o)} />
                  ))}
                </div>
                <p className="mt-5 mb-2.5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-faint">How it is tied</p>
                <div className="grid grid-cols-3 gap-2">
                  {BOW_STYLES.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => set("bow", b.id)}
                      aria-pressed={config.bow === b.id}
                      className={`border px-2 py-2.5 text-center transition-all duration-300 ${
                        config.bow === b.id ? "border-gold bg-gold-pale/50 text-gold-deep" : "border-gold-pale bg-ivory text-ink-soft hover:border-gold-soft"
                      }`}
                    >
                      <span className="block text-[11.5px] font-bold tracking-wide">{b.name}</span>
                    </button>
                  ))}
                </div>
              </Section>

              {/* 03 — name */}
              <Section index="03" title={sections[2].title} current={sections[2].current} open={openIdx === 2} onToggle={() => toggle(2)}>
                <button
                  type="button"
                  role="switch"
                  aria-checked={config.nameOn}
                  onClick={() => set("nameOn", !config.nameOn)}
                  className={`flex w-full items-center justify-between border px-4 py-3.5 transition-all duration-300 ${
                    config.nameOn ? "border-gold bg-gold-pale/40" : "border-gold-pale bg-ivory hover:border-gold-soft"
                  }`}
                >
                  <span className="text-left">
                    <span className="block text-[13px] font-semibold text-ink">Personalise with a name</span>
                    <span className="block text-[11.5px] text-ink-faint">Hand-engraved beneath the ribbon · +{fmt(NAME_PRICE)}</span>
                  </span>
                  <span className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${config.nameOn ? "bg-gold" : "bg-gold-pale"}`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-ivory shadow transition-all duration-300 ${config.nameOn ? "left-[22px]" : "left-0.5"}`} />
                  </span>
                </button>

                {config.nameOn && (
                  <div className="fade-soft mt-4 space-y-4">
                    <div>
                      <label htmlFor="child-name" className="mb-1.5 block text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                        Child's name
                      </label>
                      <input
                        id="child-name"
                        type="text"
                        maxLength={14}
                        value={config.childName}
                        onChange={(e) => set("childName", e.target.value.replace(/[^a-zA-ZÀ-ž' -]/g, ""))}
                        placeholder="Sofia"
                        className="w-full border border-gold-pale bg-ivory px-4 py-3 font-display text-xl text-ink italic placeholder:text-ink-faint/60 focus:border-gold focus:outline-none"
                      />
                      <p className="mt-1 text-[11px] text-ink-faint">Appears on the candle as you type · max 14 letters</p>
                    </div>
                    <div>
                      <label htmlFor="baptism-date" className="mb-1.5 block text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                        Baptism date <span className="normal-case tracking-normal">(optional)</span>
                      </label>
                      <input
                        id="baptism-date"
                        type="text"
                        maxLength={16}
                        value={config.dateText}
                        onChange={(e) => set("dateText", e.target.value)}
                        placeholder="12 · V · 2025"
                        className="w-full border border-gold-pale bg-ivory px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint/60 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                      <div>
                        <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-faint">Ink</p>
                        <div className="flex gap-2">
                          {(
                            [
                              ["gold", "#a5854a"],
                              ["taupe", "#8a7a63"],
                              ["rose", "#c08b7e"],
                            ] as const
                          ).map(([k, hex]) => (
                            <button
                              key={k}
                              type="button"
                              onClick={() => set("nameColor", k)}
                              aria-label={`Ink colour ${k}`}
                              aria-pressed={config.nameColor === k}
                              className={`h-8 w-8 rounded-full border-2 transition-all ${config.nameColor === k ? "scale-110 border-gold" : "border-transparent hover:scale-105"}`}
                              style={{ backgroundColor: hex }}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-faint">Hand</p>
                        <div className="flex gap-2">
                          {(
                            [
                              ["script", "Script"],
                              ["caps", "Roman"],
                            ] as const
                          ).map(([k, label]) => (
                            <button
                              key={k}
                              type="button"
                              onClick={() => set("nameFont", k)}
                              aria-pressed={config.nameFont === k}
                              className={`border px-4 py-2 text-[12px] font-semibold transition-all ${
                                k === "script" ? "font-display italic" : "tracking-[0.18em] uppercase"
                              } ${config.nameFont === k ? "border-gold bg-gold-pale/50 text-gold-deep" : "border-gold-pale text-ink-soft hover:border-gold-soft"}`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Section>

              {/* 04 — holder */}
              <Section index="04" title={sections[3].title} current={sections[3].current} open={openIdx === 3} onToggle={() => toggle(3)}>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {HOLDERS.map((o) => {
                    const incompatible = !!o.candles && !o.candles.includes(config.candle);
                    return (
                      <OptionCard
                        key={o.id}
                        opt={o}
                        selected={config.holder === o.id}
                        onSelect={() => !incompatible && set("holder", o.id)}
                        disabled={incompatible}
                        note={incompatible ? `Doesn't fit ${candleName}` : undefined}
                        priceLabel={priceLabel(o)}
                      />
                    );
                  })}
                </div>
              </Section>

              {/* 05 — towel */}
              <Section index="05" title={sections[4].title} current={sections[4].current} open={openIdx === 4} onToggle={() => toggle(4)}>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {TOWELS.map((o) => (
                    <OptionCard key={o.id} opt={o} selected={config.towel === o.id} onSelect={() => set("towel", o.id)} priceLabel={priceLabel(o)} />
                  ))}
                </div>
              </Section>

              {/* 06 — additional candles */}
              <Section index="06" title={sections[5].title} current={sections[5].current} open={openIdx === 5} onToggle={() => toggle(5)}>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {EXTRAS.map((o) => (
                    <OptionCard key={o.id} opt={o} selected={config.extra === o.id} onSelect={() => set("extra", o.id)} priceLabel={priceLabel(o)} />
                  ))}
                </div>
                <p className="mt-3 text-[11.5px] text-ink-faint">Attendant tapers stand behind your candle — a quiet honour for the godparents.</p>
              </Section>

              {/* 07 — toys */}
              <Section index="07" title={sections[6].title} current={sections[6].current} open={openIdx === 6} onToggle={() => toggle(6)}>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {TOYS.map((o) => (
                    <OptionCard key={o.id} opt={o} selected={config.toy === o.id} onSelect={() => set("toy", o.id)} priceLabel={priceLabel(o)} />
                  ))}
                </div>
              </Section>

              {/* 08 — crosses & chains */}
              <Section index="08" title={sections[7].title} current={sections[7].current} open={openIdx === 7} onToggle={() => toggle(7)}>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {CROSSES.map((o) => (
                    <OptionCard key={o.id} opt={o} selected={config.cross === o.id} onSelect={() => set("cross", o.id)} priceLabel={priceLabel(o)} />
                  ))}
                </div>
              </Section>

              {/* 09 — blossoms */}
              <Section index="09" title={sections[8].title} current={sections[8].current} open={openIdx === 8} onToggle={() => toggle(8)}>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {FLOWERS.map((o) => (
                    <OptionCard key={o.id} opt={o} selected={config.flower === o.id} onSelect={() => set("flower", o.id)} priceLabel={priceLabel(o)} />
                  ))}
                </div>
              </Section>
            </div>

            {/* ============ summary & price ============ */}
            <div className="sticky bottom-24 mt-8 border border-gold-soft bg-espresso text-ivory shadow-luxe lg:bottom-auto">
              <div className="px-6 py-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-soft">Your Royal Candle</p>
                <ul className="mt-4 max-h-56 space-y-2 overflow-auto pr-1">
                  {lines.map((l) => (
                    <li key={l.label} className="fade-soft flex items-baseline justify-between gap-4 border-b border-ivory/10 pb-2 text-[13px]">
                      <span className="text-ivory/55">
                        {l.label} — <span className="text-ivory/90">{l.value}</span>
                      </span>
                      <span className="shrink-0 font-semibold text-gold-soft">{l.price === 0 ? "—" : fmt(l.price)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-ivory/60">Total</span>
                  <span key={total} className="price-pop font-display text-4xl font-medium text-ivory">
                    {fmt(total)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(config)}
                  className="group mt-5 flex w-full items-center justify-center gap-3 bg-gold py-4 text-[11.5px] font-bold uppercase tracking-[0.22em] text-espresso transition-all duration-300 hover:bg-gold-soft"
                >
                  <BagIcon className="h-4.5 w-4.5" />
                  Add to cart
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <p className="mt-3 text-center text-[11px] tracking-wide text-ivory/45">Made to order · complimentary keepsake box · ships across Europe</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ mobile sticky price bar ============ */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold-soft bg-ivory/95 px-4 py-3 shadow-luxe backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-ink-faint">Total</p>
            <p key={total} className="price-pop font-display text-2xl font-medium text-ink">
              {fmt(total)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => addToCart(config)}
            className="flex items-center gap-2.5 bg-espresso px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-gold-deep"
          >
            <BagIcon className="h-4 w-4" /> Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}
