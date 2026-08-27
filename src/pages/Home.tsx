import type { CSSProperties } from "react";
import CandlePreview from "../components/CandlePreview";
import Reveal from "../components/Reveal";
import {
  ArrowIcon,
  BlossomIcon,
  BoxIcon,
  CornerSprig,
  CrossIcon,
  DoveIcon,
  FlameIcon,
  LeafIcon,
  OrnamentDivider,
  PearlIcon,
  RibbonIcon,
  WaxIcon,
} from "../components/Ornaments";
import { useStore } from "../context/StoreContext";
import { SIGNATURE_DESIGNS, fmt } from "../data/catalog";
import { IMAGES } from "../data/images";

const WORDS = ["Faith", "Light", "Purity", "Love", "Family", "Tradition", "Grace", "Beginning"];

export default function Home() {
  const { navigate, setDraft, products, addProductToCart } = useStore();

  return (
    <main id="top">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        {/* ambient layers */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-[-10%] h-[560px] w-[560px] rounded-full bg-gold-pale/50 blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-8%] h-[480px] w-[480px] rounded-full bg-blush/40 blur-3xl" />
          <svg className="absolute left-[46%] top-16 hidden h-[620px] w-[620px] -translate-x-1/2 text-gold/[0.08] lg:block" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="48" strokeWidth="0.4" />
            <circle cx="50" cy="50" r="40" strokeWidth="0.3" />
            <path d="M50 14v72M32 30h36M35 62l30-9" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:pt-16">
          {/* left — words */}
          <div className="relative z-10">
            <p className="mask-line text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">
              <span style={{ "--rise-delay": "80ms" } as CSSProperties}>Royal Candle · Baptism Candles</span>
            </p>

            <h1 className="mt-6 font-display text-[13.5vw] leading-[1.02] font-medium text-ink sm:text-7xl lg:text-[5.1rem]">
              <span className="mask-line">
                <span style={{ "--rise-delay": "160ms" } as CSSProperties}>The Light</span>
              </span>
              <span className="mask-line">
                <span style={{ "--rise-delay": "280ms" } as CSSProperties}>
                  of a <em className="font-normal text-gold-deep italic">Sacred</em>
                </span>
              </span>
              <span className="mask-line">
                <span style={{ "--rise-delay": "400ms" } as CSSProperties}>Beginning</span>
              </span>
            </h1>

            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-ink-soft">
              Personalised baptism candles, created to celebrate a moment that lasts forever. Choose the wax, the silk, the
              flowers — and the name that makes it yours.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate("create")}
                className="group inline-flex items-center gap-3 bg-espresso px-8 py-4 text-[11.5px] font-bold uppercase tracking-[0.22em] text-ivory shadow-soft transition-all duration-300 hover:bg-gold-deep hover:shadow-luxe"
              >
                Create your candle
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => navigate("story")}
                className="group inline-flex items-center gap-2 border-b border-gold-soft pb-1 text-[11.5px] font-bold uppercase tracking-[0.22em] text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
              >
                Discover Royal Candle
                <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
              <span className="flex items-center gap-2"><WaxIcon className="h-4 w-4 text-gold" /> Natural beeswax</span>
              <span className="flex items-center gap-2"><RibbonIcon className="h-4 w-4 text-gold" /> Silk & satin</span>
              <span className="flex items-center gap-2"><BoxIcon className="h-4 w-4 text-gold" /> Keepsake packaging</span>
            </div>
          </div>

          {/* right — the candle */}
          <div className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
            <div aria-hidden="true" className="absolute -inset-3 translate-x-4 translate-y-4 rounded-[28px] border border-gold-soft/70" />
            <div className="img-frame arch-mask overflow-hidden shadow-luxe">
              <img src={IMAGES.hero} alt="Royal Candle personalised baptism candle with champagne ribbon, blush blossoms and pearl strand" className="kenburns h-full w-full object-cover" loading="eager" />
            </div>

            {/* floating tags */}
            <div className="fade-soft absolute -left-3 bottom-16 border border-gold-pale bg-ivory/95 px-4 py-3 shadow-luxe backdrop-blur-sm sm:-left-10" style={{ animationDelay: "900ms" }}>
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-deep">
                <RibbonIcon className="h-3.5 w-3.5" /> Personalised with love
              </p>
              <p className="mt-1 font-display text-xl text-ink italic">“Sofia” · 12 May 2025</p>
            </div>

            <div className="absolute -right-2 top-10 text-gold sm:-right-6" style={{ animation: "floatSoft 7s ease-in-out infinite" }}>
              <DoveIcon className="h-9 w-9" />
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div className="relative mx-auto mb-6 hidden max-w-7xl px-6 lg:block">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-ink-faint">
            <span className="relative block h-10 w-px overflow-hidden bg-gold-soft">
              <span className="absolute inset-x-0 top-0 h-4 animate-[rise_1.8s_ease-in-out_infinite] bg-gold-deep" />
            </span>
            Scroll gently
          </div>
        </div>
      </section>

      {/* ================= WORD MARQUEE ================= */}
      <section aria-label="Brand values" className="border-y border-gold-pale bg-cream/70 py-4">
        <div className="marquee overflow-hidden" aria-hidden="true">
          <div className="marquee-track items-center gap-10 pr-10">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-10">
                {WORDS.map((wd) => (
                  <span key={`${dup}-${wd}`} className="flex items-center gap-10">
                    <span className="font-display text-2xl font-medium text-ink/70 italic">{wd}</span>
                    <CrossIcon className="h-3.5 w-3.5 text-gold" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= A LIGHT TO REMEMBER ================= */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative order-2 lg:order-1">
            <div aria-hidden="true" className="absolute -left-5 -top-5 text-gold/60"><CornerSprig className="h-16 w-16" /></div>
            <div className="img-frame overflow-hidden shadow-luxe">
              <img src={IMAGES.flame} alt="The lit flame of a Royal Candle baptism candle" className="aspect-[4/5] w-full object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.04]" loading="lazy" />
            </div>
            <figure className="absolute -bottom-8 -right-3 max-w-[240px] border border-gold-pale bg-ivory px-5 py-4 shadow-luxe sm:-right-8">
              <blockquote className="font-display text-lg leading-snug text-ink italic">“Receive the light of Christ.”</blockquote>
              <figcaption className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-deep">The Baptismal Liturgy</figcaption>
            </figure>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">The meaning</p>
              <h2 className="mt-4 font-display text-4xl font-medium leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
                A Light to <em className="text-gold-deep italic">Remember</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-7 max-w-lg text-[15px] leading-[1.85] text-ink-soft">
                At the heart of every Baptism stands a flame. Lit from the Paschal candle, it is the first gift the Church
                places in the hands of a family — a visible sign of faith, purity and new life.
              </p>
              <p className="mt-5 max-w-lg text-[15px] leading-[1.85] text-ink-soft">
                That candle does not end when the ceremony does. It is carried home, kept safe, and lit again on the
                mornings that matter: birthdays, name days, the first day of school. Royal Candle exists so that this light
                is as personal as the child who receives it.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-9 flex items-center gap-5">
                <OrnamentDivider className="w-24 text-gold" />
                <button
                  type="button"
                  onClick={() => navigate("baptism")}
                  className="group inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.22em] text-ink transition-colors hover:text-gold-deep"
                >
                  Read the full meaning
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= THE EXPERIENCE — 4 STEPS ================= */}
      <section className="relative overflow-hidden bg-cream/60 py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-6%] top-[-10%] h-[420px] w-[420px] rounded-full bg-gold-pale/60 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">The Royal Candle Experience</p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
              Four quiet steps to a <em className="text-gold-deep italic">candle of your own</em>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {[
              { n: "01", t: "Choose", d: "Begin with the candle itself — its form, its wax, its height. Four silhouettes, each poured by hand.", Icon: WaxIcon, off: "md:translate-y-0" },
              { n: "02", t: "Personalise", d: "Add silk ribbons, blossoms, a pearl strand, an Orthodox cross — and the child's name, engraved where the light will touch it.", Icon: RibbonIcon, off: "md:translate-y-10" },
              { n: "03", t: "Preview", d: "Watch your candle take shape in real time. Light the flame, turn it in the light, show it to the family.", Icon: FlameIcon, off: "md:translate-y-2" },
              { n: "04", t: "Order", d: "We craft it to order, wrap it in our keepsake box, and deliver it in time for the day.", Icon: BoxIcon, off: "md:translate-y-12" },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 110} className={s.off}>
                <div className="group relative border-t border-gold-soft/80 pt-7 transition-colors duration-500">
                  <span className="absolute -top-3.5 left-0 bg-cream px-2 font-display text-lg text-gold-deep italic">{s.n}</span>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-3xl font-medium text-ink">{s.t}</h3>
                    <span className="mt-1 text-gold transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110">
                      <s.Icon className="h-7 w-7" />
                    </span>
                  </div>
                  <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-ink-soft">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-20 text-center">
            <button
              type="button"
              onClick={() => navigate("create")}
              className="group inline-flex items-center gap-3 border border-espresso px-9 py-4 text-[11.5px] font-bold uppercase tracking-[0.22em] text-espresso transition-all duration-300 hover:bg-espresso hover:text-ivory"
            >
              Begin the experience
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ================= CANDLELIGHT BAND ================= */}
      <section className="relative overflow-hidden bg-espresso py-24 text-ivory lg:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(214,168,90,0.22),transparent)]" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="mx-auto w-full max-w-[340px]">
            <div className="img-frame arch-mask overflow-hidden">
              <img src={IMAGES.ceremony} alt="A godparent holding the baptism candle beside the font" className="kenburns aspect-[3/4] w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-soft">The moment</p>
            <blockquote className="mt-6 font-display text-3xl leading-[1.25] font-medium sm:text-4xl lg:text-[2.7rem]">
              One flame is passed from hand to hand — and a life is welcomed into the light. Everything we make begins
              from <em className="text-gold-soft italic">that single moment.</em>
            </blockquote>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/60">
              Godparents, parents, grandparents — each holds the candle a little differently. We craft for all of them.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <OrnamentDivider className="w-24 text-gold-soft" />
              <button
                type="button"
                onClick={() => navigate("gallery")}
                className="group inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.22em] text-gold-soft transition-colors hover:text-ivory"
              >
                Enter the gallery
                <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= SIGNATURE DESIGNS ================= */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">Signature designs</p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
              Loved by <em className="text-gold-deep italic">other families</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              Three compositions our atelier returns to again and again — each one ready to become yours, name included.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
          {SIGNATURE_DESIGNS.map((d, i) => (
            <Reveal key={d.id} delay={i * 130} className={i === 1 ? "md:-translate-y-6" : ""}>
              <article className="group flex h-full flex-col border border-gold-pale bg-shell transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe">
                <div className="relative overflow-hidden bg-gradient-to-b from-cream to-shell px-8 pt-6">
                  <CandlePreview config={d.config} lit={false} className="mx-auto max-w-[240px] transition-transform duration-700 group-hover:scale-[1.04]" />
                  <span className="absolute left-4 top-4 border border-gold-soft bg-ivory px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.2em] text-gold-deep">
                    N° {i + 1}
                  </span>
                </div>
                <div className="flex flex-1 flex-col border-t border-gold-pale bg-ivory p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl font-medium text-ink">{d.name}</h3>
                    <p className="font-display text-xl text-gold-deep">{fmt(d.price)}</p>
                  </div>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink-soft">{d.story}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setDraft({ ...d.config });
                      navigate("create");
                    }}
                    className="group/btn mt-5 inline-flex items-center gap-2 self-start border-b border-gold-soft pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
                  >
                    Begin with this design
                    <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= LA BOUTIQUE — live shelf of real creations ================= */}
      {products.length > 0 && (
        <section className="border-y border-gold-pale bg-cream/60 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal>
                <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">La Boutique</p>
                <h2 className="mt-4 font-display text-4xl font-medium leading-[1.08] text-ink sm:text-5xl">
                  Fresh from <em className="text-gold-deep italic">the atelier</em>
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <button
                  type="button"
                  onClick={() => navigate("boutique")}
                  className="group inline-flex items-center gap-2 border-b border-gold-soft pb-1 text-[11.5px] font-bold uppercase tracking-[0.22em] text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
                >
                  Enter the boutique
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Reveal>
            </div>
            <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-3">
              {products.slice(0, 8).map((p, i) => (
                <Reveal key={p.id} delay={i * 80} className="w-[240px] shrink-0 snap-start sm:w-[270px]">
                  <article className="group flex h-full flex-col border border-gold-pale bg-ivory transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe">
                    <div className="aspect-square overflow-hidden bg-cream">
                      <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="truncate font-display text-xl font-medium text-ink">{p.name}</h3>
                        <span className="shrink-0 font-display text-lg text-gold-deep">{fmt(p.price)}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => addProductToCart(p)}
                        className="mt-4 self-start border border-gold-soft px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ivory"
                      >
                        Add to cart
                      </button>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= THE ROYAL STANDARD ================= */}
      <section className="border-y border-gold-pale bg-cream/60 py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">The Royal Standard</p>
              <h2 className="mt-4 font-display text-4xl font-medium leading-[1.08] text-ink sm:text-5xl">
                Made slowly, <em className="text-gold-deep italic">kept forever</em>
              </h2>
            </Reveal>
            <div className="mt-10 space-y-7">
              {[
                { Icon: WaxIcon, t: "Natural beeswax blend", d: "Poured by hand, burn-tested for a steady, quiet flame." },
                { Icon: RibbonIcon, t: "Silk & Italian satin", d: "Ribbons chosen for the way they hold light and bow." },
                { Icon: BlossomIcon, t: "Silk blossoms & pearls", d: "Each stem placed by hand, one candle at a time." },
                { Icon: BoxIcon, t: "A keepsake box", d: "Ivory, gold-foiled, made to hold the candle — and the memory — for years." },
              ].map((f, i) => (
                <Reveal key={f.t} delay={i * 100}>
                  <div className="group flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold-soft bg-ivory text-gold transition-all duration-500 group-hover:border-gold group-hover:text-gold-deep">
                      <f.Icon className="h-5.5 w-5.5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">{f.t}</h3>
                      <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-soft">{f.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={150} className="relative">
            <div aria-hidden="true" className="absolute -inset-3 -translate-x-3 translate-y-3 border border-gold-soft/70" />
            <div className="img-frame overflow-hidden shadow-luxe">
              <img src={IMAGES.box} alt="The Royal Candle keepsake box with ivory tissue and satin ribbon" className="aspect-square w-full object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.04]" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= VOICES + CTA ================= */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <Reveal className="mx-auto max-w-xl text-center">
          <OrnamentDivider className="text-gold" />
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
            Words from <em className="text-gold-deep italic">our families</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { q: "When the priest lit it, the whole church seemed to hold its breath. The candle was more beautiful than I dared imagine.", n: "A godmother", o: "Baptism of Eleni" },
            { q: "We lit it again on her first birthday. Same flame, same room, more tears. Thank you for making something that stays.", n: "A father", o: "Baptism of Sofia" },
            { q: "The name on the wax, the little bear, the box it arrived in — every detail felt like it was made for us. Because it was.", n: "A grandmother", o: "Baptism of Alexander" },
          ].map((t, i) => (
            <Reveal key={t.n} delay={i * 130}>
              <figure className="relative h-full border border-gold-pale bg-shell p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
                <span aria-hidden="true" className="absolute -top-4 left-6 font-display text-6xl leading-none text-gold-soft">“</span>
                <blockquote className="pt-4 font-display text-lg leading-relaxed text-ink italic">{t.q}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <PearlIcon className="h-4 w-4 text-gold" />
                  <span>
                    <span className="block text-[12px] font-bold uppercase tracking-[0.16em] text-ink">{t.n}</span>
                    <span className="block text-[11px] tracking-wide text-ink-faint">{t.o}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="relative mt-24 overflow-hidden border border-gold-soft bg-espresso px-6 py-16 text-center text-ivory sm:px-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-64 w-[640px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(214,168,90,0.28),transparent)]" />
            <LeafIcon className="absolute left-8 top-8 h-14 w-14 rotate-45 text-gold-soft/25" />
            <LeafIcon className="absolute bottom-8 right-8 h-14 w-14 -rotate-135 text-gold-soft/25" />
          </div>
          <p className="relative text-[11px] font-bold uppercase tracking-[0.34em] text-gold-soft">A light made uniquely yours</p>
          <h2 className="relative mx-auto mt-5 max-w-2xl font-display text-4xl leading-[1.12] font-medium sm:text-5xl">
            Somewhere, a candle is waiting to carry <em className="text-gold-soft italic">your child's name.</em>
          </h2>
          <button
            type="button"
            onClick={() => navigate("create")}
            className="group relative mt-9 inline-flex items-center gap-3 bg-ivory px-9 py-4 text-[11.5px] font-bold uppercase tracking-[0.22em] text-espresso transition-all duration-300 hover:bg-gold-soft"
          >
            Create your candle
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </Reveal>
      </section>
    </main>
  );
}
