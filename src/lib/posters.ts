// Server-only helpers that read the static files in `public/` at build time.
// Do NOT import this from a Client Component — it uses Node `fs`.

import fs from "fs";
import path from "path";
import { ESTUDIANTES } from "./data";
import { PARTNERS, type Partner } from "./i18n";

const STOP = new Set([
  "poster", "posters", "cartel", "vic", "eaamo", "template", "final", "ingles",
  "contigo", "pc", "cp", "dai", "dsoh", "peru", "registro", "de", "la", "el",
  "los", "las", "y", "v", "fv", "vf", "con", "para", "su",
]);

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function tokens(s: string): string[] {
  s = s.replace(/([a-z])([A-Z])/g, "$1 $2"); // split camelCase
  s = norm(s).replace(/\.[a-z0-9]+$/, ""); // drop extension
  s = s.replace(/[^a-z\s]/g, " "); // non-letters (incl. digits) → space
  return s.split(/\s+/).filter((t) => t.length >= 2 && !STOP.has(t));
}

const STUDENTS = ESTUDIANTES.map((e) => ({ nombre: e.nombre, toks: tokens(e.nombre) }));

/** Prettify leftover filename tokens as a Title-Cased name (fallback when no student matches). */
function prettify(file: string): string {
  return tokens(file)
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
    .join(" ");
}

/** Best-matching student name for a poster filename, else a cleaned-up name. */
function studentForFile(file: string): string {
  const ft = new Set(tokens(file));
  let best: string | null = null;
  let score = 0;
  for (const s of STUDENTS) {
    const sc = s.toks.filter((t) => ft.has(t)).length;
    if (sc > score) {
      score = sc;
      best = s.nombre;
    }
  }
  return score >= 2 && best ? best : prettify(file);
}

export interface PosterItem {
  file: string;
  url: string;
  student: string;
}

export interface PosterYear {
  year: number;
  items: PosterItem[];
}

/** All posters under public/posters/<year>/*.pdf, grouped by year (newest first). */
export function getPosters(): PosterYear[] {
  const root = path.join(process.cwd(), "public", "posters");
  if (!fs.existsSync(root)) return [];

  const years = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^\d{4}$/.test(d.name))
    .map((d) => d.name)
    .sort((a, b) => Number(b) - Number(a));

  return years
    .map((year) => {
      const dir = path.join(root, year);
      const items = fs
        .readdirSync(dir)
        .filter((f) => f.toLowerCase().endsWith(".pdf"))
        .map((file) => ({
          file,
          url: `/posters/${year}/${encodeURIComponent(file)}`,
          student: studentForFile(file),
        }))
        .filter((it) => it.student.trim().length > 0)
        .sort((a, b) => a.student.localeCompare(b.student, "es"));
      return { year: Number(year), items };
    })
    .filter((y) => y.items.length > 0);
}

export interface ResolvedPartner extends Omit<Partner, "logo"> {
  logo: string | null;
}

/** Partners with their logo path resolved (null when the file isn't in public/logos). */
export function getPartners(): ResolvedPartner[] {
  const logosDir = path.join(process.cwd(), "public", "logos");
  return PARTNERS.map((p) => {
    const logoPath = path.join(logosDir, p.logo);
    return { ...p, logo: fs.existsSync(logoPath) ? `/logos/${p.logo}` : null };
  });
}
