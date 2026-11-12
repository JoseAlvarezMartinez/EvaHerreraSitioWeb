/* ------------------------------------------------------------------
   SOBRE MÍ
   Los textos son un borrador de tono. Reemplazalos por los definitivos.
------------------------------------------------------------------- */

export const sobre = {
  // Foto de retrato. Guardala en src/assets/imagenes/ con este nombre.
  // Mientras no exista el archivo, se muestra un bloque con las iniciales.
  foto: 'dra-eva-herrera-bravo.jpg',
  iniciales: 'EHB',

  // Frase grande que abre la página y también la portada.
  presentacion:
    'Soy cirujana general. Me dedico a que cada paciente entienda qué tiene, qué opciones hay y qué puede esperar de cada una.',

  // Biografía. Un párrafo por elemento.
  bio: [
    'Me recibí de médica en la Universidad [COMPLETAR] e hice la residencia en Cirugía General en el Hospital [COMPLETAR].',
    'Desde entonces trabajo en [COMPLETAR], donde opero y atiendo consultorio. También atiendo por teleconsulta a pacientes que viven lejos o que necesitan una segunda opinión.',
    'Una cirugía no empieza en el quirófano. Empieza en la primera consulta, cuando nos sentamos a hablar. Por eso le doy a esa conversación el tiempo que necesita.',
  ],

  // Filosofía de atención. Cuatro principios funcionan bien; pueden ser más o menos.
  filosofia: [
    {
      titulo: 'Escuchar primero',
      texto:
        'Antes de pedir estudios o indicar algo, necesito entender qué te pasa y qué te preocupa.',
    },
    {
      titulo: 'Explicar con claridad',
      texto:
        'Sin tecnicismos innecesarios. Si algo no se entiende, lo volvemos a ver las veces que haga falta.',
    },
    {
      titulo: 'Indicar lo necesario',
      texto:
        'No toda consulta termina en una cirugía. Cuando hay alternativas, las conversamos.',
    },
    {
      titulo: 'Acompañar todo el proceso',
      texto:
        'La consulta previa, la operación y los controles posteriores los hace el mismo equipo.',
    },
  ],

  // Cita propia de la doctora (no es un testimonio de paciente).
  cita: 'Operar bien es una parte del trabajo. La otra es que la persona sepa, en todo momento, qué está pasando.',

  // Ficha breve al costado de la biografía.
  ficha: [
    { etiqueta: 'Especialidad', valor: 'Cirugía general' },
    { etiqueta: 'Matrícula', valor: 'M.N. [COMPLETAR] · M.P. [COMPLETAR]' },
    { etiqueta: 'Atención', valor: 'Consultorio y teleconsulta' },
    { etiqueta: 'Idiomas', valor: 'Español, [COMPLETAR]' },
  ],
};
