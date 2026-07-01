"use client";

import { useMemo, useState } from "react";
import { useLang } from "../LangProvider";
import { Reveal } from "../Reveal";
import { MexicoChoropleth } from "./MexicoChoropleth";
import { WorldConnections } from "./WorldConnections";
import { DetailTable } from "./DetailTable";
import { NetworkGraph } from "../network/NetworkGraph";
import { obtenerDatosEstado, buildNetwork, RAMP_LEGEND, YEARS } from "@/lib/data";
import { cn } from "@/lib/utils";

type Tab = "mexico" | "mundo" | "red";

export function InteractiveMap() {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>("mexico");
  const [selected, setSelected] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [netReset, setNetReset] = useState(0);

  const netCounts = useMemo(() => {
    const { nodes } = buildNetwork(year);
    return {
      students: nodes.filter((n) => n.kind === "student").length,
      mentors: nodes.filter((n) => n.kind === "mentor").length,
    };
  }, [year]);

  const YearFilter = () => (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-brand-navy">{t.map.legendYear}</span>
      {[null, ...YEARS].map((y) => (
        <button
          key={y ?? "all"}
          onClick={() => setYear(y)}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-xs font-bold transition",
            year === y ? "bg-brand-coral text-white" : "bg-brand-navy/10 text-brand-navy hover:bg-brand-navy/20"
          )}
        >
          {y ?? t.map.yearAll}
        </button>
      ))}
    </div>
  );

  return (
    <section id="explora" className="scroll-mt-24 bg-brand-navy py-16 md:py-24">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-extrabold text-white md:text-5xl">{t.map.title}</h2>
          <p className="mt-6 max-w-3xl text-lg text-white/80">{t.map.intro}</p>
        </Reveal>

        {/* Tabs */}
        <div className="mt-8 inline-flex flex-wrap gap-1 rounded-full bg-white/10 p-1">
          {(
            [
              { key: "mexico", label: t.map.tabMexico },
              { key: "mundo", label: t.map.tabMundo },
              { key: "red", label: t.red.title },
            ] as const
          ).map((tabItem) => (
            <button
              key={tabItem.key}
              onClick={() => setTab(tabItem.key)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-bold transition",
                tab === tabItem.key ? "bg-brand-coral text-white" : "text-white/70 hover:text-white"
              )}
            >
              {tabItem.label}
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-white p-5 shadow-xl md:p-8">
          {tab === "mexico" && (
            <div>
              <div className="mx-auto max-w-4xl">
                <p className="mb-2 text-center text-sm text-brand-gray">{t.map.hint}</p>
                <MexicoChoropleth selected={selected} onSelect={setSelected} />
                {/* Legend */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-brand-gray">
                  <span className="font-semibold text-brand-navy">{t.map.legendStudents}</span>
                  {RAMP_LEGEND.map((l) => (
                    <span key={l.label} className="flex items-center gap-1.5">
                      <span className="inline-block h-3.5 w-3.5 rounded-sm" style={{ background: l.color }} />
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detail table appears below the map once a state is selected */}
              {selected && (
                <div className="mt-10 border-t border-brand-navy/10 pt-8">
                  <DetailTable estado={selected} rows={obtenerDatosEstado(selected)} />
                </div>
              )}
            </div>
          )}

          {tab === "mundo" && (
            <div>
              <div className="mb-5">
                <YearFilter />
              </div>

              <WorldConnections year={year} />

              {/* Legend */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-brand-gray">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-full bg-brand-coral" />
                  {t.map.legendMentorCountry}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-full border-2 border-brand-coral bg-white" />
                  {t.map.legendMexico}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-0.5 w-6 bg-brand-coral" />
                  {t.map.legendConnection}
                </span>
              </div>
            </div>
          )}

          {tab === "red" && (
            <div>
              <p className="mb-4 text-sm text-brand-gray">{t.red.intro}</p>
              <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                <YearFilter />
                <button
                  onClick={() => setNetReset((n) => n + 1)}
                  className="rounded-full border border-brand-navy/20 px-3.5 py-1.5 text-xs font-bold text-brand-navy transition hover:border-brand-coral hover:text-brand-coral"
                >
                  ⟳ {t.red.reset}
                </button>
                <div className="ml-auto flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 font-semibold text-brand-navy">
                    <span className="inline-block h-3 w-3 rounded-full" style={{ background: "#2f9e6b" }} />
                    {netCounts.students} {t.red.students}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-brand-navy">
                    <span className="inline-block h-3 w-3 rounded-full bg-brand-coral" />
                    {netCounts.mentors} {t.red.mentors}
                  </span>
                </div>
              </div>

              <NetworkGraph year={year} resetToken={netReset} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
