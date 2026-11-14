/* ------------------------------------------------------------------
   FORMACIÓN
   La línea de tiempo se muestra en el orden en que están escritos los ítems.
   Los datos de la línea de tiempo son los reales. Los cursos, certificaciones
   y sociedades de más abajo siguen siendo EJEMPLOS: reemplazarlos.

   Campos de cada ítem:
     anio         año que se ve en grande
     hasta        (opcional) año de finalización, para períodos ya cerrados
     enCurso      (opcional) true si se está cursando: muestra «Actualidad»
     tipo         Grado · Especialidad · Diplomatura · Máster · Formación
     titulo       nombre del título o programa
     institucion  dónde se cursó
     detalle      (opcional) una o dos frases
------------------------------------------------------------------- */

interface Hito {
  anio: string;
  hasta?: string;
  enCurso?: boolean;
  tipo: string;
  titulo: string;
  institucion: string;
  detalle?: string;
}

const lineaDeTiempo: Hito[] = [
  {
    anio: '2018',
    tipo: 'Grado',
    titulo: 'Médica',
    institucion: 'Universidad Central del Ecuador',
  },
  {
    anio: '2024',
    tipo: 'Especialidad',
    titulo: 'Cirujana General',
    institucion: 'Colegio de Médicos Distrito IV San Martín · Sede UBA',
  },
  {
    anio: '2025',
    tipo: 'Diplomatura',
    titulo: 'Diplomatura en Coloproctología',
    institucion: 'Sociedad Argentina de Coloproctología y Universidad Abierta Interamericana',
  },
  {
    anio: '2026',
    tipo: 'Máster',
    titulo: 'Máster en Proctología',
    institucion: 'TECH Global University · Andorra',
  },
  {
    anio: '2026',
    enCurso: true,
    tipo: 'Formación',
    titulo: 'Endoscopia diagnóstica y terapéutica',
    institucion: 'Universidad de Buenos Aires (UBA)',
  },
  {
    anio: '2026',
    enCurso: true,
    tipo: 'Especialidad',
    titulo: 'Gastroenterología',
    institucion: 'Colegio de Médicos Distrito II',
  },
  {
    anio: '2026',
    enCurso: true,
    tipo: 'Máster',
    titulo: 'Máster en Endoscopia Oncológica',
    institucion: 'TECH Global University · Andorra',
  },
];

export const formacion = {
  intro:
    'La formación de una cirujana no termina con la residencia. Este es el recorrido hasta hoy.',

  lineaDeTiempo,

  // Cursos y actualizaciones. Lista compacta debajo de la línea de tiempo.
  cursos: [
    { anio: '2024', nombre: 'Curso de [COMPLETAR]', institucion: '[COMPLETAR]' },
    { anio: '2023', nombre: 'Curso de [COMPLETAR]', institucion: '[COMPLETAR]' },
    { anio: '2021', nombre: 'Jornadas de [COMPLETAR]', institucion: '[COMPLETAR]' },
    { anio: '2019', nombre: 'Curso de [COMPLETAR]', institucion: '[COMPLETAR]' },
    { anio: '2017', nombre: 'Curso de [COMPLETAR]', institucion: '[COMPLETAR]' },
  ],

  // Certificaciones vigentes y sociedades científicas.
  certificaciones: [
    { nombre: 'Certificación en [COMPLETAR]', entidad: '[COMPLETAR]', vigencia: '[COMPLETAR]' },
    { nombre: 'Recertificación de la especialidad', entidad: '[COMPLETAR]', vigencia: '[COMPLETAR]' },
  ],

  sociedades: [
    'Miembro de [COMPLETAR: sociedad científica]',
    'Miembro de [COMPLETAR: sociedad científica]',
  ],
};
