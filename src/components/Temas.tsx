"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";

export function Temas() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  const max = Math.max(...t.temas.items.map((i) => i.count));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="temas" className="scroll-mt-24 bg-brand-cream-dark/40 py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-extrabold text-brand-navy md:text-5xl">
            {t.temas.title}
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-brand-gray md:text-xl">{t.temas.intro}</p>
        </Reveal>

        <div ref={ref} className="mt-12 space-y-4">
          {t.temas.items.map((item, i) => (
            <div key={item.label} className="flex items-center gap-4">
              <div className="w-52 shrink-0 text-right text-sm font-semibold text-brand-navy md:w-72 md:text-base">
                {item.label}
              </div>
              <div className="relative h-9 flex-1 overflow-hidden rounded-full bg-white">
                <div
                  className="flex h-full items-center justify-end rounded-full bg-gradient-to-r from-brand-coral/70 to-brand-coral pr-3 text-xs font-extrabold text-white transition-[width] duration-1000 ease-out"
                  style={{
                    width: run ? `${(item.count / max) * 100}%` : "0%",
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  {run && item.count}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/posters"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-navy py-2.5 pl-6 pr-2.5 text-sm font-bold text-white transition hover:bg-brand-navy-dark"
          >
            <i className="bi bi-images" aria-hidden />
            {t.temas.viewPosters}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-coral transition group-hover:translate-x-0.5">
              <i className="bi bi-arrow-right text-white" aria-hidden />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
