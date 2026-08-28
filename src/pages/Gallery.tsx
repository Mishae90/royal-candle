import { useState } from "react";
import Reveal from "../components/Reveal";
import { ArrowIcon, OrnamentDivider } from "../components/Ornaments";
import { useStore } from "../context/StoreContext";
import { IMAGES } from "../data/images";

type Tag = "Candles" | "Ceremony" | "Details";

interface Shot {
  src: string;
  alt: string;
  caption: string;
  tag: Tag;
  tall?: boolean;
}

const SHOTS: Shot[] = [
  { src: IMAGES.hero, alt: "Royal Candle baptism candle with champagne ribbon and blossoms", caption: "The Sofia — dusty rose silk, blush blossoms, pearl strand", tag: "Candles", tall: true },
  { src: IMAGES.ceremony, alt: "Godparent holding the baptism candle at the font", caption: "The moment the flame is first carried", tag: "Ceremony", tall: true },
  { src: IMAGES.crossMacro, alt: "Gold Orthodox cross on satin ribbon and pearls", caption: "The three-bar cross, brushed champagne gold", tag: "Details" },
  { src: IMAGES.flowers, alt: "Silk blossoms and pearls arranged on a candle ribbon", caption: "Silk blossoms, placed one stem at a time", tag: "Details" },
  { src: IMAGES.church, alt: "Orthodox church interior with arches and candlelight", caption: "Where every candle begins its journey", tag: "Ceremony", tall: true },
  { src: IMAGES.flame, alt: "The lit flame of a baptism candle", caption: "A flame that returns every name day", tag: "Candles", tall: true },
  { src: IMAGES.towel, alt: "Folded ivory baptism towel with satin ribbon", caption: "The godparent's towel — part of the sacrament", tag: "Details" },
  { src: IMAGES.atelier, alt: "Artisan hands tying a ribbon around a candle", caption: "In the atelier: hands, silk and patience", tag: "Details" },
  { src: IMAGES.box, alt: "The Royal Candle keepsake box", caption: "The keepsake box, made to hold a memory", tag: "Candles" },
  { src: IMAGES.dove, alt: "A white dove in soft light", caption: "The seal of the gift of the Holy Spirit", tag: "Ceremony", tall: true },
];

const TAGS: (Tag | "All")[] = ["All", "Candles", "Ceremony", "Details"];

export default function Gallery() {
  const { navigate } = useStore();
  const [tag, setTag] = useState<Tag | "All">("All");
  const shots = SHOTS.filter((s) => tag === "All" || s.tag === tag);

  return (
    <main>
      <section className="border-b border-gold-pale bg-cream/60">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">The Royal Gallery</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl font-medium leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
            Light, remembered <em className="text-gold-deep italic">in frames</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            Candles, ceremonies and the small details between them — a slow walk through what leaves our atelier each week.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {TAGS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTag(t)}
                aria-pressed={tag === t}
                className={`border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  tag === t ? "border-espresso bg-espresso text-ivory" : "border-gold-soft bg-ivory text-ink-soft hover:border-espresso hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {shots.map((s, i) => (
            <Reveal key={s.src} delay={(i % 3) * 110} className="break-inside-avoid">
              <figure className="group relative overflow-hidden border border-gold-pale bg-shell">
                <div className={`overflow-hidden ${s.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <span className="text-[12.5px] text-ink-soft">{s.caption}</span>
                  <span className="shrink-0 border border-gold-pale bg-ivory px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.18em] text-gold-deep">
                    {s.tag}
                  </span>
                </figcaption>
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100" />
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 text-center">
          <OrnamentDivider className="mx-auto max-w-xs text-gold" />
          <h2 className="mx-auto mt-8 max-w-xl font-display text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
            The next frame could hold <em className="text-gold-deep italic">your child's candle.</em>
          </h2>
          <button
            type="button"
            onClick={() => navigate("create")}
            className="group mt-8 inline-flex items-center gap-3 border border-espresso px-9 py-4 text-[11.5px] font-bold uppercase tracking-[0.22em] text-espresso transition-all duration-300 hover:bg-espresso hover:text-ivory"
          >
            Create your candle
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </Reveal>
      </section>
    </main>
  );
}
