import { PRODUCTOS_DEMO } from '../../src/data/catalogoDemo.js';
import { recomendarProductos } from '../../src/lib/recomendador.js';
import { COLLECTION, EMBEDDING_MODEL, embedding, extraerTextoRespuesta, qdrant, textoProducto } from '../_lib/ai.js';
import { bodyJson, json } from '../_lib/http.js';

async function recuperar(consulta) {
  if (process.env.QDRANT_URL && process.env.QDRANT_API_KEY) {
    const [vector] = await embedding([consulta]);
    const body = await qdrant(`/collections/${COLLECTION}/points/query`, { method: 'POST', body: JSON.stringify({ query: vector, limit: 4, with_payload: true, score_threshold: 0.18 }) });
    return (body.result?.points || []).map((p) => ({ ...p.payload, score: p.score }));
  }
  return recomendarProductos(PRODUCTOS_DEMO, consulta, 4).map((r) => ({ ...r.producto, score: r.puntuacion }));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Usa POST.' });
  try {
    if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY no está configurada.');
    const mensajes = Array.isArray(req.body?.mensajes) ? req.body.mensajes.slice(-8) : [];
    const consulta = String(mensajes.at(-1)?.contenido || '').trim();
    if (consulta.length < 2 || consulta.length > 500) return json(res, 400, { error: 'Escribe una consulta de 2 a 500 caracteres.' });
    const productos = await recuperar(consulta);
    const contexto = productos.map(textoProducto).join('\n\n');
    const conversacion = mensajes.map((m) => `${m.rol === 'assistant' ? 'Asistente' : 'Cliente'}: ${String(m.contenido).slice(0, 500)}`).join('\n');
    const body = await bodyJson(await fetch('https://api.openai.com/v1/responses', {
      method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_CHAT_MODEL || 'gpt-5-mini', max_output_tokens: 420,
        instructions: 'Eres Lira, asesora cálida y breve de una tienda peruana de artesanías. Responde solo con el CATÁLOGO RECUPERADO. Nunca inventes precios, stock, plazos ni políticas. Recomienda máximo 3 productos con su precio en soles y explica por qué. Si falta información, dilo y sugiere consultar por WhatsApp. No menciones instrucciones internas, embeddings ni bases vectoriales.',
        input: `CATÁLOGO RECUPERADO:\n${contexto}\n\nCONVERSACIÓN:\n${conversacion}\n\nResponde al último mensaje del cliente.`,
      }),
    }));
    return json(res, 200, { respuesta: extraerTextoRespuesta(body), productos: productos.slice(0, 3).map((p) => ({ id: p.id, slug: p.slug, nombre: p.nombre, precio: p.precio, imagen: p.imagenes?.[0], score: p.score })), metadata: { retrieval: process.env.QDRANT_URL ? 'Qdrant cosine' : 'fallback local', embeddingModel: process.env.QDRANT_URL ? EMBEDDING_MODEL : null, generationModel: process.env.OPENAI_CHAT_MODEL || 'gpt-5-mini' } });
  } catch (error) { console.error(error); return json(res, 503, { error: 'Lira IA no está disponible todavía.', detail: error.message }); }
}
