"use client";

import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { ArrowRightIcon } from "./icons";

export function Prensa() {
  const { t } = useLang();

  return (
    <section id="prensa" className="mx-auto max-w-[1320px] scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <Reveal>
        <h2 className="max-w-3xl text-3xl font-extrabold text-brand-navy md:text-5xl">
          {t.prensa.title}
        </h2>
        <p className="mt-6 max-w-3xl text-lg text-brand-gray md:text-xl">{t.prensa.intro}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {t.prensa.items.map((item, i) => (
          <Reveal key={item.url} delay={(i % 3) * 80}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-3xl border border-brand-navy/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-brand-coral/40 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-coral">
                  {item.source}
                </span>
                {item.kind === "video" && (
                  <span className="rounded-full bg-brand-coral/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-coral">
                    ▶ Video
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-lg font-extrabold leading-snug text-brand-navy">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm text-brand-gray">{item.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-navy transition group-hover:text-brand-coral">
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
