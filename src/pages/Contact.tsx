import { useState } from "react";
import type { FormEvent } from "react";
import Reveal from "../components/Reveal";
import { CheckIcon, OrnamentDivider } from "../components/Ornaments";
import { useStore } from "../context/StoreContext";

const TOPICS = ["Baptism", "Custom candle", "Order", "Collaboration", "Other"];

export default function Contact() {
  const { notify } = useStore();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: "Baptism", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Please tell us your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "A valid email helps us reply";
    if (form.message.trim().length < 10) errs.message = "A few more words would help";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      notify("Your letter is on its way to the atelier");
    }
  };

  const field =
    "w-full border border-gold-pale bg-ivory px-4 py-3 text-sm text-ink placeholder:text-ink-faint/60 transition-colors focus:border-gold focus:outline-none";
  const label = "mb-1.5 block text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-faint";

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-deep">Contact</p>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[1.04] text-ink sm:text-6xl">
            Let's create something <em className="text-gold-deep italic">special</em>
          </h1>
          <p className="mt-6 max-w-md text-[14.5px] leading-relaxed text-ink-soft">
            A question about the rite, a colour you can't name, a baptism that is closer than you'd like — write to us.
            Every letter is read and answered by the atelier itself.
          </p>
          <OrnamentDivider className="mt-8 max-w-[200px] text-gold" />
          <dl className="mt-8 space-y-5">
            {[
              ["The atelier", "Via della Luce 14, Atelier Royal — by appointment"],
              ["Letters", "atelier@royalcandle.example"],
              ["Hours", "Tuesday – Saturday · 10.00 – 18.00"],
              ["Replies", "Within two working days, always personally"],
            ].map(([t, d]) => (
              <div key={t}>
                <dt className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-gold-deep">{t}</dt>
                <dd className="mt-1 text-[14px] text-ink-soft">{d}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Reveal delay={120}>
          <div className="border border-gold-pale bg-shell p-6 shadow-soft sm:p-9">
            {sent ? (
              <div className="fade-soft py-10 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-gold-pale/50 text-gold-deep">
                  <CheckIcon className="h-7 w-7" />
                </span>
                <h2 className="mt-6 font-display text-3xl font-medium text-ink">Your letter has left for the atelier</h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
                  Thank you, {form.name.trim().split(" ")[0]}. We will write back to <span className="font-semibold text-ink">{form.email}</span> within two
                  working days.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", phone: "", topic: "Baptism", message: "" });
                  }}
                  className="mt-8 border border-gold-soft px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-gold hover:text-gold-deep"
                >
                  Write another letter
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className={label}>Name</label>
                    <input id="c-name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Maria Rossi" className={field} />
                    {errors.name && <p className="mt-1 text-[11.5px] text-rose">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-email" className={label}>Email</label>
                    <input id="c-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className={field} />
                    {errors.email && <p className="mt-1 text-[11.5px] text-rose">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-phone" className={label}>Phone <span className="normal-case tracking-normal">(optional)</span></label>
                    <input id="c-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+39 …" className={field} />
                  </div>
                  <div>
                    <label htmlFor="c-topic" className={label}>Regarding</label>
                    <select id="c-topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className={field}>
                      {TOPICS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="c-message" className={label}>Message</label>
                    <textarea id="c-message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about the baptism — the date, the parish, the colours you imagine…" className={field} />
                    {errors.message && <p className="mt-1 text-[11.5px] text-rose">{errors.message}</p>}
                  </div>
                </div>
                <button type="submit" className="mt-7 w-full bg-espresso py-4 text-[11.5px] font-bold uppercase tracking-[0.24em] text-ivory transition-all duration-300 hover:bg-gold-deep hover:shadow-luxe sm:w-auto sm:px-12">
                  Send request
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
