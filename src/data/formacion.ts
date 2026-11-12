/* ------------------------------------------------------------------
   FORMACIÓN
   La línea de tiempo se muestra en el orden en que están escritos los ítems.
   Los años, títulos e instituciones son EJEMPLOS: reemplazar todos.

   Campos de cada ítem:
     anio         año que se ve en grande
     hasta        (opcional) año de finalización, para períodos
     tipo         Grado · Residencia · Máster · Posgrado · Certificación
     titulo       nombre del título o programa
     institucion  dónde se cursó
     detalle      (opcional) una o dos frases
------------------------------------------------------------------- */

export const formacion = {
  intro:
    'La formación de una cirujana no termina con la residencia. Este es el recorrido hasta hoy.',

  lineaDeTiempo: [
    {
      anio: '2010',
      tipo: 'Grado',
      titulo: 'Médica',
      institucion: 'Universidad [COMPLETAR] · Facultad de Medicina',
      detalle: 'Carrera de grado. [COMPLETAR: año real de egreso y distinciones, si las hay.]',
    },
    {
      anio: '2011',
      hasta: '2015',
      tipo: 'Residencia',
      titulo: 'Residencia en Cirugía General',
      institucion: 'Hospital [COMPLETAR]',
      detalle:
        'Formación quirúrgica completa, con rotaciones por [COMPLETAR].',
    },
    {
      anio: '2015',
      hasta: '2016',
      tipo: 'Residencia',
      titulo: 'Jefatura de residentes',
      institucion: 'Hospital [COMPLETAR] · Servicio de Cirugía General',
      detalle: 'Coordinación docente y asistencial de la residencia. [COMPLETAR]',
    },
    {
      anio: '2016',
      tipo: 'Certificación',
      titulo: 'Especialista en Cirugía General',
      institucion: '[COMPLETAR: entidad que otorga el título de especialista]',
      detalle: '',
    },
    {
      anio: '2018',
      tipo: 'Máster',
      titulo: 'Máster en [COMPLETAR]',
      institucion: 'Universidad [COMPLETAR]',
      detalle: 'Tesis o trabajo final: [COMPLETAR].',
    },
    {
      anio: '2020',
      tipo: 'Posgrado',
      titulo: 'Posgrado en Cirugía Laparoscópica [COMPLETAR]',
      institucion: '[COMPLETAR: institución]',
      detalle: '',
    },
    {
      anio: '2022',
      tipo: 'Posgrado',
      titulo: 'Posgrado en Cirugía de Pared Abdominal [COMPLETAR]',
      institucion: '[COMPLETAR: institución]',
      detalle: '',
    },
  ],

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
