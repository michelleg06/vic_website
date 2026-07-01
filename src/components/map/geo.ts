import { normalizarEstado } from "@/lib/data";

// Base URL of the source site, used to link out to the original poster PDFs
// (the PDFs themselves are not bundled in this repo).
export const POSTER_BASE = "https://vic.tlacua.cloud/";

// Spanish mentor country → world-atlas (countries-110m) `properties.name`.
export const PAIS_ALIAS: Record<string, string> = {
  EEUU: "United States of America",
  UK: "United Kingdom",
  Perú: "Peru",
  Brasil: "Brazil",
  España: "Spain",
  Francia: "France",
  Alemania: "Germany",
  Canadá: "Canada",
  Holanda: "Netherlands",
  Japón: "Japan",
  Italia: "Italy",
  México: "Mexico",
  Colombia: "Colombia",
  Ecuador: "Ecuador",
  Argentina: "Argentina",
  Chile: "Chile",
  Australia: "Australia",
  India: "India",
  Serbia: "Serbia",
};

// Approximate [lng, lat] for US mentor regions, so US mentors spread out
// instead of collapsing onto a single national centroid.
export const US_REGION_LATLNG: Record<string, [number, number]> = {
  northeast: [-74, 42],
  southeast: [-82, 33],
  midwest: [-90, 42],
  northwest: [-120, 46],
  southwest: [-112, 34],
};

// Student state (data value) → geojson `properties.name`, normalized.
// Only "Estado de México" differs from the Mexico geojson label "México".
const STATE_ALIAS: Record<string, string> = {
  "estado de mexico": "mexico",
};

/** Normalized key that a student `estado` maps to in the Mexico geojson. */
export function geoKey(estado: string): string {
  const n = normalizarEstado(estado);
  return STATE_ALIAS[n] || n;
}
