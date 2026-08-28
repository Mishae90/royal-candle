import { useState } from "react";
import Reveal from "../components/Reveal";
import { ArrowIcon, OrnamentDivider } from "../components/Ornaments";
import { useStore } from "../context/StoreContext";

const FAQS = [
  {
    q: "How does the personalisation work?",
    a: "You compose your candle step by step in the atelier: the candle itself, ribbon, blossoms, cross, holder and keepsakes. Every choice appears instantly in the live preview, so you always see exactly what we will make.",
  },
  {
    q: "Can I add the child's name?",
    a: "Yes — engraving the child's name (and, if you wish, the baptism date) is the heart of what we do. Choose the ink colour and the hand — flowing script or quiet roman capitals — and watch it settle onto the wax in real time.",
  },
  {
    q: "How much does a personalised candle cost?",
    a: "Candles begin at €49 for The Classic Taper. Ribbons, blossoms, crosses, engraving and keepsakes are added piece by piece, each with its price shown clearly. Most families' finished candles settle between €80 and €140.",
  },
  {
    q: "Can I see a preview before ordering?",
    a: "Always. The atelier preview updates with every choice — you can light the flame, zoom in, and save the design to show the godparents or grandparents before deciding.",
  },
  {
    q: "How long does preparation take?",
    a: "Each candle is made to order in five to seven days, then travels to you. If the baptism is sooner, write to us before ordering — we keep a small number of atelier slots for urgent blessings.",
  },
  {
    q: "Can I change my order after placing it?",
    a: "For the first 24 hours, freely — names, ribbons, blossoms, anything. After the candle enters the workshop we can still try; simply write to us as early as possible.",
  },
  {
    q: "How is the candle packaged?",
    a: "In our keepsake box: ivory, gold-foiled, lined with silk tissue, with the ribbon tied as it will be on the day. The box is made to store the candle afterwards — many families keep the candle in it for years.",
  },
  {
    q: "How is it shipped?",
    a: "Tracked, insured, and cradled in moulded pulp so the blossoms and pearls arrive as they left our hands. We deliver across Europe; the standard journey takes two to three days once dispatched.",
  },
  {
    q: "Can I request a fully custom composition?",
    a: "We love these letters. Parish colours, a grandmother's ribbon, flowers matched to the christening gown — describe what you imagine through the contact page and our atelier will answer within two days.",
  },
  {
    q: "Can I speak with you before ordering?",
    a: "Of course. The atelier answers every message personally — questions about the rite, the sizing, the date, anything. Write to us; there is no such thing as a small question before a sacrament.",
  },
];

export default function Faq() {
  const { navigate } = useStore();
  const [open, setOpen] = useState(0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">Questions & answers</p>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[1.04] text-ink sm:text-6xl">
            Asked, <em className="text-gold-deep italic">gently</em>
          </h1>
          <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed text-ink-soft">
            Everything families ask us before the big day. If your question isn't here, the atelier is one letter away.
          </p>
          <Reveal delay={120}>
            <div className="mt-8 border border-gold-pale bg-shell p-6">
              <p className="font-display text-xl text-ink italic">Still wondering about something?</p>
              <button
                type="button"
                onClick={() => navigate("contact")}
                className="group mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-deep transition-colors hover:text-ink"
              >
                Write to the atelier
                <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </div>

        <div>
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i * 60, 240)}>
              <div className={`border-b border-gold-pale ${open === i ? "bg-shell/60" : ""}`}>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center gap-5 px-2 py-5 text-left sm:px-4"
                >
                  <span className={`font-display text-lg italic ${open === i ? "text-gold-deep" : "text-ink-faint"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={`flex-1 font-display text-xl font-medium transition-colors sm:text-[1.35rem] ${open === i ? "text-gold-deep" : "text-ink"}`}>
                    {f.q}
                  </span>
                  <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 text-gold transition-transform duration-500 ${open === i ? "rotate-45" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <div className={`acc-body ${open === i ? "open" : ""}`}>
                  <div>
                    <p className="px-2 pb-6 pl-[3.4rem] pr-6 text-[14.5px] leading-[1.85] text-ink-soft sm:px-4 sm:pl-[3.9rem]">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          <div className="mt-12 text-center">
            <OrnamentDivider className="mx-auto max-w-[220px] text-gold" />
            <p className="mt-6 font-display text-2xl text-ink italic">Ready when you are.</p>
            <button
              type="button"
              onClick={() => navigate("create")}
              className="group mt-6 inline-flex items-center gap-3 bg-espresso px-9 py-4 text-[11.5px] font-bold uppercase tracking-[0.22em] text-ivory transition-all duration-300 hover:bg-gold-deep"
            >
              Create your candle
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
