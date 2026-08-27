# Demo Khipu: Lira IA

## Qué demuestra

- Catálogo de 27 piezas artesanales enriquecidas con atributos estructurados.
- RAG: cada consulta se convierte en un embedding, Qdrant recupera productos por similitud coseno y un modelo generativo responde únicamente con ese contexto.
- PocketBase continúa como fuente operacional; Qdrant es un índice derivado y reconstruible.
- Si Qdrant no está configurado, el demo conserva recuperación local para desarrollo y la interfaz indica ese modo.

## Activación en Vercel

Configura las variables de `.env.example`, despliega y ejecuta:

```bash
curl -X POST https://TU-DOMINIO/api/ai/index \
  -H "Authorization: Bearer TU_AI_INDEX_SECRET"
```

Después prueba: “Tengo S/80 y busco un regalo alegre para una niña”.

Para ejecutar frontend y funciones API al mismo tiempo en local instala/inicia sesión en Vercel CLI y usa `vercel dev` (o `npx vercel dev`). `npm run dev` levanta solamente Vite y no ejecuta `/api/ai/chat`.

Comprueba la instalación visitando `/api/ai/health`. Debe devolver JSON con `openaiConfigured: true`.

## Guion de 90 segundos

1. Portada: explicar que el negocio combina flores, textiles, hogar y campañas estacionales.
2. Catálogo: mostrar las cinco categorías y abrir un producto para enseñar atributos.
3. Lira IA: pedir un regalo con ocasión y presupuesto; señalar productos recuperados y precios verificables.
4. Cierre técnico: `text-embedding-3-small` → Qdrant/coseno → `gpt-5-mini`, con PocketBase como fuente de verdad.
5. Exploración: dataset de consultas etiquetadas, Precision@3, MRR, feedback y reranking por stock/plazo.

## Declaración rigurosa

Es un prototipo de recuperación semántica con un modelo preentrenado. Todavía no es un recomendador personalizado ni un modelo entrenado con historial propio. Los precios del catálogo demo son referenciales y deben validarse antes de aceptar pedidos.
