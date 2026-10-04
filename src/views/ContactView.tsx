"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import ParallaxImage from "@/components/ParallaxImage";

type IntentId = "sales" | "support" | "press" | "careers";

const INTENTS: {
  id: IntentId;
  label: string;
  to: string;
  contextLabel: string;
  contextPlaceholder: string;
  messagePlaceholder: string;
  hint: string;
}[] = [
  {
    id: "sales",
    label: "Buy gear",
    to: "sale@northline.com",
    contextLabel: "Company / Project",
    contextPlaceholder: "e.g. Alpine doc series, 4 recordists",
    messagePlaceholder: "What are you recording? Where, when, how many kits?",
    hint: "For quotes, stock and field-kit recommendations. Reply in 1–2 working days.",
  },
  {
    id: "support",
    label: "Support",
    to: "gear@northline.com",
    contextLabel: "Gear model / Order nº",
    contextPlaceholder: "e.g. NL-01 + dual-card issue",
    messagePlaceholder: "What happened in the field? What have you tried?",
    hint: "For repairs, firmware and field failures. Include model + symptoms.",
  },
  {
    id: "press",
    label: "Press",
    to: "press@northline.com",
    contextLabel: "Outlet",
    contextPlaceholder: "e.g. Field Mag, deadline 12 Oct",
    messagePlaceholder: "Story angle, deadline, what do you need from us?",
    hint: "For interviews, loans and assets. Tell us your deadline first.",
  },
  {
    id: "careers",
    label: "Join us",
    to: "hello@northline.com",
    contextLabel: "Role / Portfolio link",
    contextPlaceholder: "e.g. Acoustic engineer — portfolio URL",
    messagePlaceholder: "Why field gear? Link your best work.",
    hint: "We hire slow. Show us something you built to survive outside.",
  },
];

const DIRECT = [
  { label: "Sales", email: "sale@northline.com" },
  { label: "Field support", email: "gear@northline.com" },
  { label: "Press", email: "press@northline.com" },
];

export default function ContactView() {
  const [intent, setIntent] = useState<IntentId>("sales");
  const [sent, setSent] = useState(false);

  const active = INTENTS.find((i) => i.id === intent)!;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <ParallaxImage src="/contact/hero.jpg" alt="" />
        <div className="absolute bottom-16 left-8">
          <h1 className="font-display text-display-1 uppercase text-sand mobile:text-[24vw]">
            Get in touch
          </h1>
        </div>
      </section>

      {/* Intro + intent form */}
      <section className="flex flex-col gap-12 bg-graphite px-8 py-24 md:flex-row">
        {/* Left: copy + direct channels */}
        <div className="flex-1">
          <p className="font-display uppercase text-sand">
            Working outdoors and your gear isn&rsquo;t keeping up? We want to
            hear about it.
          </p>
          <p className="mt-2 text-sand/70">
            Pick a reason — we only ask for what matters for that case.
          </p>

          <div className="mt-8 border-t border-sand/20 pt-6">
            <p className="font-display uppercase text-rust">
              Prefer email directly.
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {DIRECT.map((d) => (
                <li key={d.email} className="flex items-baseline justify-between gap-4">
                  <span className="text-sand/70">{d.label}</span>
                  <a
                    href={`mailto:${d.email}`}
                    className="font-display uppercase text-sand underline decoration-rust decoration-2 underline-offset-4 hover:text-rust"
                  >
                    {d.email}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-sm text-sm text-sand/50">
              Portland workshop — 118 Foundry Row. Replies in 1–2 working
              days. For urgent field failures, put the gear model in the
              subject.
            </p>
          </div>

          <div className="mt-8">
            <p className="font-display uppercase text-rust">
              Be part of our team.
            </p>
            <p className="mt-2 max-w-sm text-sand/70">
              Ready to build gear that survives the field? Choose
              &ldquo;Join us&rdquo; in the form.
            </p>
          </div>
        </div>

        {/* Right: form card */}
        <div id="form" className="flex-1 scroll-mt-24 bg-sand p-6 text-graphite md:p-8">
          {!sent ? (
            <>
              <p className="font-display uppercase text-graphite/60">
                01. What&rsquo;s this about?
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2" role="group" aria-label="Motivo del contacto">
                {INTENTS.map((i) => (
                  <button
                    key={i.id}
                    type="button"
                    onClick={() => setIntent(i.id)}
                    aria-pressed={intent === i.id}
                    className={`px-4 py-3 font-display uppercase transition-colors ${
                      intent === i.id
                        ? "bg-rust text-graphite"
                        : "border border-graphite/30 bg-transparent text-graphite hover:border-graphite"
                    }`}
                  >
                    {i.label}
                  </button>
                ))}
              </div>

              <p className="mt-3 text-sm text-graphite/60">{active.hint}</p>
              <p className="mt-1 text-sm text-graphite/60">
                Goes to: <span className="font-display uppercase">{active.to}</span>
              </p>

              <form
                className="mt-6 flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <p className="font-display uppercase text-graphite/60">
                  02. Your details
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="font-display text-sm uppercase">
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Ava Lindqvist"
                      className="mt-1 w-full border-b border-graphite/30 bg-transparent py-2 outline-none placeholder:text-graphite/40 focus:border-rust"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-display text-sm uppercase">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="ava@studio.com"
                      className="mt-1 w-full border-b border-graphite/30 bg-transparent py-2 outline-none placeholder:text-graphite/40 focus:border-rust"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="context" className="font-display text-sm uppercase">
                    {active.contextLabel} *
                  </label>
                  <input
                    id="context"
                    name="context"
                    required
                    placeholder={active.contextPlaceholder}
                    className="mt-1 w-full border-b border-graphite/30 bg-transparent py-2 outline-none placeholder:text-graphite/40 focus:border-rust"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="font-display text-sm uppercase">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder={active.messagePlaceholder}
                    className="mt-1 w-full resize-y border-b border-graphite/30 bg-transparent py-2 outline-none placeholder:text-graphite/40 focus:border-rust"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 self-start bg-rust px-8 py-3 font-display uppercase text-graphite transition-opacity hover:opacity-90"
                >
                  Send to {active.label} →
                </button>
                <p className="text-xs text-graphite/50">
                  No spam. We only use this to reply. Unsubscribe anytime.
                </p>
              </form>
            </>
          ) : (
            <div className="flex min-h-[320px] flex-col items-start justify-center gap-0">
              <p className="font-display text-[5rem] leading-none text-rust">✓</p>
              <p className="mt-2 font-display text-4xl uppercase">Message queued.</p>
              <p className="mt-4 max-w-sm text-graphite/70">
                Thanks — this would go to{" "}
                <span className="font-display uppercase">{active.to}</span>.
                We reply in 1–2 working days.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 border border-graphite/30 px-6 py-3 font-display uppercase hover:border-graphite"
              >
                Send another
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Marquee band — separator between form and closing */}
      <section className="w-full overflow-hidden whitespace-nowrap bg-rust py-1">
        <div className="flex w-max animate-marquee [animation-duration:60s]">
          {[0, 1, 2, 3].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {["Northline", "Get in Touch", "Built With Integrity", "Field-Tested Gear"].map((phrase) => (
                <span
                  key={`${copy}-${phrase}`}
                  className="mr-12 inline-block font-display text-4xl uppercase text-graphite"
                >
                  {phrase}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="flex flex-col gap-8 bg-graphite px-8 py-24 md:flex-row">
        <div className="flex-1">
          <h2 className="font-display text-display-2 uppercase text-sand mobile:text-[20vw]">
            Built With
            <br />
            Integrity
          </h2>
          <p className="mt-4 font-display uppercase text-rust">
            Reach out to collaborate or learn more about what we&rsquo;re building.
          </p>
          <div className="mt-8">
            <p className="font-display uppercase text-rust">press@northline.com</p>
            <p className="text-sand/70">Since 2026</p>
          </div>
          <p className="mt-8 max-w-md text-sand/70">
            Northline builds field-tested recording hardware and
            spatial-capture software, with transparent design decisions and a
            repair-first approach to gear that lasts.
          </p>
        </div>
        <div className="relative h-64 flex-1 overflow-hidden md:h-auto md:min-h-[400px]">
          <ParallaxImage src="/contact/banner.jpg" alt="Northline field gear" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
