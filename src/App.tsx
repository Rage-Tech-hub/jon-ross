import { useEffect, useState, type FormEvent, type ReactNode } from "react";

/* Jon Ross Atl — landing page
   Only owner-supplied facts appear as facts: name, Atlanta GA, phone, email, Instagram.
   No rating, price, hours, address, license or testimonial is claimed anywhere. */

const PHONE_DISPLAY = "(404) 924-5923";
const PHONE_TEL = "+14049245923";
const EMAIL = "jonrossatlanta@gmail.com";
const IG = "https://www.instagram.com/jonrossatl/";

const SHADES = ["#F6E0CD", "#EFCBAE", "#E3B18C", "#CE9265", "#B2744A", "#8E5735", "#6A4026", "#4A2C1B"];

function track(event: string, detail?: Record<string, unknown>) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...detail });
}

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function ShadeRail({ className = "" }: { className?: string }) {
  return (
    <div className={`shade-rail ${className}`} aria-hidden="true">
      {SHADES.map((s) => (
        <span key={s} style={{ background: s }} />
      ))}
    </div>
  );
}

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

function CallButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={`tel:${PHONE_TEL}`}
      onClick={() => track("call_click", { location: "button" })}
      className={`inline-flex items-center justify-center gap-2 bg-clay-deep px-5 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-ink ${className}`}
    >
      <PhoneIcon />
      {PHONE_DISPLAY}
    </a>
  );
}

function BookButton({ className = "", children = "Request a time" }: { className?: string; children?: ReactNode }) {
  return (
    <a
      href="#book"
      onClick={() => track("cta_click", { location: "primary" })}
      className={`inline-flex items-center justify-center gap-2 border border-ink px-5 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 hover:bg-ink hover:text-paper ${className}`}
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}

const PAINS = [
  {
    n: "01",
    title: "You book someone on Instagram. Then the messages stop.",
    body: "A week of silence before an event is normal in this industry, and by then you are out of time to find anyone else. Here, calls and texts to (404) 924-5923 go straight to Jon, and you get a reply from the person who is actually coming.",
  },
  {
    n: "02",
    title: "The price moves after you agree to it.",
    body: "Travel fee, booking fee, touch-up fee, a retainer that is not refundable — all added after the yes. You get one written quote before any money moves, with travel and touch-ups already in it. The number you approve is the number you pay.",
  },
  {
    n: "03",
    title: "Nobody shows up on the morning of.",
    body: "It is the loudest complaint in Atlanta bridal reviews, and it is the reason this page exists. Your appointment is confirmed in writing the day before, with a named arrival window — and if the session does not start at that time, you are not charged.",
  },
];

const SERVICES = [
  {
    name: "Makeup consultation",
    blurb:
      "A one-to-one sitting, not a rush job. Skin prep, shade matching in real daylight, the look you actually want, and the products and steps written down so you can repeat it at home.",
  },
  {
    name: "Skincare consultation",
    blurb:
      "A plain-language read of your skin and what you are using now. What to keep, what to stop, what to buy first. No product pitch, no 12-step routine you will abandon in a week.",
  },
  {
    name: "Events, bridal & on-location",
    blurb:
      "Weddings, shoots, headshots and nights out across metro Atlanta, on location. Party size, timing and arrival window confirmed in writing before the day, so nobody is guessing at 7 a.m.",
  },
];

const STEPS = [
  {
    n: "1",
    t: "Call, text or send the form",
    d: "Tell us the date, the occasion and what you are after. If you call (404) 924-5923, Jon picks up or calls you back.",
  },
  {
    n: "2",
    t: "Get it in writing",
    d: "Price, what is included, session length and your arrival window — before you pay anything.",
  },
  {
    n: "3",
    t: "Show up, get it done",
    d: "The session runs to the agreed time. You leave with the shades, products and steps written down.",
  },
];

const FAQS = [
  {
    q: "How do I book?",
    d: "Call or text (404) 924-5923, send the form on this page, or message @jonrossatl on Instagram. A date is only held once you have the written confirmation.",
  },
  {
    q: "What does it cost?",
    d: "Every session is quoted before you pay — one number, with travel and touch-ups included, so there is nothing added later. Ask on the call and you will get the price for your date straight away.",
  },
  {
    q: "Where do sessions happen?",
    d: "Atlanta and metro Atlanta. Tell us your address or venue when you enquire and travel is confirmed in your quote before you commit.",
  },
  {
    q: "Do you match my skin tone?",
    d: "Shade matching is done in daylight, on your skin, with the products you already own in front of us. That is the whole point of sitting down for a consultation instead of guessing from a photo online.",
  },
  {
    q: "What if I need to move the appointment?",
    d: "Call or text as early as you can. Give enough notice and we will move it — the terms are written into your confirmation, so you know exactly where you stand before you pay.",
  },
  {
    q: "Can you do my whole bridal party?",
    d: "Yes, on location across metro Atlanta. Send the date, the number of people and the ceremony time, and you will get a written schedule with an arrival window for each person.",
  },
];

function BookForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const contact = String(data.get("contact") || "");
    const need = String(data.get("need") || "");
    track("form_submit", { form: "request_a_time", need });
    const body = `Name: ${encodeURIComponent(name)}%0D%0AContact: ${encodeURIComponent(
      contact,
    )}%0D%0ANeed: ${encodeURIComponent(need)}%0D%0AFrom: landing page`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Consultation request — " + name)}&body=${body}`;
    setSent(true);
  }

  return (
    <div id="book" className="scroll-mt-24">
      <form onSubmit={onSubmit} className="border border-ink/25 bg-paper-deep/70 p-6 sm:p-8" aria-label="Request a consultation">
        <p className="micro text-clay-deep">Request a time</p>
        <h3 className="font-display mt-2 text-[clamp(1.7rem,4vw,2.4rem)] leading-[1.05]">
          Three fields. No account, no app.
        </h3>

        <label className="mt-6 block text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink-soft" htmlFor="f-name">
          Your name
        </label>
        <input
          id="f-name"
          name="name"
          required
          autoComplete="name"
          className="mt-2 w-full border border-ink/30 bg-paper px-4 py-3 text-base outline-none focus:border-clay-deep"
          placeholder="First and last name"
        />

        <label className="mt-5 block text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink-soft" htmlFor="f-contact">
          Phone or email
        </label>
        <input
          id="f-contact"
          name="contact"
          required
          autoComplete="tel"
          className="mt-2 w-full border border-ink/30 bg-paper px-4 py-3 text-base outline-none focus:border-clay-deep"
          placeholder="So Jon can reply"
        />

        <label className="mt-5 block text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink-soft" htmlFor="f-need">
          What do you need?
        </label>
        <select
          id="f-need"
          name="need"
          defaultValue="Makeup consultation"
          className="mt-2 w-full border border-ink/30 bg-paper px-4 py-3 text-base outline-none focus:border-clay-deep"
        >
          <option>Makeup consultation</option>
          <option>Skincare consultation</option>
          <option>Event, bridal or on-location booking</option>
          <option>Not sure yet — need advice</option>
        </select>

        <button
          type="submit"
          className="mt-6 w-full bg-clay-deep px-5 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-ink"
        >
          Send request →
        </button>

        <p className="mt-3 text-[0.82rem] leading-relaxed text-ink-soft">
          Opens a pre-filled email to {EMAIL}. Faster to talk?{" "}
          <a
            href={`tel:${PHONE_TEL}`}
            className="font-semibold underline underline-offset-4"
            onClick={() => track("call_click", { location: "form_note" })}
          >
            Call {PHONE_DISPLAY}
          </a>
          .
        </p>

        {sent && (
          <p role="status" className="mt-4 border border-clay-deep/50 bg-white/60 px-4 py-3 text-[0.9rem]">
            Your email app should be opening with the details filled in. If nothing opened, email{" "}
            <a className="underline" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>{" "}
            or call {PHONE_DISPLAY}.
          </p>
        )}
      </form>
    </div>
  );
}

export default function App() {
  useReveal();

  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "#jonrossatl",
    name: "Jon Ross Atl",
    description: "One-on-one makeup and skincare consultations in Atlanta, GA.",
    telephone: PHONE_TEL,
    email: EMAIL,
    url: IG,
    sameAs: [IG],
    address: { "@type": "PostalAddress", addressLocality: "Atlanta", addressRegion: "GA", addressCountry: "US" },
    areaServed: { "@type": "City", name: "Atlanta, GA" },
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Makeup consultation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Skincare consultation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Event and bridal makeup booking" } },
    ],
  };

  return (
    <div className="grain min-h-screen bg-paper text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/92 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#top" className="font-display text-[1.05rem] uppercase tracking-[0.16em]">
            Jon Ross <span className="italic normal-case tracking-normal">Atl</span>
          </a>
          <nav className="hidden items-center gap-7 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink-soft md:flex">
            <a href="#work" className="hover:text-clay-deep">The work</a>
            <a href="#services" className="hover:text-clay-deep">Services</a>
            <a href="#how" className="hover:text-clay-deep">How it works</a>
            <a href="#faq" className="hover:text-clay-deep">FAQ</a>
          </nav>
          <div className="hidden lg:block">
            <CallButton className="!py-2.5" />
          </div>
        </div>
      </header>

      <main id="top">
        {/* ---------------- hero ---------------- */}
        <section className="relative overflow-hidden border-b border-ink/15">
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-8 px-5 pt-10 pb-9 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:pt-16 lg:pb-14">
            <div className="reveal lg:col-span-7 lg:pr-4">
              <p className="micro text-clay-deep">Atlanta, GA · Makeup &amp; skincare consultations</p>

              <h1 className="font-display mt-5 text-[clamp(2.6rem,8.4vw,5.6rem)] leading-[0.94] tracking-[-0.015em]">
                Confirmed <span className="italic">in writing</span>, or your consultation is free.
              </h1>

              <p className="mt-6 max-w-[54ch] text-[clamp(1.02rem,1.6vw,1.2rem)] leading-[1.65] text-ink-soft">
                One-to-one makeup and skincare consultations with Jon Ross, for Atlanta clients who are tired of
                booking an artist and hearing nothing back. You get the price, the arrival window and the plan
                before you pay a dollar.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CallButton className="w-full sm:w-auto" />
                <BookButton className="w-full sm:w-auto" />
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink/15 pt-5 text-[0.86rem] text-ink-soft">
                <span>By appointment</span>
                <span className="hidden h-4 w-px bg-ink/25 sm:inline-block" />
                <span>Atlanta &amp; metro Atlanta</span>
                <span className="hidden h-4 w-px bg-ink/25 sm:inline-block" />
                <span>
                  Call or text <a href={`tel:${PHONE_TEL}`} className="font-semibold text-ink underline underline-offset-4" onClick={() => track("call_click", { location: "hero_trust" })}>{PHONE_DISPLAY}</a>
                </span>
              </div>
            </div>

            <div className="reveal lg:col-span-5">
              <figure className="relative h-[46vh] min-h-[300px] overflow-hidden lg:h-[64vh] lg:min-h-[440px]">
                <img
                  src="images/hero.jpg"
                  alt="A makeup artist's hand holding a brush near a client's cheekbone in soft window light"
                  className="h-full w-full object-cover object-[62%_center]"
                  width={1536}
                  height={1024}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-transparent" />
              </figure>
            </div>
          </div>

          <ShadeRail />
        </section>

        {/* ---------------- the work ---------------- */}
        <section id="work" className="scroll-mt-20 border-b border-ink/15">
          <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:py-20">
            <div className="reveal flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="micro text-clay-deep">The work</p>
                <h2 className="font-display mt-4 max-w-[16ch] text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.02]">
                  Skin first. Everything else follows.
                </h2>
              </div>
              <a
                href={IG}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => track("instagram_click", { location: "work_header" })}
                className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-clay-deep underline underline-offset-4 hover:text-ink"
              >
                See client work on Instagram →
              </a>
            </div>

            <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-5">
              <figure className="reveal sm:col-span-7">
                <img
                  src="images/hero.jpg"
                  alt="Close view of a makeup artist blending product along a client's cheekbone in daylight"
                  className="h-[260px] w-full object-cover object-[60%_center] sm:h-[420px]"
                  loading="lazy"
                  width={1536}
                  height={1024}
                />
              </figure>
              <div className="reveal grid gap-4 sm:col-span-5 sm:gap-5">
                <figure>
                  <img
                    src="images/swatch.jpg"
                    alt="Foundation shade swatches painted in a row from pale to deep on a forearm"
                    className="h-[200px] w-full object-cover sm:h-[202px]"
                    loading="lazy"
                    width={1536}
                    height={1024}
                  />
                </figure>
                <figure>
                  <img
                    src="images/kit.jpg"
                    alt="An open professional makeup kit with brushes, compacts and a mixing palette"
                    className="h-[200px] w-full object-cover sm:h-[202px]"
                    loading="lazy"
                    width={1536}
                    height={1024}
                  />
                </figure>
              </div>
            </div>

            <p className="reveal mt-5 text-[0.92rem] text-ink-soft">
              Booking, before-and-afters and current work live on{" "}
              <a
                href={IG}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-ink underline underline-offset-4"
                onClick={() => track("instagram_click", { location: "work_note" })}
              >
                Instagram @jonrossatl
              </a>
              .
            </p>
          </div>
        </section>

        {/* ---------------- pain -> how it works instead ---------------- */}
        <section id="why" className="scroll-mt-20 border-b border-ink/15 bg-paper-deep/60">
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:py-20">
            <div className="reveal lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <p className="micro text-clay-deep">Why this page exists</p>
                <h2 className="font-display mt-4 text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.02]">
                  Three things go wrong. Here is what happens instead.
                </h2>
                <p className="mt-4 max-w-[38ch] text-[0.98rem] leading-relaxed text-ink-soft">
                  Everyone in this market has heard the same stories from a friend's wedding morning. This is how
                  those stories do not start.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              {PAINS.map((p) => (
                <article key={p.n} className="reveal border-t border-ink/25 py-7 first:border-t-0 first:pt-0">
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-7">
                    <span className="font-display text-[2.4rem] leading-none text-clay sm:w-16">{p.n}</span>
                    <div className="flex-1">
                      <h3 className="font-display text-[clamp(1.35rem,2.6vw,1.85rem)] leading-tight">{p.title}</h3>
                      <p className="mt-3 max-w-[62ch] text-[1.02rem] leading-[1.65] text-ink-soft">{p.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- services ---------------- */}
        <section id="services" className="scroll-mt-20 border-b border-ink/15">
          <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:py-20">
            <div className="reveal flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="micro text-clay-deep">What you can book</p>
                <h2 className="font-display mt-4 text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.02]">
                  Three ways to sit down with Jon.
                </h2>
              </div>
              <p className="max-w-[34ch] text-[0.98rem] leading-relaxed text-ink-soft">
                One written quote before you pay, with travel and touch-ups already in it.
              </p>
            </div>

            <div className="mt-9 grid grid-cols-1 gap-x-12 gap-y-0 md:grid-cols-3">
              {SERVICES.map((s, i) => (
                <div key={s.name} className={`reveal border-t border-ink/25 py-6 md:border-t-0 ${i === 0 ? "md:pt-0" : ""}`}>
                  <span className="font-display text-[1.6rem] leading-none text-clay">0{i + 1}</span>
                  <h3 className="font-display mt-3 text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight">{s.name}</h3>
                  <p className="mt-3 text-[1rem] leading-[1.62] text-ink-soft">{s.blurb}</p>
                  <a
                    href="#book"
                    onClick={() => track("cta_click", { location: "service", label: s.name })}
                    className="mt-4 inline-block text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-clay-deep underline underline-offset-4 hover:text-ink"
                  >
                    Request this →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- why choose us ---------------- */}
        <section className="border-b border-ink/15 bg-paper-deep/60">
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:py-20">
            <div className="reveal lg:col-span-5">
              <p className="micro text-clay-deep">Why choose us</p>
              <h2 className="font-display mt-4 text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.02]">
                Run like an appointment, not a maybe.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:col-span-7">
              {[
                ["One person, start to finish", "You talk to the artist who shows up. No handoff to a booking team, no group chat, no relay of messages."],
                ["Written before paid", "Price, session length, location and arrival window arrive in writing before any deposit."],
                ["Shade work in daylight", "Matching happens in real light on your skin, with the products you already own in the room."],
                ["You leave with a record", "The shades, products and steps get written down so you can repeat the look yourself."],
              ].map(([t, d]) => (
                <div key={t} className="reveal border-t border-ink/25 pt-4">
                  <h3 className="font-display text-[1.3rem] leading-tight">{t}</h3>
                  <p className="mt-2 text-[0.98rem] leading-[1.6] text-ink-soft">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- how it works ---------------- */}
        <section id="how" className="scroll-mt-20 border-b border-ink/15 bg-espresso text-paper">
          <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:py-20">
            <div className="reveal flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="micro text-sand">How it works</p>
                <h2 className="font-display mt-3 text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.02] text-paper">
                  Three steps, no guessing.
                </h2>
              </div>
              <a
                href={`tel:${PHONE_TEL}`}
                onClick={() => track("call_click", { location: "how_section" })}
                className="text-[0.9rem] font-semibold uppercase tracking-[0.14em] text-sand underline underline-offset-4 hover:text-white"
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>

            <ol className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {STEPS.map((s) => (
                <li key={s.n} className="reveal border-t border-paper/25 pt-5">
                  <span className="font-display text-[3.2rem] leading-none text-sand">{s.n}</span>
                  <h3 className="font-display mt-3 text-[1.4rem] leading-tight text-paper">{s.t}</h3>
                  <p className="mt-2 text-[0.98rem] leading-[1.65] text-paper/80">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
          <ShadeRail />
        </section>

        {/* ---------------- guarantee ---------------- */}
        <section className="border-b border-ink/15">
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-8 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:py-20">
            <div className="reveal lg:col-span-8">
              <p className="micro text-clay-deep">The promise</p>
              <h2 className="font-display mt-4 text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.05]">
                If I'm not there at the agreed time, your consultation is free.
              </h2>
              <p className="mt-5 max-w-[58ch] text-[1.05rem] leading-[1.65] text-ink-soft">
                Your appointment is confirmed in writing the day before, with a named arrival window. If the session
                does not start at that time through no fault of yours, you are not charged. That is the whole deal:
                you should never spend a wedding morning guessing whether your artist is coming.
              </p>
            </div>
            <div className="reveal lg:col-span-4">
              <div className="h-full border border-ink/25 bg-paper-deep/70 p-6">
                <p className="micro text-ink-soft">Before you pay</p>
                <ul className="mt-4 space-y-3 text-[0.97rem] leading-snug text-ink">
                  <li>· One written quote, all-in</li>
                  <li>· Arrival window in writing</li>
                  <li>· Cancellation terms stated up front</li>
                  <li>· Your date held only once confirmed</li>
                </ul>
                <a
                  href={`tel:${PHONE_TEL}`}
                  onClick={() => track("call_click", { location: "guarantee" })}
                  className="mt-6 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-clay-deep underline underline-offset-4 hover:text-ink"
                >
                  <PhoneIcon /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section id="faq" className="scroll-mt-20 border-b border-ink/15 bg-paper-deep/60">
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:py-20">
            <div className="reveal lg:col-span-4">
              <p className="micro text-clay-deep">Questions</p>
              <h2 className="font-display mt-4 text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.02]">Answered straight.</h2>
              <p className="mt-4 max-w-[34ch] text-[0.98rem] leading-relaxed text-ink-soft">
                Anything not answered here, call or text — you will get a person, not a form reply.
              </p>
            </div>
            <div className="lg:col-span-8">
              {FAQS.map((f) => (
                <details key={f.q} className="reveal group border-t border-ink/25 py-4 first:border-t-0">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-[1.08rem] font-semibold leading-snug [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="font-display text-xl text-clay-deep transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[62ch] text-[1rem] leading-[1.65] text-ink-soft">{f.d}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- final CTA ---------------- */}
        <section id="contact" className="scroll-mt-20 border-b border-ink/15">
          <div className="relative">
            <img
              src="images/atlanta.jpg"
              alt="A leafy Atlanta residential street in warm late-afternoon light"
              className="h-[240px] w-full object-cover sm:h-[320px]"
              loading="lazy"
              width={1536}
              height={1024}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/92 via-espresso/55 to-espresso/20" />
            <div className="absolute inset-0 flex items-end">
              <div className="mx-auto w-full max-w-[1240px] px-5 pb-7 sm:px-8">
                <p className="micro text-sand">Serving Atlanta, GA and metro Atlanta</p>
                <h2 className="font-display mt-2 max-w-[18ch] text-[clamp(2rem,5.6vw,3.6rem)] leading-[0.98] text-paper">
                  Book the appointment you can plan around.
                </h2>
              </div>
            </div>
          </div>

          <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:py-16">
            <div className="reveal lg:col-span-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <CallButton className="w-full sm:w-auto" />
                <BookButton className="w-full sm:w-auto" />
              </div>

              <dl className="mt-9 divide-y divide-ink/15 border-y border-ink/15 text-[0.98rem]">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[170px_1fr] sm:gap-4">
                  <dt className="micro text-ink-soft">Business</dt>
                  <dd>Jon Ross Atl</dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[170px_1fr] sm:gap-4">
                  <dt className="micro text-ink-soft">Phone</dt>
                  <dd>
                    <a href={`tel:${PHONE_TEL}`} className="font-semibold underline underline-offset-4" onClick={() => track("call_click", { location: "contact_details" })}>
                      {PHONE_DISPLAY}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[170px_1fr] sm:gap-4">
                  <dt className="micro text-ink-soft">Email</dt>
                  <dd className="break-all">
                    <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">{EMAIL}</a>
                  </dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[170px_1fr] sm:gap-4">
                  <dt className="micro text-ink-soft">Instagram</dt>
                  <dd>
                    <a href={IG} target="_blank" rel="noreferrer noopener" className="underline underline-offset-4" onClick={() => track("instagram_click", { location: "contact_details" })}>
                      @jonrossatl
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[170px_1fr] sm:gap-4">
                  <dt className="micro text-ink-soft">Service area</dt>
                  <dd>Atlanta, GA &amp; metro Atlanta — by appointment</dd>
                </div>
              </dl>

              <p className="mt-4 text-[0.86rem] leading-relaxed text-ink-soft">
                Sessions are by appointment — the location and start time are confirmed with your booking, so
                nobody makes a trip that is not needed.
              </p>
            </div>

            <div className="reveal lg:col-span-6">
              <BookForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-espresso pb-24 text-paper/70 lg:pb-8">
        <div className="mx-auto max-w-[1240px] px-5 py-8 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-[1.05rem] uppercase tracking-[0.16em] text-paper">
              Jon Ross <span className="italic normal-case tracking-normal">Atl</span>
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.88rem]">
              <a href={`tel:${PHONE_TEL}`} onClick={() => track("call_click", { location: "footer" })} className="hover:text-white">
                {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} className="hover:text-white">
                {EMAIL}
              </a>
              <a
                href={IG}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => track("instagram_click", { location: "footer" })}
                className="hover:text-white"
              >
                Instagram @jonrossatl
              </a>
            </div>
          </div>
          <p className="mt-5 text-[0.76rem] leading-relaxed text-paper/50">
            Makeup &amp; skincare consultations · Atlanta, GA
          </p>
        </div>
      </footer>

      {/* sticky mobile bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/20 bg-paper/97 backdrop-blur-sm lg:hidden">
        <div className="flex items-stretch gap-2 px-3 py-2.5">
          <a
            href={`tel:${PHONE_TEL}`}
            onClick={() => track("call_click", { location: "sticky_bar" })}
            className="flex flex-1 items-center justify-center gap-2 bg-clay-deep px-3 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white active:bg-ink"
          >
            <PhoneIcon />
            Call now
          </a>
          <a
            href="#book"
            onClick={() => track("cta_click", { location: "sticky_bar" })}
            className="flex flex-1 items-center justify-center border border-ink px-3 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em]"
          >
            Request a time
          </a>
        </div>
      </div>
    </div>
  );
}
