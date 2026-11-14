/* Datos para buscadores: URLs absolutas y datos estructurados (schema.org).
   Todo sale de los archivos de src/data/, así no hay nada que mantener dos veces.
   Los datos que todavía dicen [COMPLETAR] no se publican. */

import { sitio } from '../data/sitio';
import { contacto } from '../data/contacto';
import { lugares } from '../data/lugares';

export const firma = `${sitio.tratamiento} ${sitio.nombreCompleto}`;

/** true si el texto es todavía un dato de ejemplo. */
export const esPendiente = (texto: string) => texto.includes('COMPLETAR');

/** URL completa de una ruta del sitio. Sin dominio configurado devuelve undefined. */
export function urlAbsoluta(ruta: string, base: URL | undefined): string | undefined {
  return base ? new URL(ruta, base).href : undefined;
}

/** Ficha de la médica y de sus consultorios (schema.org/Physician). */
export function datosDeLaMedica(base: URL | undefined, imagen?: string) {
  const consultorios = lugares.consultorios.filter((l) => !l.proximamente);
  const redes = contacto.redes.filter((r) => !esPendiente(r.usuario)).map((r) => r.url);

  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': urlAbsoluta('/#medica', base),
    name: firma,
    description: sitio.descripcion,
    url: urlAbsoluta('/', base),
    image: imagen,
    medicalSpecialty: 'https://schema.org/Surgical',
    email: esPendiente(contacto.email) ? undefined : contacto.email,
    telephone: esPendiente(contacto.whatsapp.visible) ? undefined : contacto.whatsapp.visible,
    sameAs: redes.length ? redes : undefined,
    location: consultorios.map((l) => ({
      '@type': 'MedicalClinic',
      name: l.nombre,
      address: {
        '@type': 'PostalAddress',
        streetAddress: l.direccion,
        addressLocality: l.ciudad,
        addressRegion: l.provincia,
        addressCountry: 'AR',
      },
      openingHoursSpecification: l.atencion.map((a) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: a.dias.map((d) => `https://schema.org/${d}`),
        opens: a.abre,
        closes: a.cierra,
      })),
    })),
  };
}

/** El sitio como conjunto (schema.org/WebSite). Solo tiene sentido con dominio. */
export function datosDelSitio(base: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: firma,
    url: base.href,
    inLanguage: 'es-AR',
  };
}

/** Ruta de ubicación de una página interna (schema.org/BreadcrumbList). */
export function datosDeLaRuta(base: URL, pasos: { nombre: string; ruta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: pasos.map((paso, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: paso.nombre,
      item: new URL(paso.ruta, base).href,
    })),
  };
}
