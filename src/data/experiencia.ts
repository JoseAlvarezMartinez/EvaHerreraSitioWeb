/* ------------------------------------------------------------------
   EXPERIENCIA
   La trayectoria es la real. La lista de instituciones y la docencia siguen
   siendo EJEMPLOS: reemplazarlas.
   Las áreas y los procedimientos son los habituales de la cirugía general;
   la doctora tiene que confirmar cuáles realiza.
------------------------------------------------------------------- */

export const experiencia = {
  intro:
    'Dónde trabajé, en qué me especialicé y qué cirugías hago hoy.',

  // Trayectoria. Se muestra en este orden; los cuatro primeros van también en la portada.
  trayectoria: [
    {
      periodo: '2024 — Hoy',
      cargo: 'Cirujana de guardia y planta',
      institucion: 'Hospital Zonal de Agudos Magdalena V. de Martínez',
      detalle: '',
    },
    {
      periodo: '2024 — 2026',
      cargo: 'Jefa de residentes de Cirugía General',
      institucion: 'Hospital Zonal de Agudos Magdalena V. de Martínez',
      detalle: '',
    },
    {
      periodo: '2025 — Hoy',
      cargo: 'Cirujana de planta',
      institucion: 'Hospital Sanguinetti',
      detalle: '',
    },
    {
      periodo: '2022 — Hoy',
      cargo: 'Médica',
      institucion: 'Sistema de Emergencias de Tigre (SET)',
      detalle: '',
    },
    {
      periodo: '2020 — 2021',
      cargo: 'Médica',
      institucion: 'Gobierno de la Ciudad Autónoma de Buenos Aires',
      detalle: '',
    },
    {
      periodo: '2020 — 2025',
      cargo: 'Tutora de cátedras de cirugía',
      institucion: 'UDH Tigre',
      detalle: '',
    },
    {
      periodo: '2022 — 2023',
      cargo: 'Médica',
      institucion: 'Clínica San Fernando',
      detalle: '',
    },
    {
      periodo: '2019 — 2020',
      cargo: 'Directora del Centro de Salud Isinliví',
      institucion: 'Sigchos, Ecuador',
      detalle: '',
    },
  ],

  // Instituciones donde opera o operó.
  instituciones: [
    'Sanatorio [COMPLETAR]',
    'Hospital [COMPLETAR]',
    'Clínica [COMPLETAR]',
  ],

  // Áreas de práctica.
  areas: [
    {
      nombre: 'Pared abdominal',
      descripcion: 'Hernias inguinales, umbilicales y eventraciones.',
    },
    {
      nombre: 'Vesícula y vía biliar',
      descripcion: 'Cálculos en la vesícula y sus complicaciones.',
    },
    {
      nombre: 'Cirugía laparoscópica',
      descripcion: 'Abordajes mínimamente invasivos cuando el caso lo permite.',
    },
    {
      nombre: 'Cirugía ambulatoria',
      descripcion: 'Procedimientos de baja complejidad, con alta en el día.',
    },
    {
      nombre: 'Urgencias quirúrgicas',
      descripcion: 'Apendicitis y otros cuadros abdominales agudos.',
    },
    {
      nombre: 'Problemas digestivos',
      descripcion: 'Gastritis, reflujo, distensión abdominal y dolor abdominal.',
    },
    {
      nombre: 'Alteración del tránsito intestinal',
      descripcion: 'Diarreas, constipación, sangrados digestivos y hemorroides.',
    },
    {
      nombre: 'Lectura e interpretación de estudios',
      descripcion: 'Endoscopias, tomografías y laboratorios.',
    },
  ],

  // Procedimientos, agrupados.
  procedimientos: [
    {
      grupo: 'Pared abdominal',
      items: [
        'Hernioplastia inguinal',
        'Hernioplastia umbilical',
        'Reparación de eventraciones',
        'Hernia epigástrica',
      ],
    },
    {
      grupo: 'Abdomen',
      items: [
        'Colecistectomía laparoscópica',
        'Apendicectomía laparoscópica',
        'Laparoscopía diagnóstica',
      ],
    },
    {
      grupo: 'Ambulatoria',
      items: [
        'Resección de lipomas y quistes',
        'Quiste pilonidal',
        'Biopsias de piel y partes blandas',
        'Uña encarnada',
      ],
    },
  ],

  notaProcedimientos:
    'Listado orientativo. [COMPLETAR: confirmar con la doctora qué procedimientos realiza.] La indicación de una cirugía se define siempre en la consulta.',

  // Docencia y actividad académica (opcional: dejar la lista vacía [] para ocultar la sección).
  docencia: [
    {
      periodo: '[COMPLETAR]',
      actividad: 'Docente de [COMPLETAR]',
      institucion: 'Universidad [COMPLETAR]',
    },
    {
      periodo: '[COMPLETAR]',
      actividad: 'Instructora de residentes',
      institucion: 'Hospital [COMPLETAR]',
    },
  ],
};
