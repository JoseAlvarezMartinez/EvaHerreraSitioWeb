/* ------------------------------------------------------------------
   DÓNDE ATIENDE
   La dirección, los días y los horarios son los reales. El teléfono de turnos
   y las coberturas siguen siendo EJEMPLOS: reemplazarlos.

   Mapa: "lat" y "lng" son las coordenadas del lugar. Para obtenerlas, buscá
   la dirección en Google Maps, hacé clic derecho sobre el punto y copiá los
   dos números. Las actuales apuntan al centro de Garín, no a la puerta de la
   clínica: hay que ajustarlas.

   Un lugar con "proximamente: true" se muestra como anuncio, sin datos ni mapa.
   Cuando esté definido, completá sus datos y pasalo a false.
------------------------------------------------------------------- */

type Dia = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface Consultorio {
  nombre: string;
  /** Rótulo chico arriba del nombre. */
  tipo: string;
  /** true: se muestra como anuncio, sin datos ni mapa. */
  proximamente: boolean;
  direccion: string;
  /** Localidad tal como se lee en la página. */
  localidad: string;
  /** Ciudad y provincia por separado: son para los buscadores (no se ven). */
  ciudad: string;
  provincia: string;
  dias: string;
  horarios: string;
  /** Lo mismo que "dias" y "horarios", en formato para buscadores: días en
      inglés y horas en 24 h. Tiene que decir lo mismo que los dos de arriba. */
  atencion: { dias: Dia[]; abre: string; cierra: string }[];
  turnos: string;
  obrasSociales: string[];
  nota: string;
  lat: number;
  lng: number;
}

export const lugares = {
  intro:
    'Atiendo en consultorio y por teleconsulta. Elegí lo que te quede más cómodo.',

  consultorios: [
    {
      nombre: 'Clínica de la Familia',
      tipo: 'Consultorio',
      proximamente: false,
      direccion: 'Rastreador de Fournier 3150',
      localidad: 'Garín, Buenos Aires',
      ciudad: 'Garín',
      provincia: 'Buenos Aires',
      dias: 'Lunes y viernes',
      horarios: '15 a 18 h',
      atencion: [{ dias: ['Monday', 'Friday'], abre: '15:00', cierra: '18:00' }],
      turnos: '+54 9 11 0000-0000 [COMPLETAR]',
      obrasSociales: [
        'Obra social [COMPLETAR]',
        'Prepaga [COMPLETAR]',
        'Particulares',
      ],
      nota: '',
      lat: -34.4226, // [COMPLETAR] aproximado: centro de Garín
      lng: -58.7397, // [COMPLETAR] aproximado: centro de Garín
    },
    {
      nombre: 'Consultorios externos y cirugías',
      tipo: 'Próximamente',
      proximamente: true,
      direccion: '',
      localidad: '',
      ciudad: '',
      provincia: '',
      dias: '',
      horarios: '',
      atencion: [],
      turnos: '',
      obrasSociales: [],
      // En un lugar "próximamente", la nota es el texto del anuncio.
      nota: 'Pronto voy a sumar este lugar de atención. Acá vas a encontrar la dirección, los días y los horarios.',
      lat: 0,
      lng: 0,
    },
  ] satisfies Consultorio[],

  teleconsulta: {
    titulo: 'Teleconsulta',
    descripcion:
      'Una videollamada desde tu casa. Sirve para una primera consulta, para revisar estudios, para una segunda opinión o para controles que no requieren examen físico.',
    pasos: [
      'Pedís el turno por WhatsApp o por el formulario.',
      'Recibís un enlace y las indicaciones de pago. [COMPLETAR: medios de pago.]',
      'Te conectás a la hora acordada, con tus estudios a mano.',
    ],
    datos: [
      { etiqueta: 'Días', valor: 'Lunes a sábados' },
      { etiqueta: 'Horarios', valor: 'A coordinar' },
      { etiqueta: 'Plataforma', valor: 'Videollamada de WhatsApp' },
      { etiqueta: 'Cobertura', valor: '[COMPLETAR]' },
    ],
    aviso:
      'La teleconsulta no reemplaza la atención de urgencia. Si el caso necesita examen físico, coordinamos una consulta presencial.',
  },
};
