// Data layer for Verano Internacional de la Ciencia (VIC).
// Raw data (mentors / students / research) is imported verbatim from the source
// site vic.tlacua.cloud. Derivation helpers are ported from its data.js.

import mentoresData from "@/data/mentores.json";
import estudiantesData from "@/data/estudiantes.json";
import investigacionesData from "@/data/investigaciones.json";

export interface Mentor {
  id: number;
  nombre: string;
  institucion?: string;
  pais: string;
  region?: string;
  disciplina: string;
}

export interface Estudiante {
  id: number;
  nombre: string;
  universidad: string;
  comunidad_indigena?: string;
  estado: string;
  interes: string;
  url_foto?: string;
}

export interface Investigacion {
  student_id: number;
  mentor_id: number;
  nombre: string;
  descripcion: string;
  ano: number;
  poster?: boolean;
  poster_url?: string;
}

export const MENTORES = mentoresData as Mentor[];
export const ESTUDIANTES = estudiantesData as Estudiante[];
export const INVESTIGACIONES = investigacionesData as Investigacion[];

export const YEARS = [2022, 2023, 2024, 2025] as const;
export type Year = (typeof YEARS)[number];

/** A single research row rolled up with its student + mentor, for the detail table. */
export interface ResearchRow {
  investigacion: string;
  descripcion: string;
  ano: number;
  poster: boolean;
  poster_url: string;
  estudiante: string;
  comunidad_indigena: string;
  universidad: string;
  interes: string;
  mentor: string;
  disciplina: string;
  mentor_pais: string;
  mentor_institucion: string;
  mentor_region: string;
}

/** NFD accent-strip + lowercase, so "Michoacán" === "michoacan". Ported from data.js. */
export function normalizarEstado(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** Rolls research up per Mexican state. Ported from generarMapaInteractivo(). */
export function generarMapaInteractivo(): { estados: { nombre: string; researches: ResearchRow[] }[] } {
  const porEstado: Record<string, ResearchRow[]> = {};

  INVESTIGACIONES.forEach((inv) => {
    const estudiante = ESTUDIANTES.find((e) => e.id === inv.student_id);
    if (!estudiante) return;

    const estado = estudiante.estado;
    if (!porEstado[estado]) porEstado[estado] = [];

    const mentor = MENTORES.find((m) => m.id === inv.mentor_id);

    porEstado[estado].push({
      investigacion: inv.nombre,
      descripcion: inv.descripcion,
      ano: inv.ano,
      poster: !!inv.poster,
      poster_url: inv.poster_url || "",
      estudiante: estudiante.nombre,
      comunidad_indigena: estudiante.comunidad_indigena || "",
      universidad: estudiante.universidad,
      interes: estudiante.interes,
      mentor: mentor ? mentor.nombre : "N/A",
      disciplina: mentor ? mentor.disciplina : "N/A",
      mentor_pais: mentor ? mentor.pais : "N/A",
      mentor_institucion: mentor ? mentor.institucion || "" : "",
      mentor_region: mentor ? mentor.region || "" : "",
    });
  });

  return {
    estados: Object.entries(porEstado).map(([nombre, researches]) => ({ nombre, researches })),
  };
}

export const MAPA_INTERACTIVO = generarMapaInteractivo();

/** Research rows for one state (accent-insensitive match). Ported from obtenerDatosEstado(). */
export function obtenerDatosEstado(nombreEstado: string): ResearchRow[] {
  const entry = MAPA_INTERACTIVO.estados.find(
    (e) => normalizarEstado(e.nombre) === normalizarEstado(nombreEstado)
  );
  return entry ? entry.researches : [];
}

/** Count of unique-ish student rows in a state. Ported from contarEstudiantes(). */
export function contarEstudiantes(nombreEstado: string): number {
  return ESTUDIANTES.filter(
    (e) => normalizarEstado(e.estado) === normalizarEstado(nombreEstado)
  ).length;
}

export interface Conexion {
  estudiante: string;
  estado: string;
  comunidad: string;
  mentor: string;
  pais: string;
  institucion: string;
  disciplina: string;
  region: string;
  investigacion: string;
  ano: number;
}

/** Every student↔mentor link, for the world map. Ported from obtenerConexionesMundiales(). */
export function obtenerConexionesMundiales(): Conexion[] {
  return INVESTIGACIONES.map((inv) => {
    const estudiante = ESTUDIANTES.find((e) => e.id === inv.student_id);
    const mentor = MENTORES.find((m) => m.id === inv.mentor_id);
    if (!estudiante || !mentor) return null;
    return {
      estudiante: estudiante.nombre,
      estado: estudiante.estado,
      comunidad: estudiante.comunidad_indigena || "",
      mentor: mentor.nombre,
      pais: mentor.pais || "",
      institucion: mentor.institucion || "",
      disciplina: mentor.disciplina,
      region: mentor.region || "",
      investigacion: inv.nombre,
      ano: inv.ano,
    };
  }).filter((c): c is Conexion => c !== null);
}

export const CONEXIONES = obtenerConexionesMundiales();

// ---- Map colour ramp (student count → coral shade). Ported from mapa.js. ----
export const RAMP = [
  "var(--color-ramp-0)",
  "var(--color-ramp-1)",
  "var(--color-ramp-2)",
  "var(--color-ramp-3)",
  "var(--color-ramp-4)",
  "var(--color-ramp-5)",
] as const;

export function colorPorCantidad(n: number): string {
  if (n === 0) return RAMP[0];
  if (n <= 2) return RAMP[1];
  if (n <= 5) return RAMP[2];
  if (n <= 9) return RAMP[3];
  if (n <= 19) return RAMP[4];
  return RAMP[5];
}

// ---- Collaboration network (students ↔ mentors) ----
export interface NetworkNode {
  id: string;
  kind: "student" | "mentor";
  name: string;
  degree: number;
  estado?: string;
  comunidad?: string;
  universidad?: string;
  pais?: string;
  institucion?: string;
  disciplina?: string;
}

export interface NetworkLink {
  source: string;
  target: string;
}

/** Build the student↔mentor graph for a given year (or all years when null). */
export function buildNetwork(year: number | null): { nodes: NetworkNode[]; links: NetworkLink[] } {
  const nodes = new Map<string, NetworkNode>();
  const linkSet = new Set<string>();
  const links: NetworkLink[] = [];

  INVESTIGACIONES.filter((inv) => (year ? inv.ano === year : true)).forEach((inv) => {
    const student = ESTUDIANTES.find((e) => e.id === inv.student_id);
    const mentor = MENTORES.find((m) => m.id === inv.mentor_id);
    if (!student || !mentor) return;

    const sId = `s${student.id}`;
    const mId = `m${mentor.id}`;

    if (!nodes.has(sId)) {
      nodes.set(sId, {
        id: sId,
        kind: "student",
        name: student.nombre,
        degree: 0,
        estado: student.estado,
        comunidad: student.comunidad_indigena || "",
        universidad: student.universidad,
      });
    }
    if (!nodes.has(mId)) {
      nodes.set(mId, {
        id: mId,
        kind: "mentor",
        name: mentor.nombre,
        degree: 0,
        pais: mentor.pais,
        institucion: mentor.institucion || "",
        disciplina: mentor.disciplina,
      });
    }

    const key = `${sId}|${mId}`;
    if (!linkSet.has(key)) {
      linkSet.add(key);
      links.push({ source: sId, target: mId });
      nodes.get(sId)!.degree += 1;
      nodes.get(mId)!.degree += 1;
    }
  });

  return { nodes: [...nodes.values()], links };
}

export const RAMP_LEGEND = [
  { label: "1–2", color: RAMP[1] },
  { label: "3–5", color: RAMP[2] },
  { label: "6–9", color: RAMP[3] },
  { label: "10–19", color: RAMP[4] },
  { label: "20+", color: RAMP[5] },
] as const;
