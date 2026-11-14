import type { ImageMetadata } from 'astro';

/* Todas las fotos de src/assets/imagenes/, indexadas por su ruta. */
const fotos = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/imagenes/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}',
  { eager: true },
);

/** Devuelve la foto si el archivo existe en src/assets/imagenes/, o undefined si todavía no se cargó. */
export function buscarFoto(archivo: string): ImageMetadata | undefined {
  return fotos[`/src/assets/imagenes/${archivo}`]?.default;
}
