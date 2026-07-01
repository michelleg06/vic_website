"use client";

import { useLang } from "./LangProvider";
import { Logo } from "./Logo";
import { ArrowRightIcon } from "./icons";

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="px-3 pt-3 md:px-5 md:pt-5">
      <div className="relative mx-auto flex min-h-[560px] max-w-[1860px] items-center overflow-hidden rounded-[36px] border-[10px] border-brand-cream bg-brand-navy md:min-h-[80vh] md:rounded-[56px] md:border-[18px]">
        {/* Decorative gradient wash + coral orbs */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy to-[#2b1a4a]" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-coral/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-brand-coral/20 blur-3xl" />

        {/* Subtle floating dots (prototype) — gentle bob, respects reduced-motion */}
        <span
          className="vic-float pointer-events-none absolute right-[14%] top-[22%] h-4 w-4 rounded-full bg-brand-coral/80 shadow-lg"
          style={{ ["--vic-float-y" as string]: "-22px", ["--vic-float-x" as string]: "8px", ["--vic-float-dur" as string]: "6.5s" }}
        />
        <span
          className="vic-float pointer-events-none absolute right-[30%] top-[58%] h-2.5 w-2.5 rounded-full bg-brand-gold shadow"
          style={{ ["--vic-float-y" as string]: "16px", ["--vic-float-x" as string]: "-6px", ["--vic-float-dur" as string]: "8.5s" }}
        />
        <span
          className="vic-float pointer-events-none absolute right-[46%] top-[16%] hidden h-3 w-3 rounded-full bg-white/70 md:block"
          style={{ ["--vic-float-y" as string]: "-14px", ["--vic-float-x" as string]: "-10px", ["--vic-float-dur" as string]: "9.5s" }}
        />

        {/* Giant faded wordmark */}
        <span className="hero-wordmark pointer-events-none absolute -bottom-4 left-2 select-none text-[22vw] leading-none md:text-[15vw]">
          CIENCIA
        </span>

        {/* Content */}
        <div className="relative z-10 mx-auto grid w-full max-w-[1320px] items-center gap-10 px-6 py-20 md:grid-cols-[1.25fr_1fr] md:gap-8 md:px-12">
          {/* Left: copy + CTA */}
          <div>
            <Logo className="mb-6 h-20 w-20 shadow-xl ring-4 ring-white/20 md:hidden" />

            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80">
              {t.hero.kicker}
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] text-white md:text-6xl">
              {t.hero.title}
            </h1>

            <p className="mt-6 text-lg font-semibold text-brand-coral md:text-2xl">
              {t.hero.tagline}
            </p>

            <p className="mt-4 max-w-xl text-base text-white/75 md:text-lg">{t.hero.lead}</p>

            <a
              href="#explora"
              className="group mt-9 inline-flex items-center gap-4 rounded-full bg-brand-coral py-2 pl-7 pr-2 text-base font-bold text-white shadow-lg transition hover:bg-brand-coral-dark"
            >
              {t.hero.cta}
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-coral transition group-hover:translate-x-0.5">
                <ArrowRightIcon className="h-5 w-5" />
              </span>
            </a>
          </div>

          {/* Right: large emblem (fills the space on desktop) */}
          <div className="hidden justify-self-center md:block">
            <Logo className="h-64 w-64 shadow-2xl ring-8 ring-white/10 lg:h-80 lg:w-80" />
          </div>
        </div>
      </div>
    </section>
  );
}
