import { json } from '../_lib/http.js';

export default function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Usa GET.' });
  return json(res, 200, {
    status: 'ok',
    openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
    qdrantConfigured: Boolean(process.env.QDRANT_URL && process.env.QDRANT_API_KEY),
    retrievalMode: process.env.QDRANT_URL && process.env.QDRANT_API_KEY ? 'qdrant' : 'fallback-local',
  });
}
