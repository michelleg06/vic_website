"use client";

import { useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath, geoCentroid } from "d3";
import { feature } from "topojson-client";
import type { FeatureCollection, Feature, Geometry, GeoJsonProperties } from "geojson";
import worldTopoRaw from "@/data/geo/countries-110m.json";
import { CONEXIONES, type Conexion } from "@/lib/data";
import { useLang } from "../LangProvider";
import { PAIS_ALIAS, US_REGION_LATLNG } from "./geo";

const W = 900;
const H = 470;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const worldTopo = worldTopoRaw as any;
const world = feature(worldTopo, worldTopo.objects.countries) as unknown as FeatureCollection<
  Geometry,
  { name: string }
>;

const COUNTRY_BY_NAME: Record<string, Feature<Geometry, { name: string }>> = (() => {
  const m: Record<string, Feature<Geometry, { name: string }>> = {};
  world.features.forEach((f) => (m[f.properties.name] = f));
  return m;
})();

const MEXICO_CENTROID = geoCentroid(COUNTRY_BY_NAME["Mexico"]);

interface Target {
  key: string;
  label: string;
  lngLat: [number, number];
  count: number;
}

/** Resolve the [lng,lat] a connection points to (US regions spread out). */
function targetFor(c: Conexion): { key: string; label: string; lngLat: [number, number] } | null {
  if (c.pais === "EEUU" && c.region && US_REGION_LATLNG[c.region]) {
    return { key: `EEUU-${c.region}`, label: `EEUU · ${c.region}`, lngLat: US_REGION_LATLNG[c.region] };
  }
  const name = PAIS_ALIAS[c.pais];
  const f = name ? COUNTRY_BY_NAME[name] : undefined;
  if (!f) return null;
  return { key: c.pais, label: c.pais, lngLat: geoCentroid(f) };
}

export function WorldConnections({ year }: { year: number | null }) {
  const { t } = useLang();
  const [hover, setHover] = useState<{ x: number; y: number; label: string } | null>(null);

  const projection = useMemo(
    () => geoNaturalEarth1().fitSize([W, H], { type: "Sphere" }),
    []
  );
  const path = useMemo(() => geoPath(projection), [projection]);

  // Aggregate connections (year-filtered) into unique targets with a count.
  const targets = useMemo(() => {
    const conns = year ? CONEXIONES.filter((c) => c.ano === year) : CONEXIONES;
    const byKey: Record<string, Target> = {};
    conns.forEach((c) => {
      if (c.pais === "México" || !c.pais) return;
      const tg = targetFor(c);
      if (!tg) return;
      if (!byKey[tg.key]) byKey[tg.key] = { ...tg, count: 0 };
      byKey[tg.key].count += 1;
    });
    return Object.values(byKey);
  }, [year]);

  const maxCount = Math.max(1, ...targets.map((t) => t.count));
  const originXY = projection(MEXICO_CENTROID as [number, number])!;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full rounded-2xl bg-brand-navy" role="img" aria-label={t.map.tabMundo}>
        {/* Sphere / ocean */}
        <path d={path({ type: "Sphere" }) ?? undefined} fill="#16204a" />
        {/* Landmasses */}
        {world.features.map((f, i) => (
          <path key={i} d={path(f) ?? undefined} fill="#2c3a73" stroke="#1f2a60" strokeWidth={0.4} />
        ))}

        {/* Arcs Mexico → mentor countries (great-circle geodesics) */}
        {targets.map((tg, i) => {
          const line: Feature<Geometry, GeoJsonProperties> = {
            type: "Feature",
            geometry: { type: "LineString", coordinates: [MEXICO_CENTROID, tg.lngLat] },
            properties: {},
          };
          return (
            <path
              key={`arc-${tg.key}`}
              d={path(line) ?? undefined}
              className="vic-arc"
              fill="none"
              stroke="var(--color-brand-coral)"
              strokeWidth={1 + (tg.count / maxCount) * 2.5}
              strokeOpacity={0.75}
              style={{ animationDelay: `${i * 60}ms` }}
              pathLength={1}
            />
          );
        })}

        {/* Mentor country nodes */}
        {targets.map((tg) => {
          const xy = projection(tg.lngLat);
          if (!xy) return null;
          const r = 3 + (tg.count / maxCount) * 7;
          return (
            <circle
              key={`node-${tg.key}`}
              cx={xy[0]}
              cy={xy[1]}
              r={r}
              fill="var(--color-brand-coral)"
              stroke="#fff"
              strokeWidth={1}
              className="cursor-pointer"
              onMouseEnter={(e) =>
                setHover({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY, label: `${tg.label}: ${tg.count}` })
              }
              onMouseMove={(e) =>
                setHover((h) => (h ? { ...h, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY } : h))
              }
              onMouseLeave={() => setHover(null)}
            />
          );
        })}

        {/* Mexico origin node (pulsing) */}
        {originXY && (
          <>
            <circle cx={originXY[0]} cy={originXY[1]} r={16} fill="#fff" opacity={0.5} style={{ transformOrigin: `${originXY[0]}px ${originXY[1]}px`, animation: "vic-pulse 2.4s ease-in-out infinite" }} />
            <circle cx={originXY[0]} cy={originXY[1]} r={6} fill="#fff" stroke="var(--color-brand-coral)" strokeWidth={2} />
          </>
        )}
      </svg>

      {hover && (
        <div
          className="pointer-events-none absolute z-20 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-brand-navy shadow-lg"
          style={{ left: hover.x + 12, top: hover.y - 8 }}
        >
          {hover.label}
        </div>
      )}
    </div>
  );
}
