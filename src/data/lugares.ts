/* ------------------------------------------------------------------
   DÓNDE ATIENDE
   Direcciones, días, horarios y coberturas son EJEMPLOS: reemplazar todos.

   Mapa: "lat" y "lng" son las coordenadas del lugar. Para obtenerlas, buscá
   la dirección en Google Maps, hacé clic derecho sobre el punto y copiá los
   dos números. Los valores actuales apuntan al centro de Buenos Aires y son
   solo de muestra.
------------------------------------------------------------------- */

export const lugares = {
  intro:
    'Atiendo en dos lugares y por teleconsulta. Elegí el que te quede más cómodo.',

  consultorios: [
    {
      nombre: 'Consultorio [COMPLETAR]',
      tipo: 'Consultorio particular',
      direccion: 'Av. [COMPLETAR] 1234, piso 3',
      localidad: '[COMPLETAR: barrio, ciudad]',
      dias: 'Lunes y miércoles [COMPLETAR]',
      horarios: '14 a 19 h [COMPLETAR]',
      turnos: '+54 9 11 0000-0000 [COMPLETAR]',
      obrasSociales: [
        'Obra social [COMPLETAR]',
        'Prepaga [COMPLETAR]',
        'Prepaga [COMPLETAR]',
        'Particulares',
      ],
      nota: 'Edificio con ascensor. [COMPLETAR: accesos, estacionamiento, transporte.]',
      lat: -34.6037, // [COMPLETAR]
      lng: -58.3816, // [COMPLETAR]
    },
    {
      nombre: 'Sanatorio [COMPLETAR]',
      tipo: 'Consultorios externos y cirugías',
      direccion: 'Calle [COMPLETAR] 567',
      localidad: '[COMPLETAR: barrio, ciudad]',
      dias: 'Martes y jueves [COMPLETAR]',
      horarios: '9 a 13 h [COMPLETAR]',
      turnos: '+54 11 0000-0000 [COMPLETAR]',
      obrasSociales: [
        'Obra social [COMPLETAR]',
        'Obra social [COMPLETAR]',
        'Prepaga [COMPLETAR]',
        'Particulares',
      ],
      nota: 'Los turnos se piden en la central del sanatorio. [COMPLETAR]',
      lat: -34.5889, // [COMPLETAR]
      lng: -58.3974, // [COMPLETAR]
    },
  ],

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
      { etiqueta: 'Días', valor: 'Viernes [COMPLETAR]' },
      { etiqueta: 'Horarios', valor: '10 a 14 h [COMPLETAR]' },
      { etiqueta: 'Plataforma', valor: '[COMPLETAR: Meet, Zoom, etc.]' },
      { etiqueta: 'Cobertura', valor: '[COMPLETAR]' },
    ],
    aviso:
      'La teleconsulta no reemplaza la atención de urgencia. Si el caso necesita examen físico, coordinamos una consulta presencial.',
  },
};
