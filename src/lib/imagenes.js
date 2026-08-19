import pb from '@/lib/pocketbaseClient';
import {
  PRODUCTOS_FALLBACK,
  CATEGORIAS_FALLBACK,
  TESTIMONIOS,
} from '@/data/catalogoFallback';

/**
 * Helpers de imágenes para el catálogo en la nube (PocketBase Storage).
 * Convierte los archivos subidos al bucket en URLs públicas y, cuando un
 * registro aún no tiene imágenes (p. ej. datos sembrados sin archivos),
 * recurre a las URLs de respaldo para que la vitrina nunca se vea vacía.
 */

const FALLBACK_IMG_PRODUCTO = Object.fromEntries(
  PRODUCTOS_FALLBACK.map((p) => [p.slug, p.imagenes])
);
const FALLBACK_IMG_CATEGORIA = Object.fromEntries(
  CATEGORIAS_FALLBACK.map((c) => [c.slug, c.imagenes])
);
const FALLBACK_FOTO_TESTIMONIO = Object.fromEntries(
  TESTIMONIOS.map((t) => [t.nombre, t.foto])
);

/** Devuelve un array de URLs públicas para un campo `file` múltiple. */
export function urlsImagenes(record, field, fallback = []) {
  const files = record?.[field];
  if (Array.isArray(files) && files.length) {
    return files.map((f) => pb.files.getURL(record, f));
  }
  if (typeof files === 'string' && files) {
    return [pb.files.getURL(record, files)];
  }
  return fallback;
}

/** Devuelve una sola URL pública para un campo `file` individual. */
export function urlImagen(record, field, fallback = '') {
  const file = record?.[field];
  if (Array.isArray(file) && file.length) return pb.files.getURL(record, file[0]);
  if (typeof file === 'string' && file) return pb.files.getURL(record, file);
  return fallback;
}

export const fallbackProducto = (slug) => FALLBACK_IMG_PRODUCTO[slug] || [];
export const fallbackCategoria = (slug) => FALLBACK_IMG_CATEGORIA[slug] || [];
export const fallbackTestimonio = (nombre) => FALLBACK_FOTO_TESTIMONIO[nombre] || '';
