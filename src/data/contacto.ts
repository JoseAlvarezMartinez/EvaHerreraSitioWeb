/* ------------------------------------------------------------------
   CONTACTO
   El email es el real. El teléfono y las redes son EJEMPLOS: reemplazarlos.
------------------------------------------------------------------- */

export const contacto = {
  intro:
    'Para pedir un turno o hacer una consulta, escribime por el medio que prefieras.',

  whatsapp: {
    // Solo números, con código de país y sin "+", espacios ni guiones.
    // Ejemplo para un celular de Buenos Aires: 5491123456789
    numero: '5491100000000', // [COMPLETAR]
    visible: '+54 9 11 0000-0000 [COMPLETAR]',
    mensajeInicial: 'Hola, quisiera pedir un turno con la Dra. Herrera Bravo.',
  },

  email: 'evahb2@hotmail.com',

  // Redes. Borrá las que no se usen.
  redes: [
    { nombre: 'Instagram', usuario: '@[COMPLETAR]', url: 'https://www.instagram.com/' }, // [COMPLETAR] url
    { nombre: 'LinkedIn', usuario: '[COMPLETAR]', url: 'https://www.linkedin.com/' }, // [COMPLETAR] url
  ],

  horarioRespuesta: 'Respondemos de lunes a viernes, de 9 a 18 h. [COMPLETAR]',

  formulario: {
    /* Dónde se envía el formulario.
       - Vacío (''): al enviar, se abre el programa de correo de la persona con
         el mensaje ya escrito, dirigido al email de arriba.
       - Con una dirección de un servicio de formularios (por ejemplo Formspree:
         'https://formspree.io/f/xxxxxxx'): el mensaje se envía desde la página. */
    destino: '',

    motivos: [
      'Turno en consultorio',
      'Teleconsulta',
      'Segunda opinión',
      'Consulta de un colega',
      'Otro',
    ],

    aviso:
      'Este formulario no es para urgencias. Ante una urgencia, andá a la guardia más cercana o llamá al 107.',
    privacidad:
      'No envíes estudios ni información sensible por este medio. Lo vemos en la consulta.',
  },
};
