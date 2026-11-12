/* ------------------------------------------------------------------
   EQUIPO
   Los cinco integrantes son FICTICIOS. Reemplazar nombres, roles y bios.

   Fotos: guardarlas en src/assets/imagenes/equipo/ con el nombre indicado
   en "foto". Se muestran en blanco y negro automáticamente.
   Mientras el archivo no exista, se ve un bloque con las iniciales.
------------------------------------------------------------------- */

export const equipo = {
  intro:
    'Una cirugía es un trabajo de equipo. Estas son las personas que vas a conocer en el consultorio y en el quirófano.',

  integrantes: [
    {
      nombre: 'Dr. Martín Quiroga',
      rol: 'Cirujano ayudante',
      bio: 'Cirujano general. Participa en las cirugías y en los controles posoperatorios.',
      foto: 'equipo/martin-quiroga.jpg',
      iniciales: 'MQ',
    },
    {
      nombre: 'Dra. Lucía Benedetti',
      rol: 'Anestesióloga',
      bio: 'Hace la evaluación previa a la anestesia y te acompaña durante toda la cirugía.',
      foto: 'equipo/lucia-benedetti.jpg',
      iniciales: 'LB',
    },
    {
      nombre: 'Lic. Carolina Méndez',
      rol: 'Instrumentadora quirúrgica',
      bio: 'Prepara el quirófano y el instrumental. Trabaja con la doctora desde hace años.',
      foto: 'equipo/carolina-mendez.jpg',
      iniciales: 'CM',
    },
    {
      nombre: 'Lic. Tomás Ferreyra',
      rol: 'Enfermero',
      bio: 'Se ocupa de las curaciones y del seguimiento después de la operación.',
      foto: 'equipo/tomas-ferreyra.jpg',
      iniciales: 'TF',
    },
    {
      nombre: 'Paula Giménez',
      rol: 'Secretaria',
      bio: 'Coordina turnos, autorizaciones y estudios prequirúrgicos. Es quien responde tus mensajes.',
      foto: 'equipo/paula-gimenez.jpg',
      iniciales: 'PG',
    },
  ],
};
