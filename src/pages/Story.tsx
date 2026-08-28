import Reveal from "../components/Reveal";
import { ArrowIcon, BlossomIcon, CrossIcon, OrnamentDivider, PearlIcon, WaxIcon } from "../components/Ornaments";
import { useStore } from "../context/StoreContext";
import { IMAGES } from "../data/images";

const VALUES = [
  {
    n: "I",
    t: "Craft over speed",
    d: "Every candle is poured, wrapped and engraved by hand in our atelier. We make few, slowly — because a sacrament deserves patience.",
  },
  {
    n: "II",
    t: "Reverence over fashion",
    d: "Trends come and go; the rite does not. Our palette is ivory, gold and quiet pastels because the moment asks for stillness, not noise.",
  },
  {
    n: "III",
    t: "Family over customer",
    d: "We ask for the child's name, the date, the tradition of the parish. Not to sell — but because a candle made for no one in particular is made for no one at all.",
  },
];

const MATERIALS = [
  { Icon: WaxIcon, t: "Beeswax blend", d: "Warm ivory, clean burn, a honey-soft scent." },
  { Icon: BlossomIcon, t: "Silk & satin", d: "Italian mills, chosen for how they hold a bow." },
  { Icon: PearlIcon, t: "River pearls", d: "Small, irregular, luminous — like the real thing." },
  { Icon: CrossIcon, t: "Champagne gold", d: "Brushed, never brassy; details that whisper." },
];

export default function Story() {
  const { navigate } = useStore();

  return (
    <main>
      {/* opening */}
      <section className="border-b border-gold-pale bg-cream/60">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">Our story</p>
            <h1 className="mt-4 font-display text-5xl font-medium leading-[1.04] text-ink sm:text-6xl lg:text-7xl">
              Born at a <em className="text-gold-deep italic">baptism font</em>
            </h1>
            <p className="mt-7 max-w-xl text-[15px] leading-[1.85] text-ink-soft">
              Royal Candle began the way the best things do — with a need no one was meeting. At a christening we loved,
              the candle was an afterthought: thin, unmarked, forgotten in a drawer by autumn. And yet it was the very
              object the liturgy calls “the light of Christ.”
            </p>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-ink-soft">
              We decided the candle should be worthy of the moment — personal, precious, made for one child only. So we
              built an atelier around a single object, and refused to make anything else.
            </p>
          </div>
          <Reveal delay={150}>
            <div className="img-frame overflow-hidden shadow-luxe">
              <img src={IMAGES.atelier} alt="Artisan hands tying a champagne ribbon around a baptism candle in the atelier" className="aspect-[4/3] w-full object-cover" loading="eager" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* manifesto */}
      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:py-28">
        <Reveal>
          <OrnamentDivider className="mx-auto max-w-xs text-gold" />
          <h2 className="mt-8 font-display text-3xl leading-[1.3] font-medium text-ink sm:text-4xl lg:text-[2.6rem]">
            We are not a candle shop that does baptisms. We are a baptism house that makes{" "}
            <em className="text-gold-deep italic">one candle — yours —</em> exceptionally well.
          </h2>
        </Reveal>
      </section>

      {/* values */}
      <section className="border-y border-gold-pale bg-cream/60 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">What guides the hands</p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-[1.08] text-ink sm:text-5xl">Three quiet rules</h2>
          </Reveal>
          <div className="mt-14 space-y-0">
            {VALUES.map((v, i) => (
              <Reveal key={v.n} delay={i * 120}>
                <div className="group grid gap-4 border-t border-gold-soft/80 py-9 transition-colors last:border-b md:grid-cols-[100px_280px_1fr] md:gap-8">
                  <span className="font-display text-4xl text-gold-deep italic">{v.n}</span>
                  <h3 className="font-display text-2xl font-medium text-ink md:text-3xl">{v.t}</h3>
                  <p className="max-w-xl text-[14.5px] leading-[1.85] text-ink-soft">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* materials */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative order-2 lg:order-1">
            <div aria-hidden="true" className="absolute -inset-3 translate-x-4 -translate-y-4 border border-gold-soft/70" />
            <div className="img-frame overflow-hidden shadow-luxe">
              <img src={IMAGES.flowers} alt="Macro detail of silk blossoms and pearls on a Royal Candle ribbon" className="aspect-square w-full object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.04]" loading="lazy" />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">The materials</p>
              <h2 className="mt-4 font-display text-4xl font-medium leading-[1.08] text-ink sm:text-5xl">
                Chosen to be <em className="text-gold-deep italic">kept</em>
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-7 sm:grid-cols-2">
              {MATERIALS.map((m, i) => (
                <Reveal key={m.t} delay={i * 100}>
                  <div className="group flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold-soft bg-shell text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ivory">
                      <m.Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink">{m.t}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{m.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <button
                type="button"
                onClick={() => navigate("create")}
                className="group mt-10 inline-flex items-center gap-3 bg-espresso px-8 py-4 text-[11.5px] font-bold uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:bg-gold-deep"
              >
                Create your candle
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* closing note */}
      <section className="bg-espresso py-20 text-center text-ivory lg:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <Reveal>
            <p className="font-display text-2xl leading-[1.5] font-medium sm:text-3xl">
              “We still light the prototype on quiet evenings — the first candle we ever made, for a child who is now
              learning to read. <em className="text-gold-soft italic">It burns exactly as it did the day she was baptised.</em>”
            </p>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-soft">— The Royal Candle Atelier</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
