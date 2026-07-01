"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";

function useCountUp(target: number, run: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
}

function Stat({ value, label, run }: { value: number; label: string; run: boolean }) {
  const n = useCountUp(value, run);
  return (
    <div className="text-center">
      <div className="text-5xl font-extrabold text-brand-coral md:text-6xl">{n}</div>
      <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-brand-navy/70 md:text-base">
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

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
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const items = [
    { value: 71, label: t.stats.students },
    { value: 101, label: t.stats.posters },
    { value: 12, label: t.stats.states },
    { value: 16, label: t.stats.communities },
  ];

  return (
    <section className="mx-auto max-w-[1320px] px-5 py-16 md:px-8 md:py-20">
      <div
        ref={ref}
        className="grid grid-cols-2 gap-8 rounded-3xl border border-brand-navy/10 bg-white p-10 shadow-sm md:grid-cols-4 md:p-14"
      >
        {items.map((it) => (
          <Stat key={it.label} value={it.value} label={it.label} run={run} />
        ))}
      </div>
    </section>
  );
}
