import { contacto } from '../data/contacto';

/** Enlace de WhatsApp con el mensaje inicial ya escrito. */
export function enlaceWhatsapp(mensaje: string = contacto.whatsapp.mensajeInicial) {
  return `https://wa.me/${contacto.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
}

/** Enlace para abrir una dirección en Google Maps. */
export function enlaceMapa(lat: number, lng: number) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

/** Normaliza una ruta para compararla con las del menú. */
export function rutaNormalizada(ruta: string) {
  return ruta.endsWith('/') ? ruta : `${ruta}/`;
}
