import { createHash } from 'node:crypto';
import { PRODUCTOS_DEMO } from '../../src/data/catalogoDemo.js';
import { COLLECTION, DIMENSIONS, EMBEDDING_MODEL, embedding, qdrant, textoProducto } from '../_lib/ai.js';
import { json } from '../_lib/http.js';

const uuid = (id) => { const h = createHash('sha256').update(id).digest('hex').slice(0, 32); return `${h.slice(0,8)}-${h.slice(8,12)}-4${h.slice(13,16)}-a${h.slice(17,20)}-${h.slice(20)}`; };

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Usa POST.' });
  if (!process.env.AI_INDEX_SECRET || req.headers.authorization !== `Bearer ${process.env.AI_INDEX_SECRET}`) return json(res, 401, { error: 'No autorizado.' });
  try {
    if (!process.env.OPENAI_API_KEY || !process.env.QDRANT_URL || !process.env.QDRANT_API_KEY) throw new Error('Faltan credenciales de OpenAI o Qdrant.');
    let productos = PRODUCTOS_DEMO;
    if (process.env.POCKETBASE_URL) {
      const pb = await fetch(`${process.env.POCKETBASE_URL.replace(/\/$/, '')}/api/collections/productos/records?perPage=500`);
      if (pb.ok) {
        const remotos = (await pb.json()).items || [];
        const slugs = new Set(remotos.map((p) => p.slug));
        productos = [...remotos, ...PRODUCTOS_DEMO.filter((p) => !slugs.has(p.slug))];
      }
    }
    const existe = await fetch(`${process.env.QDRANT_URL.replace(/\/$/, '')}/collections/${COLLECTION}`, { headers: { 'api-key': process.env.QDRANT_API_KEY } });
    if (existe.status === 404) await qdrant(`/collections/${COLLECTION}`, { method: 'PUT', body: JSON.stringify({ vectors: { size: DIMENSIONS, distance: 'Cosine' } }) });
    const vectors = await embedding(productos.map(textoProducto));
    await qdrant(`/collections/${COLLECTION}/points?wait=true`, { method: 'PUT', body: JSON.stringify({ points: productos.map((p, i) => ({ id: uuid(p.id), vector: vectors[i], payload: { ...p, _raw: undefined } })) }) });
    return json(res, 200, { indexed: productos.length, collection: COLLECTION, model: EMBEDDING_MODEL, dimensions: DIMENSIONS });
  } catch (error) { console.error(error); return json(res, 500, { error: 'No se pudo crear el índice.', detail: error.message }); }
}
