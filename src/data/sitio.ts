/* ------------------------------------------------------------------
   DATOS GENERALES DEL SITIO
   Todo lo que diga [COMPLETAR] es un dato de ejemplo que hay que reemplazar.
   Para ver la lista completa de pendientes:  npm run pendientes
------------------------------------------------------------------- */

export const sitio = {
  tratamiento: 'Dra.',
  nombreCompleto: 'Eva Herrera Bravo',

  // El nombre en el hero de la portada: la primera palabra va sola en el primer
  // renglón y las demás ocupan el segundo, de lado a lado.
  nombreEnLineas: ['Eva', 'Herrera', 'Bravo'],

  // Franja de datos al pie del hero de la portada.
  fichaPortada: [
    { etiqueta: 'Especialidad', valor: 'Cirugía general' },
    { etiqueta: 'Matrícula', valor: 'M.N. [COMPLETAR]' },
    { etiqueta: 'Atención', valor: 'Consultorio y teleconsulta' },
  ],

  especialidad: 'Cirujana general',

  // Rótulos que siguen a la especialidad encima del nombre, en la portada.
  // Cada uno va separado por una rayita de acento.
  rotulosPortada: ['F1 Endoscopia', 'Gastroenterología'],
  modalidades: 'Consultorio y teleconsulta',

  // Matrículas. Se muestran en el pie y en "Sobre mí".
  matriculas: ['M.N. 174677', 'M.P. [COMPLETAR]'],

  // Descripción corta para buscadores y para compartir en redes.
  descripcion:
    'Dra. Eva Herrera Bravo, cirujana general. Atención en consultorio y por teleconsulta en Argentina.',

  // Frase de presentación del hero de la portada.
  bajada:
    'Cirugía general con tiempo para escuchar y palabras claras. Atiendo en consultorio y por teleconsulta.',

  // Texto y destino del botón principal del sitio.
  cta: {
    texto: 'Pedir turno',
    destino: '/contacto/',
  },

  // Aviso legal breve del pie.
  avisoLegal:
    'La información de este sitio es orientativa y no reemplaza una consulta médica.',
};

/* ------------------------------------------------------------------
   PÁGINAS Y NAVEGACIÓN
   "numero" es la numeración editorial que se ve en el menú y en cada página.
   "titulo" + "enfasis" forman el título grande (el énfasis va en cursiva).
   "resumen" aparece en el índice de la portada.
   "descripcion" es para buscadores.
------------------------------------------------------------------- */

export const paginas = [
  {
    id: 'sobre',
    numero: '01',
    ruta: '/sobre-mi/',
    nombre: 'Sobre mí',
    titulo: 'Sobre',
    enfasis: 'mí',
    resumen: 'Quién soy y cómo entiendo la atención.',
    descripcion:
      'Quién es la Dra. Eva Herrera Bravo, cirujana general, y cuál es su forma de atender.',
  },
  {
    id: 'formacion',
    numero: '02',
    ruta: '/formacion/',
    nombre: 'Formación',
    titulo: 'Formación',
    enfasis: '',
    resumen: 'Grado, residencia, posgrados y certificaciones.',
    descripcion:
      'Formación académica de la Dra. Eva Herrera Bravo: carrera de grado, residencia, posgrados, cursos y certificaciones.',
  },
  {
    id: 'experiencia',
    numero: '03',
    ruta: '/experiencia/',
    nombre: 'Experiencia',
    titulo: 'Experiencia',
    enfasis: '',
    resumen: 'Trayectoria, áreas de práctica y procedimientos.',
    descripcion:
      'Trayectoria profesional, instituciones, áreas de práctica y procedimientos de la Dra. Eva Herrera Bravo.',
  },
  {
    id: 'equipo',
    numero: '04',
    ruta: '/equipo/',
    nombre: 'Equipo',
    titulo: 'El',
    enfasis: 'equipo',
    resumen: 'Las personas que trabajan conmigo.',
    descripcion:
      'El equipo que acompaña a la Dra. Eva Herrera Bravo en el consultorio y en el quirófano.',
  },
  {
    id: 'lugares',
    numero: '05',
    ruta: '/donde-atiende/',
    nombre: 'Dónde atiende',
    titulo: 'Dónde',
    enfasis: 'atiende',
    resumen: 'Consultorios, días, horarios y teleconsulta.',
    descripcion:
      'Lugares de atención de la Dra. Eva Herrera Bravo: direcciones, días, horarios, obras sociales y teleconsulta.',
  },
  {
    id: 'contacto',
    numero: '06',
    ruta: '/contacto/',
    nombre: 'Contacto',
    titulo: 'Contacto',
    enfasis: '',
    resumen: 'Turnos, WhatsApp, email y redes.',
    descripcion:
      'Pedí turno con la Dra. Eva Herrera Bravo por WhatsApp, email o formulario.',
  },
] as const;

export type IdPagina = (typeof paginas)[number]['id'];

export function pagina(id: IdPagina) {
  return paginas.find((p) => p.id === id)!;
}
