# Verano Internacional de la Ciencia (VIC)

Website for the **Verano Internacional de la Ciencia** — a program (REDNACECYT · EAAMO) that
connects Indigenous women researchers in Mexico with international mentors and interdisciplinary
research networks. It presents the program's story, its participants and mentors, and a set of
interactive data visualizations, in a **bilingual (Spanish / English)** interface.

The site content is based on the program's data and the original site at
[vic.tlacua.cloud](https://vic.tlacua.cloud/); the visual identity uses the EAAMO palette
(coral / navy / cream) plus warm accents (gold + a "greca" motif) drawn from the official VIC emblem.

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (theme tokens in `src/app/globals.css`)
- **[D3](https://d3js.org)** + **topojson-client** for the maps and the collaboration network
- **[Bootstrap Icons](https://icons.getbootstrap.com/)** for nav iconography
- shadcn / base-ui primitives, `clsx` + `tailwind-merge` for styling utilities

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Scripts:

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`   | Start the dev server (Turbopack)    |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build          |
| `npm run lint`  | Run ESLint                          |

## Pages & architecture

A **hybrid** structure: a story-driven landing page, plus two dedicated routes for the heaviest /
most link-worthy sections.

| Route              | Contents                                                                  |
| ------------------ | ------------------------------------------------------------------------- |
| `/`              | Hero → Stats → About → Temas →**Explora el Programa** → Prensa |
| `/posters`       | Full poster gallery (PDF previews, by year, click-to-download)            |
| `/convocatorias` | Open call / "Convocatoria abierta" (participation details + contact)      |

The shared shell — `Header`, the bottom `Greca` divider, and `SiteFooter` — lives in
`src/app/layout.tsx`, so it wraps every route. Navigation uses hash links (`/#about`, `/#temas`, …)
for landing sections and real route links for `/posters` and `/convocatorias`. A contact form opens
as a modal from anywhere (header + footer).

### Landing highlights

- **Explora el Programa** — one section, three tabs:
  1. **Estudiantes por Estado** — a real D3 `geoMercator` choropleth of Mexico shaded by student
     count; click a state for a sortable detail table (+ poster modal).
  2. **Conexiones Internacionales** — a `geoNaturalEarth1` world map with animated great-circle arcs
     from Mexico to each mentor's country, filterable by year.
  3. **Red de Colaboración** — a D3 force-directed graph of students ↔ mentors (drag, hover to
     highlight a cluster, filter by year, reset).
- **Stats** count-up, **Temas** animated bars (with a "Ver los pósters" link), scroll-reveal
  animations, and a decorative **greca** band echoing the VIC emblem.

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout: providers + Header/Greca/Footer + metadata + favicon
│   ├── page.tsx              # Landing page
│   ├── posters/page.tsx      # /posters route
│   ├── convocatorias/page.tsx# /convocatorias route
│   ├── globals.css           # Tailwind v4 theme tokens, palette, animations
│   └── icon.jpeg             # Favicon (VIC emblem)
├── components/
│   ├── Header, Hero, Stats, About, Temas, Prensa, Participa, SiteFooter, Greca, Logo, Reveal …
│   ├── LangProvider.tsx      # ES/EN context (persisted to localStorage)
│   ├── ContactProvider.tsx   # Contact modal + open() context
│   ├── map/                  # InteractiveMap, MexicoChoropleth, WorldConnections, DetailTable, geo
│   └── network/NetworkGraph.tsx
├── lib/
│   ├── data.ts               # Types + data imports + derivations (per-state rollups, network, …)
│   ├── i18n.ts               # Bilingual dictionary (ES primary, EN) + partners + contact email
│   ├── posters.ts            # Server-only: reads /public files (posters + partner logos)
│   └── utils.ts              # cn()
└── data/
    ├── mentores.json, estudiantes.json, investigaciones.json   # Program data
    └── geo/                  # Mexico states + world-atlas TopoJSON
public/
├── posters/<year>/*.pdf      # Research posters (matched to students by filename)
└── logos/                    # VIC emblem + partner logos (REDNACECYT, COPOCYT, EAAMO)
```

## Content & data

- **Program data** lives in `src/data/*.json` (mentors, students, research projects). Derivation
  helpers in `src/lib/data.ts` build the per-state rollups, world connections, and the network graph.
- **Copy** (both languages) lives in `src/lib/i18n.ts`. Spanish is the primary/source language.
- **Posters** are static PDFs under `public/posters/<year>/`. `src/lib/posters.ts` reads them at
  build time and matches each file to a student by name; drop new PDFs in the right year folder and
  they appear automatically.
- **Partner logos** go in `public/logos/` (`rednacecyt.png`, `copocyt.png`, `eaamo.png`); they render
  in the footer's "Aliados" section and fall back to a text label if a logo is missing.

## Notes

- The theme palette is defined once in `src/app/globals.css` under `@theme` (coral `#f0523d`,
  navy `#1f2a60`, cream `#fff8ee`, gold `#e0a92e`, plus a coral choropleth ramp).
- Animations respect `prefers-reduced-motion`.
- Poster "download" cards link to the local PDF.
