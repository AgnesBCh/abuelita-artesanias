import { bodyJson } from './http.js';

export const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || 'text-embedding-3-small';
export const DIMENSIONS = Number(process.env.EMBEDDING_DIMENSIONS || 1536);
export const COLLECTION = process.env.QDRANT_COLLECTION || 'catalogo_lira_lino';

export async function embedding(input) {
  const body = await bodyJson(await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input, dimensions: DIMENSIONS }),
  }));
  return body.data.map((item) => item.embedding);
}

export async function qdrant(path, options = {}) {
  const url = process.env.QDRANT_URL.replace(/\/$/, '');
  return bodyJson(await fetch(`${url}${path}`, { ...options, headers: { 'api-key': process.env.QDRANT_API_KEY, 'Content-Type': 'application/json', ...options.headers } }));
}

export function textoProducto(p) {
  const c = p.caracteristicas || {};
  return `Producto: ${p.nombre}. Categoría: ${p.categoria}. Descripción: ${p.descripcion}. Precio: S/ ${p.precio}. Disponibilidad: ${p.disponibilidad}. Elaboración: ${p.tiempoElaboracion}. Material: ${c.material}. Técnica: ${c.tecnica}. Colores: ${c.colores}. Ideal para: ${c.idealPara}. Cuidados: ${c.cuidados}.`;
}

export function extraerTextoRespuesta(body) {
  return body.output?.flatMap((item) => item.content || []).find((part) => part.type === 'output_text')?.text || 'No pude preparar una respuesta en este momento.';
}
