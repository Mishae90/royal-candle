import { useState } from "react";
import type { FormEvent } from "react";
import { useStore } from "../context/StoreContext";
import type { Page } from "../context/StoreContext";
import { CheckIcon, FacebookIcon, InstagramIcon, LogoMark, PinterestIcon, Wordmark } from "./Ornaments";

export default function Footer() {
  const { navigate } = useStore();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const go = (p: Page) => navigate(p);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) setDone(true);
  };

  const cols: { title: string; links: { label: string; page?: Page; soon?: boolean }[] }[] = [
    {
      title: "Royal Candle",
      links: [
        { label: "Our Story", page: "story" },
        { label: "Baptism", page: "baptism" },
        { label: "Gallery", page: "gallery" },
      ],
    },
    {
      title: "Shop",
      links: [
        { label: "Create Your Candle", page: "create" },
        { label: "La Boutique", page: "boutique" },
        { label: "Signature Designs", page: "home" },
        { label: "Personalisation", page: "create" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Shipping", page: "faq" },
        { label: "FAQ", page: "faq" },
        { label: "Contact", page: "contact" },
        { label: "Returns", page: "faq" },
        { label: "Atelier Manager", page: "admin" },
      ],
    },
    {
      title: "Legal",
      links: [{ label: "Privacy Policy", soon: true }, { label: "Cookie Policy", soon: true }, { label: "Terms & Conditions", soon: true }],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-espresso text-ivory">
      {/* watermark */}
      <p aria-hidden="true" className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] leading-none font-medium text-ivory/[0.04]">
        Royal Candle
      </p>

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          {/* brand + newsletter */}
          <div>
            <div className="flex items-center gap-3 text-gold-soft">
              <LogoMark className="h-12 w-12" />
              <Wordmark dark />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/60">
              Personalised baptism candles, handcrafted in small batches. A light made uniquely yours — for a moment that lasts forever.
            </p>

            <div className="mt-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-soft">Letters from the atelier</p>
              {done ? (
                <p className="mt-3 flex items-center gap-2 text-sm text-ivory/80">
                  <CheckIcon className="h-4 w-4 text-gold-soft" /> Thank you — your first letter is on its way.
                </p>
              ) : (
                <form onSubmit={subscribe} className="mt-3 flex max-w-sm border-b border-ivory/25 pb-1 focus-within:border-gold-soft">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-transparent py-2 text-sm text-ivory placeholder:text-ivory/35 focus:outline-none"
                  />
                  <button type="submit" className="shrink-0 pl-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-soft transition-colors hover:text-ivory">
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-soft">{c.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.soon ? (
                        <span className="text-sm text-ivory/40">{l.label}</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => l.page && go(l.page)}
                          className="text-sm text-ivory/70 transition-colors hover:text-gold-soft"
                        >
                          {l.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-ivory/12 pt-7 sm:flex-row">
          <p className="text-[12px] tracking-wide text-ivory/40">© {new Date().getFullYear()} Royal Candle · Baptism Candles. Crafted with reverence.</p>
          <div className="flex items-center gap-3">
            {[
              { label: "Instagram", Icon: InstagramIcon },
              { label: "Pinterest", Icon: PinterestIcon },
              { label: "Facebook", Icon: FacebookIcon },
            ].map(({ label, Icon }) => (
              <a
                key={label}
                href="#top"
                onClick={(e) => e.preventDefault()}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-all duration-300 hover:border-gold-soft hover:text-gold-soft"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="text-[11px] tracking-[0.18em] text-ivory/35 uppercase">Secure checkout · Cards & bank transfer</p>
        </div>
      </div>
    </footer>
  );
}
