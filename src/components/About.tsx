"use client";

import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";

export function About() {
  const { t } = useLang();

  return (
    <section id="about" className="mx-auto max-w-[1320px] scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <Reveal>
        <h2 className="max-w-3xl text-3xl font-extrabold text-brand-navy md:text-5xl">
          {t.about.title}
        </h2>
        <p className="mt-6 max-w-3xl text-lg text-brand-gray md:text-xl">{t.about.intro}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {t.about.cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 90}>
            <div className="h-full rounded-3xl border border-brand-navy/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-coral/10 text-sm font-extrabold text-brand-coral">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-5 text-xl font-extrabold text-brand-navy">{card.title}</h3>
              <p className="mt-3 text-brand-gray">{card.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
