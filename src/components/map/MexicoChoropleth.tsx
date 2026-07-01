"use client";

import { useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3";
import type { FeatureCollection, Feature, Geometry } from "geojson";
import mexicoGeoRaw from "@/data/geo/mexico-states-raw.json";
import { ESTUDIANTES, contarEstudiantes, obtenerDatosEstado, colorPorCantidad } from "@/lib/data";
import { useLang } from "../LangProvider";
import { geoKey } from "./geo";

const mexicoGeo = mexicoGeoRaw as unknown as FeatureCollection<Geometry, { name: string }>;

const W = 820;
const H = 500;

// Map each geojson state (by normalized key) to a representative student `estado`
// data value, so clicks resolve back to the exact label used in the data.
const GEO_TO_ESTADO: Record<string, string> = (() => {
  const m: Record<string, string> = {};
  ESTUDIANTES.forEach((e) => {
    m[geoKey(e.estado)] = e.estado;
  });
  return m;
})();

export function MexicoChoropleth({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (estado: string) => void;
}) {
  const { t } = useLang();
  const [hover, setHover] = useState<{ x: number; y: number; label: string } | null>(null);

  const path = useMemo(() => {
    const projection = geoMercator().fitSize([W, H], mexicoGeo);
    return geoPath(projection);
  }, []);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={t.map.tabMexico}>
        {mexicoGeo.features.map((f: Feature<Geometry, { name: string }>, i) => {
          const featName = f.properties.name;
          const studentEstado = GEO_TO_ESTADO[geoKey(featName)];
          const count = studentEstado ? contarEstudiantes(studentEstado) : 0;
          const isSelected = studentEstado != null && selected != null && geoKey(selected) === geoKey(featName);
          const d = path(f) ?? undefined;

          return (
            <path
              key={i}
              d={d}
              fill={colorPorCantidad(count)}
              stroke={isSelected ? "var(--color-brand-coral-dark)" : "#ffffff"}
              strokeWidth={isSelected ? 2.5 : 0.8}
              className={studentEstado ? "cursor-pointer transition-[fill,opacity] hover:opacity-80" : "opacity-90"}
              onMouseEnter={(e) =>
                setHover({
                  x: e.nativeEvent.offsetX,
                  y: e.nativeEvent.offsetY,
                  label: `${featName}: ${t.map.countLabel(count, studentEstado ? obtenerDatosEstado(studentEstado).length : 0)}`,
                })
              }
              onMouseMove={(e) =>
                setHover((h) => (h ? { ...h, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY } : h))
              }
              onMouseLeave={() => setHover(null)}
              onClick={() => studentEstado && onSelect(studentEstado)}
            />
          );
        })}
      </svg>

      {hover && (
        <div
          className="pointer-events-none absolute z-20 whitespace-nowrap rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
          style={{ left: hover.x + 12, top: hover.y - 8 }}
        >
          {hover.label}
        </div>
      )}
    </div>
  );
}
