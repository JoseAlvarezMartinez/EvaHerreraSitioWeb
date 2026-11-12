/* ------------------------------------------------------------------
   EXPERIENCIA
   Cargos, períodos e instituciones son EJEMPLOS: reemplazar todos.
   Las áreas y los procedimientos son los habituales de la cirugía general;
   la doctora tiene que confirmar cuáles realiza.
------------------------------------------------------------------- */

export const experiencia = {
  intro:
    'Dónde trabajé, en qué me especialicé y qué cirugías hago hoy.',

  // Trayectoria, de lo más reciente a lo más antiguo.
  trayectoria: [
    {
      periodo: '2019 — Hoy',
      cargo: 'Cirujana general de planta',
      institucion: 'Sanatorio [COMPLETAR]',
      detalle: 'Cirugía programada y de urgencia. Consultorio externo. [COMPLETAR]',
    },
    {
      periodo: '2016 — Hoy',
      cargo: 'Consultorio particular',
      institucion: 'Consultorio [COMPLETAR]',
      detalle: 'Consulta, evaluación prequirúrgica y controles posoperatorios.',
    },
    {
      periodo: '2016 — 2019',
      cargo: 'Cirujana de guardia',
      institucion: 'Hospital [COMPLETAR]',
      detalle: 'Atención de urgencias quirúrgicas. [COMPLETAR]',
    },
    {
      periodo: '2011 — 2016',
      cargo: 'Residente y jefa de residentes',
      institucion: 'Hospital [COMPLETAR] · Servicio de Cirugía General',
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
      nombre: '[COMPLETAR]',
      descripcion: 'Otra área de práctica, si corresponde. [COMPLETAR]',
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
