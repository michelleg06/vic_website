"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import type { PosterYear, PosterItem } from "@/lib/posters";
import { cn } from "@/lib/utils";

function PosterCard({ item, downloadLabel }: { item: PosterItem; downloadLabel: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  // Only mount the (heavy) PDF preview once the card scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href={item.url}
      download={item.file}
      className="group block"
      title={`${downloadLabel} — ${item.student}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-sm transition group-hover:-translate-y-1 group-hover:border-brand-coral/40 group-hover:shadow-lg">
        {visible ? (
          <object
            data={`${item.url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            type="application/pdf"
            aria-label={item.student}
            className="pointer-events-none h-full w-full"
          >
            <div className="flex h-full items-center justify-center p-4 text-center text-sm text-brand-gray">
              PDF
            </div>
          </object>
        ) : (
          <div className="flex h-full items-center justify-center bg-brand-cream/60">
            <span className="text-3xl">📄</span>
          </div>
        )}

        {/* Hover overlay with a download affordance; also captures the click. */}
        <div className="absolute inset-0 flex items-end justify-center bg-brand-navy/0 opacity-0 transition group-hover:bg-brand-navy/10 group-hover:opacity-100">
          <span className="mb-3 rounded-full bg-brand-coral px-4 py-1.5 text-xs font-bold text-white shadow-lg">
            ↓ {downloadLabel}
          </span>
        </div>
      </div>

      <p className="mt-3 text-center text-sm font-semibold text-brand-navy">{item.student}</p>
    </a>
  );
}

export function Posters({ posters }: { posters: PosterYear[] }) {
  const { t } = useLang();
  const [year, setYear] = useState<number>(posters[0]?.year ?? 0);

  if (posters.length === 0) return null;

  const active = posters.find((p) => p.year === year) ?? posters[0];

  return (
    <section id="posters" className="scroll-mt-24 bg-brand-cream-dark/40 py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-extrabold text-brand-navy md:text-5xl">
            {t.posters.title}
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-brand-gray md:text-xl">{t.posters.intro}</p>
        </Reveal>

        {/* Year tabs */}
        <div className="mt-8 inline-flex flex-wrap gap-2 rounded-full bg-white p-1 shadow-sm">
          {posters.map((p) => (
            <button
              key={p.year}
              onClick={() => setYear(p.year)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-bold transition",
                p.year === active.year
                  ? "bg-brand-coral text-white"
                  : "text-brand-navy/70 hover:text-brand-navy"
              )}
            >
              {p.year}
              <span className="ml-1.5 opacity-60">({p.items.length})</span>
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {active.items.map((item) => (
            <PosterCard key={item.file} item={item} downloadLabel={t.posters.download} />
          ))}
        </div>
      </div>
    </section>
  );
}
