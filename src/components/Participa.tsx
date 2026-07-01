"use client";

import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { PARTICIPA_EMAIL } from "@/lib/i18n";
import { ArrowRightIcon, MailIcon } from "./icons";

export function Participa() {
  const { t } = useLang();

  return (
    <section id="participa" className="scroll-mt-24 bg-brand-navy py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-gold">
            {t.participa.kicker}
          </span>
          <h2 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
            {t.participa.title}
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-white/80 md:text-xl">{t.participa.lead}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Who can participate */}
          <Reveal className="h-full">
            <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-extrabold text-brand-gold">{t.participa.whoTitle}</h3>
              <p className="mt-3 font-semibold text-white/90">{t.participa.whoLead}</p>
              <ul className="mt-4 space-y-3">
                {t.participa.who.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-coral" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Activities */}
          <Reveal className="h-full" delay={90}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-extrabold text-brand-gold">{t.participa.activitiesTitle}</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {t.participa.activities.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border-l-2 border-brand-gold bg-white/5 px-4 py-3 text-sm text-white/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* CTA row */}
        <Reveal>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand-gold/10 p-8 md:flex-row md:items-center">
            <div className="flex items-center gap-3 text-white/85">
              <MailIcon className="h-5 w-5 text-brand-gold" />
              <div>
                <p className="text-sm text-white/60">{t.participa.contactLabel}</p>
                <a href={`mailto:${PARTICIPA_EMAIL}`} className="font-semibold text-white hover:text-brand-gold">
                  {PARTICIPA_EMAIL}
                </a>
              </div>
            </div>
            <a
              href={`mailto:${PARTICIPA_EMAIL}?subject=${encodeURIComponent("Registro — Verano Internacional de la Ciencia")}`}
              className="group inline-flex items-center gap-4 rounded-full bg-brand-gold py-2.5 pl-7 pr-2.5 text-base font-bold text-brand-navy shadow-lg transition hover:bg-brand-gold-dark"
            >
              {t.participa.cta}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-brand-gold transition group-hover:translate-x-0.5">
                <ArrowRightIcon className="h-5 w-5" />
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
