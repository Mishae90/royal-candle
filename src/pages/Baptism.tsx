import Reveal from "../components/Reveal";
import { ArrowIcon, CrossIcon, DoveIcon, DropIcon, FamilyIcon, FlameIcon, LeafIcon, OrnamentDivider } from "../components/Ornaments";
import { useStore } from "../context/StoreContext";
import { IMAGES } from "../data/images";

const SYMBOLS = [
  {
    Icon: FlameIcon,
    t: "The Candle",
    d: "Lit from the Paschal flame, it is Christ's light passed hand to hand — the sign that a new life will never walk in darkness.",
  },
  {
    Icon: DropIcon,
    t: "The Water",
    d: "Three immersions, in the name of the Father, the Son and the Holy Spirit. The oldest gesture of the Church: a drowning of the old, a rising of the new.",
  },
  {
    Icon: CrossIcon,
    t: "The Cross",
    d: "Signed on the forehead before the water is ever touched — a quiet claim of belonging, worn for a whole life.",
  },
  {
    Icon: DoveIcon,
    t: "The Dove",
    d: "The Spirit descending, as at the Jordan. In Orthodox tradition the chrism is sealed with the words: the seal of the gift of the Holy Spirit.",
  },
  {
    Icon: FamilyIcon,
    t: "The Godparents",
    d: "They hold the candle when small hands cannot, and the promise when young ones forget. Nouna and nono — witnesses, keepers, guides.",
  },
  {
    Icon: LeafIcon,
    t: "The White Garment",
    d: "Clothed in white, the newly baptised wears the joy of the Resurrection — the same white as the candle's wax, and the towel that waits.",
  },
];

export default function Baptism() {
  const { navigate } = useStore();

  return (
    <main>
      {/* opening */}
      <section className="relative overflow-hidden border-b border-gold-pale bg-cream/60">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-[-6%] h-[420px] w-[420px] rounded-full bg-gold-pale/60 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">Baptism</p>
            <h1 className="mt-4 font-display text-5xl font-medium leading-[1.04] text-ink sm:text-6xl lg:text-7xl">
              A Sacred <em className="text-gold-deep italic">Beginning</em>
            </h1>
            <p className="mt-7 max-w-xl text-[15px] leading-[1.85] text-ink-soft">
              Baptism is the Church's oldest welcome — the moment a child is brought to the water, named before God, and
              given a light to carry. Everything in it is a symbol. The candle is the one the family takes home.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <OrnamentDivider className="w-24 text-gold" />
              <p className="font-display text-lg text-ink italic">“Receive the light of Christ.”</p>
            </div>
          </div>
          <Reveal delay={150}>
            <div className="img-frame arch-mask mx-auto max-w-[400px] overflow-hidden shadow-luxe">
              <img src={IMAGES.dove} alt="A white dove rising through soft light — the symbol of the Holy Spirit" className="kenburns aspect-[3/4] w-full object-cover" loading="eager" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* the light */}
      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:py-28">
        <Reveal>
          <span className="mx-auto inline-block text-gold"><FlameIcon className="h-8 w-8" /></span>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.12] text-ink sm:text-5xl">
            One flame, passed <em className="text-gold-deep italic">from hand to hand</em>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-[1.9] text-ink-soft">
            In the liturgy, the godparent's candle is lit from the Paschal candle — the great flame of Easter — and carried
            through the whole service. It burns while the child is immersed, while the chrism is sealed, while the white
            garment is given. Then it is carried three times around the baptismal font: a circle with no beginning, like
            the love that surrounds a child.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-[1.9] text-ink-soft">
            And when the church doors close, the flame goes with the family. It is the candle Royal Candle makes — personal,
            precious, and kept for a lifetime of mornings after.
          </p>
        </Reveal>
      </section>

      {/* symbols */}
      <section className="border-y border-gold-pale bg-cream/60 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">The language of the rite</p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-[1.08] text-ink sm:text-5xl">
              Symbols the family <em className="text-gold-deep italic">can hold</em>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {SYMBOLS.map((s, i) => (
              <Reveal key={s.t} delay={(i % 3) * 120} className={i % 3 === 1 ? "lg:translate-y-8" : ""}>
                <div className="group border-t border-gold-soft/80 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gold transition-transform duration-500 group-hover:-translate-y-1"><s.Icon className="h-7 w-7" /></span>
                    <span className="font-display text-lg text-gold-deep/70 italic">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-medium text-ink">{s.t}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* orthodox tradition */}
      <section className="relative overflow-hidden bg-espresso py-24 text-ivory lg:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-10%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(214,168,90,0.18),transparent)]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="order-2 lg:order-1">
            <div className="img-frame overflow-hidden">
              <img src={IMAGES.church} alt="Warm candlelight inside an Orthodox church with stone arches" className="aspect-[4/3] w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-soft">Orthodox tradition</p>
              <h2 className="mt-4 font-display text-4xl font-medium leading-[1.1] sm:text-5xl">
                A rite three centuries deep — <em className="text-gold-soft italic">and three immersions long</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-7 space-y-5 text-[14.5px] leading-[1.85] text-ivory/70">
                <p>
                  In the Orthodox Church, Baptism and Chrismation are one unbroken gift: the child is immersed three times,
                  anointed with holy chrism from head to toe, and received into communion that very day.
                </p>
                <p>
                  The godparent stands at the centre of it — answering for the child, holding the candle, receiving the
                  newly baptised from the font in a white towel. It is why our towels are made with the same care as our
                  candles: they are part of the sacrament.
                </p>
                <p>
                  Royal Candle honours both Eastern and Western rites. Whether the priest asks for a slender taper or a
                  grand column, the cross bar you choose — Orthodox three-bar or classic Latin — is yours to decide in the
                  atelier.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* the candle that goes home */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:py-32">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">After the ceremony</p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
            The candle that <em className="text-gold-deep italic">goes home</em>
          </h2>
          <p className="mt-7 max-w-lg text-[15px] leading-[1.85] text-ink-soft">
            A baptism candle is not a decoration. In many families it is lit each year on the child's baptism day, placed
            beside icons, carried to church on great feasts. The name on its wax becomes part of the household's story.
          </p>
          <p className="mt-5 max-w-lg text-[15px] leading-[1.85] text-ink-soft">
            This is why we make ours slowly: beeswax that burns clean for decades, silk that does not fade, engraving deep
            enough to outlast the day it was made for.
          </p>
          <button
            type="button"
            onClick={() => navigate("create")}
            className="group mt-9 inline-flex items-center gap-3 bg-espresso px-8 py-4 text-[11.5px] font-bold uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:bg-gold-deep"
          >
            Create your candle
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </Reveal>
        <Reveal delay={150}>
          <div className="img-frame overflow-hidden shadow-luxe">
            <img src={IMAGES.crossMacro} alt="A gold Orthodox cross pendant resting on champagne satin ribbon and pearls" className="aspect-[4/5] w-full object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.04]" loading="lazy" />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
