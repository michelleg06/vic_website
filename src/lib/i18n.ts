// Bilingual content (ES primary, EN secondary) for VIC.
// Spanish strings are verbatim from vic.tlacua.cloud; English is a faithful translation.

export type Lang = "es" | "en";

export interface PressItem {
  source: string;
  title: string;
  summary: string;
  url: string;
  kind: "article" | "video";
}

export interface TemaItem {
  count: number;
  label: string;
}

export interface AboutCard {
  title: string;
  text: string;
}

export interface Content {
  langName: string;
  nav: { about: string; temas: string; mapa: string; red: string; posters: string; prensa: string; participa: string; contacto: string };
  contact: {
    title: string;
    lead: string;
    name: string;
    email: string;
    message: string;
    send: string;
    close: string;
  };
  hero: {
    kicker: string;
    title: string;
    tagline: string;
    lead: string;
    cta: string;
  };
  stats: { students: string; posters: string; states: string; communities: string };
  about: { title: string; intro: string; cards: AboutCard[] };
  temas: { title: string; intro: string; items: TemaItem[]; viewPosters: string };
  map: {
    title: string;
    intro: string;
    hint: string;
    tabMexico: string;
    tabMundo: string;
    legendStudents: string;
    legendYear: string;
    yearAll: string;
    legendMentorCountry: string;
    legendMexico: string;
    legendConnection: string;
    detailPlaceholder: string;
    detailTitle: (estado: string) => string;
    countLabel: (students: number, research: number) => string;
    columns: { investigacion: string; estudiante: string; comunidad: string; mentor: string; ano: string; tipo: string };
    poster: string;
    project: string;
    viewPoster: string;
  };
  red: {
    title: string;
    intro: string;
    legendStudent: string;
    legendMentor: string;
    year: string;
    yearAll: string;
    students: string;
    mentors: string;
    reset: string;
    tipStudent: (state: string) => string;
    tipMentor: (country: string, count: number) => string;
  };
  posters: { title: string; intro: string; download: string };
  participa: {
    kicker: string;
    title: string;
    lead: string;
    whoTitle: string;
    whoLead: string;
    who: string[];
    activitiesTitle: string;
    activities: string[];
    contactLabel: string;
    cta: string;
  };
  prensa: { title: string; intro: string; items: PressItem[] };
  footer: { tagline: string; partners: string; copyright: string };
}

const PRESS_URLS = {
  seas: "https://seas.harvard.edu/news/2023/10/innovating-indigenous-mexican-communities",
  revista: "https://revista.drclas.harvard.edu/summer-of-science-stem-for-mexican-indigenous-women/",
  eaamo: "https://conference2022.eaamo.org/copocyt/",
  unu: "https://www.merit.unu.edu/summer-of-science-program/",
  jornada: "https://lajornadasanluis.com.mx/politica-y-sociedad/potosinas-destacan-con-proyectos-sociales-en-evento-internacional/",
  seasVideo: "https://www.youtube.com/watch?v=Dr6EM5WvVhg",
  copocytVideo: "https://www.youtube.com/watch?v=WL8dKOO462M",
} as const;

const es: Content = {
  langName: "Español",
  nav: { about: "Acerca de", temas: "Temas", mapa: "Explora", red: "Red", posters: "Pósters", prensa: "Prensa", participa: "Convocatorias", contacto: "Contacto" },
  contact: {
    title: "Contáctanos",
    lead: "¿Tienes preguntas sobre el programa? Escríbenos y te responderemos.",
    name: "Nombre",
    email: "Correo electrónico",
    message: "Mensaje",
    send: "Enviar mensaje",
    close: "Cerrar",
  },
  hero: {
    kicker: "REDNACECYT · EAAMO",
    title: "Verano Internacional de la Ciencia",
    tagline: "Construyendo ecosistemas de investigación equitativos con comunidades indígenas.",
    lead: "Un programa que conecta mujeres indígenas investigadoras en México con mentores internacionales y redes de investigación interdisciplinaria.",
    cta: "Explora el mapa",
  },
  stats: { students: "Estudiantes", posters: "Pósters y proyectos", states: "Estados", communities: "Comunidades indígenas" },
  about: {
    title: "Acerca del Programa",
    intro:
      "El Verano Internacional de la Ciencia surgió en 2022 a través de colaboraciones entre REDNACECYT, la iniciativa EAAMO e instituciones educativas de México, para apoyar la participación equitativa en investigación de mujeres indígenas.",
    cards: [
      {
        title: "Coordinación de Ecosistemas",
        text: "El programa no opera como una simple iniciativa de mentoría, sino como un ecosistema que coordina infraestructuras institucionales existentes: COECyT, universidades interculturales, comunidades indígenas y redes de investigación internacionales.",
      },
      {
        title: "Investigación Enraizada",
        text: "Las participantes desarrollan proyectos que emergen de las prioridades de sus comunidades: salud pública, preservación lingüística, migración, sustentabilidad ambiental, gobernanza indígena y tecnologías digitales.",
      },
      {
        title: "Mentoría Recíproca",
        text: "La mentoría va más allá de la supervisión técnica. Los mentores aprenden del conocimiento situado de las estudiantes, creando una relación de colaboración interdisciplinaria que se sostiene a lo largo del tiempo.",
      },
      {
        title: "Redes Participantes",
        text: "REDNACECYT proporciona legitimidad regional e infraestructura institucional. EAAMO conecta a las participantes con comunidades de investigación internacionales y oportunidades de difusión en conferencias.",
      },
    ],
  },
  temas: {
    title: "Temas de Investigación",
    intro:
      "Los proyectos abarcan una amplia gama de temas interdisciplinarios, todos enraizados en prioridades comunitarias y sistemas de conocimiento indígena.",
    items: [
      { count: 35, label: "Cultura y Lengua Indígena" },
      { count: 20, label: "IA, Datos y Tecnología" },
      { count: 15, label: "Salud Pública" },
      { count: 15, label: "Gobernanza y Derechos" },
      { count: 13, label: "Educación e Inclusión" },
      { count: 4, label: "Medio Ambiente y Sustentabilidad" },
      { count: 4, label: "Economías Locales y Emprendimiento" },
    ],
    viewPosters: "Ver los pósters",
  },
  map: {
    title: "Explora el Programa",
    intro: "Tres formas de explorar el programa: por estado en México, por conexiones internacionales y como una red de colaboración.",
    hint: "Haz clic en un estado para ver las investigaciones, estudiantes y mentores asociados.",
    tabMexico: "Estudiantes por Estado",
    tabMundo: "Conexiones Internacionales",
    legendStudents: "Estudiantes:",
    legendYear: "Año:",
    yearAll: "Todos",
    legendMentorCountry: "País del mentor",
    legendMexico: "México (estudiantes)",
    legendConnection: "Conexión mentor–estudiante",
    detailPlaceholder: "Selecciona un estado en el mapa para ver sus investigaciones.",
    detailTitle: (estado) => `Investigaciones en ${estado}`,
    countLabel: (s, r) =>
      `${s} estudiante${s !== 1 ? "s" : ""}, ${r} investigación${r !== 1 ? "es" : ""}`,
    columns: {
      investigacion: "Investigación",
      estudiante: "Estudiante",
      comunidad: "Comunidad",
      mentor: "Mentor",
      ano: "Año",
      tipo: "Tipo",
    },
    poster: "Póster",
    project: "Proyecto",
    viewPoster: "Ver póster",
  },
  red: {
    title: "Red de Colaboración",
    intro: "Cada línea conecta a una estudiante con su mentor o mentora. Explora la red interdisciplinaria del programa: arrastra los nodos, pasa el cursor para resaltar conexiones y filtra por año.",
    legendStudent: "Estudiante",
    legendMentor: "Mentor/a",
    year: "Año:",
    yearAll: "Todos",
    students: "estudiantes",
    mentors: "mentores",
    reset: "Reiniciar",
    tipStudent: (state) => `Estudiante · ${state}`,
    tipMentor: (country, count) => `Mentor/a · ${country} · ${count} estudiante${count !== 1 ? "s" : ""}`,
  },
  posters: {
    title: "Galería de Pósters",
    intro: "Los pósters de investigación elaborados por las participantes, año con año. Haz clic en cualquier tarjeta para descargar el PDF.",
    download: "Descargar PDF",
  },
  participa: {
    kicker: "Convocatoria abierta",
    title: "Construyendo tecnologías más inclusivas desde una perspectiva intercultural y de derechos",
    lead: "Te invitamos a formar parte de un proyecto de investigación para la construcción participativa de un benchmark sobre modelos de lenguaje (LLMs) y pueblos indígenas.",
    whoTitle: "¿Quiénes pueden participar?",
    whoLead: "Mujeres indígenas interesadas en:",
    who: [
      "Inteligencia Artificial y tecnologías digitales",
      "Derechos de los pueblos indígenas",
      "Investigación y producción de conocimiento",
      "Participación comunitaria y análisis crítico",
      "Diversidad cultural y lingüística",
    ],
    activitiesTitle: "Actividades",
    activities: [
      "Talleres de formación sobre Inteligencia Artificial",
      "Derechos indígenas y tecnologías emergentes",
      "Construcción colectiva de preguntas para evaluar sistemas de IA",
      "Análisis crítico de respuestas generadas por distintas plataformas",
      "Reflexión sobre representación, lenguaje, diversidad cultural y producción de conocimiento",
      "Contribución a una investigación académica",
    ],
    contactLabel: "Para mayor información contáctanos:",
    cta: "Regístrate",
  },
  prensa: {
    title: "Prensa y Publicaciones",
    intro: "Cobertura del programa en medios académicos e internacionales.",
    items: [
      { source: "Harvard SEAS", title: "Innovating with Indigenous Mexican Communities", summary: "Programa colaborativo entre académicos y estudiantes indígenas mexicanos en investigación.", url: PRESS_URLS.seas, kind: "article" },
      { source: "Harvard ReVista", title: "Summer of Science: STEM for Mexican Indigenous Women", summary: "Programa que aumenta la representación de mujeres indígenas mexicanas en investigación STEM.", url: PRESS_URLS.revista, kind: "article" },
      { source: "EAAMO 2022", title: "COPOCYT en EAAMO '22", summary: "Participación de estudiantes indígenas potosinas en la conferencia EAAMO 2022.", url: PRESS_URLS.eaamo, kind: "article" },
      { source: "UNU-MERIT", title: "Summer of Science Program", summary: "Programa de verano científico en colaboración con UNU-MERIT y universidades internacionales.", url: PRESS_URLS.unu, kind: "article" },
      { source: "La Jornada San Luis", title: "Potosinas destacan con proyectos sociales en evento internacional", summary: "Mujeres indígenas potosinas presentaron proyectos sobre derechos lingüísticos y vivienda.", url: PRESS_URLS.jornada, kind: "article" },
      { source: "Harvard SEAS", title: "Francisco Marmolejo-Cossío: Innovating with Indigenous Mexican communities", summary: "Mechanism Design for Social Good reúne a investigadores de todo el mundo para atender las necesidades de comunidades subrepresentadas.", url: PRESS_URLS.seasVideo, kind: "video" },
      { source: "COPOCYT", title: "Potosina Indígena visita Harvard", summary: "Entrevista con la participante María Guadalupe Márquez y su experiencia en el Verano Internacional de la Ciencia.", url: PRESS_URLS.copocytVideo, kind: "video" },
    ],
  },
  footer: {
    tagline: "Construyendo ecosistemas de investigación equitativos con comunidades indígenas.",
    partners: "Aliados",
    copyright: "Verano Internacional de la Ciencia © 2022–2025",
  },
};

const en: Content = {
  langName: "English",
  nav: { about: "About", temas: "Topics", mapa: "Explore", red: "Network", posters: "Posters", prensa: "Press", participa: "Open Calls", contacto: "Contact" },
  contact: {
    title: "Contact us",
    lead: "Questions about the program? Send us a message and we'll get back to you.",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send message",
    close: "Close",
  },
  hero: {
    kicker: "REDNACECYT · EAAMO",
    title: "International Summer of Science",
    tagline: "Building equitable research ecosystems with Indigenous communities.",
    lead: "A program connecting Indigenous women researchers in Mexico with international mentors and interdisciplinary research networks.",
    cta: "Explore the map",
  },
  stats: { students: "Students", posters: "Posters & projects", states: "States", communities: "Indigenous communities" },
  about: {
    title: "About the Program",
    intro:
      "The International Summer of Science emerged in 2022 through collaborations between REDNACECYT, the EAAMO initiative, and Mexican educational institutions, to support the equitable participation of Indigenous women in research.",
    cards: [
      {
        title: "Ecosystem Coordination",
        text: "The program does not operate as a simple mentorship initiative, but as an ecosystem that coordinates existing institutional infrastructures: COECyT, intercultural universities, Indigenous communities, and international research networks.",
      },
      {
        title: "Community-Rooted Research",
        text: "Participants develop projects that emerge from their communities' priorities: public health, linguistic preservation, migration, environmental sustainability, Indigenous governance, and digital technologies.",
      },
      {
        title: "Reciprocal Mentorship",
        text: "Mentorship goes beyond technical supervision. Mentors learn from the situated knowledge of the students, creating an interdisciplinary, collaborative relationship that is sustained over time.",
      },
      {
        title: "Participating Networks",
        text: "REDNACECYT provides regional legitimacy and institutional infrastructure. EAAMO connects participants with international research communities and opportunities to present at conferences.",
      },
    ],
  },
  temas: {
    title: "Research Topics",
    intro:
      "Projects span a broad range of interdisciplinary topics, all rooted in community priorities and Indigenous knowledge systems.",
    items: [
      { count: 35, label: "Indigenous Culture & Language" },
      { count: 20, label: "AI, Data & Technology" },
      { count: 15, label: "Public Health" },
      { count: 15, label: "Governance & Rights" },
      { count: 13, label: "Education & Inclusion" },
      { count: 4, label: "Environment & Sustainability" },
      { count: 4, label: "Local Economies & Entrepreneurship" },
    ],
    viewPosters: "View the posters",
  },
  map: {
    title: "Explore the Program",
    intro: "Three ways to explore the program: by state in Mexico, by international connections, and as a collaboration network.",
    hint: "Click a state to see its associated research, students, and mentors.",
    tabMexico: "Students by State",
    tabMundo: "International Connections",
    legendStudents: "Students:",
    legendYear: "Year:",
    yearAll: "All",
    legendMentorCountry: "Mentor country",
    legendMexico: "Mexico (students)",
    legendConnection: "Mentor–student connection",
    detailPlaceholder: "Select a state on the map to see its research.",
    detailTitle: (estado) => `Research in ${estado}`,
    countLabel: (s, r) =>
      `${s} student${s !== 1 ? "s" : ""}, ${r} research project${r !== 1 ? "s" : ""}`,
    columns: {
      investigacion: "Research",
      estudiante: "Student",
      comunidad: "Community",
      mentor: "Mentor",
      ano: "Year",
      tipo: "Type",
    },
    poster: "Poster",
    project: "Project",
    viewPoster: "View poster",
  },
  red: {
    title: "Collaboration Network",
    intro: "Each line connects a student to her mentor. Explore the program's interdisciplinary network: drag the nodes, hover to highlight connections, and filter by year.",
    legendStudent: "Student",
    legendMentor: "Mentor",
    year: "Year:",
    yearAll: "All",
    students: "students",
    mentors: "mentors",
    reset: "Reset",
    tipStudent: (state) => `Student · ${state}`,
    tipMentor: (country, count) => `Mentor · ${country} · ${count} student${count !== 1 ? "s" : ""}`,
  },
  posters: {
    title: "Poster Gallery",
    intro: "The research posters created by participants, year after year. Click any card to download the PDF.",
    download: "Download PDF",
  },
  participa: {
    kicker: "Open call",
    title: "Building more inclusive technologies from an intercultural and rights-based perspective",
    lead: "We invite you to join a research project for the participatory construction of a benchmark on language models (LLMs) and Indigenous peoples.",
    whoTitle: "Who can participate?",
    whoLead: "Indigenous women interested in:",
    who: [
      "Artificial Intelligence and digital technologies",
      "The rights of Indigenous peoples",
      "Research and knowledge production",
      "Community participation and critical analysis",
      "Cultural and linguistic diversity",
    ],
    activitiesTitle: "Activities",
    activities: [
      "Training workshops on Artificial Intelligence",
      "Indigenous rights and emerging technologies",
      "Collective construction of questions to evaluate AI systems",
      "Critical analysis of responses generated by different platforms",
      "Reflection on representation, language, cultural diversity and knowledge production",
      "Contribution to academic research",
    ],
    contactLabel: "For more information, contact us:",
    cta: "Register",
  },
  prensa: {
    title: "Press & Publications",
    intro: "Coverage of the program in academic and international media.",
    items: [
      { source: "Harvard SEAS", title: "Innovating with Indigenous Mexican Communities", summary: "A collaborative program between academics and Indigenous Mexican students in research.", url: PRESS_URLS.seas, kind: "article" },
      { source: "Harvard ReVista", title: "Summer of Science: STEM for Mexican Indigenous Women", summary: "A program increasing the representation of Indigenous Mexican women in STEM research.", url: PRESS_URLS.revista, kind: "article" },
      { source: "EAAMO 2022", title: "COPOCYT at EAAMO '22", summary: "Participation of Indigenous students from San Luis Potosí at the EAAMO 2022 conference.", url: PRESS_URLS.eaamo, kind: "article" },
      { source: "UNU-MERIT", title: "Summer of Science Program", summary: "A scientific summer program in collaboration with UNU-MERIT and international universities.", url: PRESS_URLS.unu, kind: "article" },
      { source: "La Jornada San Luis", title: "Potosinas stand out with social projects at an international event", summary: "Indigenous women from San Luis Potosí presented projects on linguistic rights and housing.", url: PRESS_URLS.jornada, kind: "article" },
      { source: "Harvard SEAS", title: "Francisco Marmolejo-Cossío: Innovating with Indigenous Mexican communities", summary: "Mechanism Design for Social Good draws researchers from all over the world to assess the needs of underserved communities.", url: PRESS_URLS.seasVideo, kind: "video" },
      { source: "COPOCYT", title: "Indigenous Potosina visits Harvard", summary: "Interview with participant María Guadalupe Márquez and her experience in the International Summer of Science.", url: PRESS_URLS.copocytVideo, kind: "video" },
    ],
  },
  footer: {
    tagline: "Building equitable research ecosystems with Indigenous communities.",
    partners: "Partners",
    copyright: "International Summer of Science © 2022–2025",
  },
};

export const DICT: Record<Lang, Content> = { es, en };

export const PARTICIPA_EMAIL = "francisco.marmolejocossio@bc.edu";

export interface Partner {
  label: string;
  url: string;
  logo: string; // filename expected in public/logos/
}

export const PARTNERS: Partner[] = [
  { label: "REDNACECYT", url: "https://www.rednacecyt.org/", logo: "rednacecyt.png" },
  { label: "COPOCYT", url: "https://sedeco.slp.gob.mx/copocyt/", logo: "copocyt.png" },
  { label: "EAAMO", url: "https://www.eaamo.org/", logo: "eaamo.png" },
];
