"use client";

import { useState } from "react";
import { useLang } from "../LangProvider";
import type { ResearchRow } from "@/lib/data";
import { POSTER_BASE } from "./geo";

type SortKey = "investigacion" | "estudiante" | "comunidad_indigena" | "mentor" | "ano" | "poster";

export function DetailTable({ estado, rows }: { estado: string | null; rows: ResearchRow[] }) {
  const { t } = useLang();
  const [sort, setSort] = useState<{ key: SortKey; asc: boolean }>({ key: "ano", asc: false });
  const [poster, setPoster] = useState<ResearchRow | null>(null);

  if (!estado) {
    return (
      <div className="flex h-full min-h-40 items-center justify-center rounded-2xl border border-dashed border-brand-navy/20 p-8 text-center text-brand-gray">
        {t.map.detailPlaceholder}
      </div>
    );
  }

  const columns: { key: SortKey; label: string }[] = [
    { key: "investigacion", label: t.map.columns.investigacion },
    { key: "estudiante", label: t.map.columns.estudiante },
    { key: "comunidad_indigena", label: t.map.columns.comunidad },
    { key: "mentor", label: t.map.columns.mentor },
    { key: "ano", label: t.map.columns.ano },
    { key: "poster", label: t.map.columns.tipo },
  ];

  const sorted = [...rows].sort((a, b) => {
    const dir = sort.asc ? 1 : -1;
    const av = a[sort.key];
    const bv = b[sort.key];
    if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
    return String(av).localeCompare(String(bv)) * dir;
  });

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, asc: !s.asc } : { key, asc: true }));

  return (
    <div>
      <h3 className="text-xl font-extrabold text-brand-navy">{t.map.detailTitle(estado)}</h3>

      <div className="mt-4 max-h-[440px] overflow-auto rounded-2xl border border-brand-navy/10">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="sticky top-0 bg-brand-navy text-white">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  onClick={() => toggleSort(c.key)}
                  className="cursor-pointer select-none px-3 py-2.5 font-semibold whitespace-nowrap hover:text-brand-coral"
                >
                  {c.label}
                  {sort.key === c.key && <span className="ml-1">{sort.asc ? "▲" : "▼"}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr key={i} className="border-t border-brand-navy/5 odd:bg-brand-cream/40">
                <td className="px-3 py-2.5 align-top text-brand-navy">{r.investigacion}</td>
                <td className="px-3 py-2.5 align-top">{r.estudiante}</td>
                <td className="px-3 py-2.5 align-top">{r.comunidad_indigena || "—"}</td>
                <td className="px-3 py-2.5 align-top">
                  {r.mentor}
                  {r.mentor_pais && r.mentor_pais !== "N/A" && (
                    <span className="block text-xs text-brand-gray">{r.mentor_pais}</span>
                  )}
                </td>
                <td className="px-3 py-2.5 align-top tabular-nums">{r.ano}</td>
                <td className="px-3 py-2.5 align-top">
                  {r.poster ? (
                    r.poster_url ? (
                      <button
                        onClick={() => setPoster(r)}
                        className="rounded-full bg-brand-coral px-2.5 py-1 text-xs font-bold text-white transition hover:bg-brand-coral-dark"
                      >
                        {t.map.poster}
                      </button>
                    ) : (
                      <span className="rounded-full bg-brand-coral/10 px-2.5 py-1 text-xs font-bold text-brand-coral">
                        {t.map.poster}
                      </span>
                    )
                  ) : (
                    <span className="rounded-full bg-brand-navy/10 px-2.5 py-1 text-xs font-bold text-brand-navy">
                      {t.map.project}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {poster && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setPoster(null)}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-brand-navy/10 p-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-coral">
                  {poster.estudiante}
                </p>
                <h4 className="text-base font-extrabold text-brand-navy">{poster.investigacion}</h4>
              </div>
              <button
                onClick={() => setPoster(null)}
                aria-label="Close"
                className="shrink-0 rounded-full bg-brand-navy/10 px-3 py-1 text-brand-navy hover:bg-brand-navy/20"
              >
                ✕
              </button>
            </div>
            <iframe
              src={POSTER_BASE + poster.poster_url}
              title={poster.investigacion}
              className="h-[70vh] w-full"
            />
            <div className="border-t border-brand-navy/10 p-3 text-center">
              <a
                href={POSTER_BASE + poster.poster_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-brand-coral hover:underline"
              >
                {t.map.viewPoster} ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
