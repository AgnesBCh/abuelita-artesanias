import React, { useEffect, useRef, useState } from 'react';
import { Bot, LoaderCircle, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const INICIO = { rol: 'assistant', contenido: '¡Hola! Soy Lira ✨ Cuéntame para quién es el regalo, la ocasión y tu presupuesto; buscaré opciones reales del catálogo.' };
const SUGERENCIAS = ['Regalo para una niña por S/ 60', 'Algo útil para el hogar', 'Decoración navideña especial'];

export default function AsistenteIA() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([INICIO]);
  const [texto, setTexto] = useState('');
  const [cargando, setCargando] = useState(false);
  const [productos, setProductos] = useState([]);
  const [modo, setModo] = useState('');
  const fin = useRef(null);

  useEffect(() => { fin.current?.scrollIntoView({ behavior: 'smooth' }); }, [mensajes, cargando]);

  const enviar = async (event, sugerencia) => {
    event?.preventDefault();
    const contenido = (sugerencia ?? texto).trim();
    if (!contenido || cargando) return;
    const siguientes = [...mensajes, { rol: 'user', contenido }];
    setMensajes(siguientes); setTexto(''); setCargando(true); setProductos([]);
    try {
      const response = await fetch('/api/ai/chat', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ mensajes: siguientes }) });
      const contenidoRespuesta = await response.text();
      if (!contenidoRespuesta.trim()) {
        throw new Error(`El servidor respondió vacío (${response.status}). Verifica que la función /api/ai/chat esté desplegada.`);
      }
      let body;
      try {
        body = JSON.parse(contenidoRespuesta);
      } catch {
        const esHtml = contenidoRespuesta.trim().startsWith('<');
        throw new Error(esHtml
          ? 'La ruta de IA devolvió la página web en vez de la API. En local usa “vercel dev”; en producción vuelve a desplegar la carpeta api.'
          : `La API devolvió una respuesta inválida (${response.status}).`);
      }
      if (!response.ok) throw new Error(body.error || 'No pude responder ahora.');
      setMensajes((actuales) => [...actuales, { rol: 'assistant', contenido: body.respuesta }]);
      setProductos(body.productos || []);
      setModo(body.metadata?.retrieval || '');
    } catch (error) {
      setMensajes((actuales) => [...actuales, { rol: 'assistant', contenido: `${error.message} Puedes explorar el catálogo mientras vuelvo a estar disponible.` }]);
    } finally { setCargando(false); }
  };

  return (
    <>
      <button type="button" onClick={() => setAbierto(true)} className="fixed bottom-5 right-5 z-[70] flex items-center gap-3 rounded-full bg-[var(--color-carbon)] px-5 py-3 text-sm text-white shadow-[0_14px_40px_rgba(44,44,44,0.28)] transition hover:-translate-y-1" aria-label="Abrir asistente de inteligencia artificial">
        <Sparkles size={18} className="texto-oro" /><span className="hidden sm:inline">Pregúntale a Lira</span>
      </button>

      {abierto && <div className="fixed inset-0 z-[80] bg-black/25 backdrop-blur-[2px]" onClick={() => setAbierto(false)} aria-hidden="true" />}
      <aside className={`fixed bottom-0 right-0 z-[90] flex h-[min(720px,92dvh)] w-full max-w-md flex-col bg-[var(--color-crema)] shadow-2xl transition-transform duration-300 sm:bottom-5 sm:right-5 sm:rounded-2xl ${abierto ? 'translate-y-0' : 'pointer-events-none translate-y-[110%]'}`} aria-label="Asistente Lira IA" aria-hidden={!abierto}>
        <header className="flex items-center gap-3 border-b bg-white p-4 sm:rounded-t-2xl">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[rgba(197,168,128,0.18)] texto-oro"><Bot size={20} /></span>
          <div className="min-w-0 flex-1"><h2 className="fuente-display text-lg">Lira IA</h2><p className="text-[0.65rem] uppercase tracking-[0.14em] text-[rgba(44,44,44,0.5)]">Asistente del catálogo</p></div>
          <button type="button" onClick={() => setAbierto(false)} className="p-2" aria-label="Cerrar asistente"><X size={20} /></button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {mensajes.map((mensaje, index) => <div key={`${mensaje.rol}-${index}`} className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${mensaje.rol === 'user' ? 'ml-auto rounded-br-sm bg-[var(--color-carbon)] text-white' : 'rounded-bl-sm border bg-white'}`}>{mensaje.contenido}</div>)}
          {mensajes.length === 1 && <div className="flex flex-wrap gap-2">{SUGERENCIAS.map((s) => <button key={s} type="button" onClick={(event) => enviar(event, s)} className="rounded-full border bg-white px-3 py-2 text-left text-xs hover:border-[var(--color-oro)]">{s}</button>)}</div>}
          {cargando && <div className="flex w-fit items-center gap-2 rounded-2xl border bg-white px-4 py-3 text-xs text-[rgba(44,44,44,0.6)]"><LoaderCircle size={15} className="animate-spin" /> Consultando el catálogo…</div>}
          {productos.length > 0 && <div className="grid gap-2">{productos.map((p) => <Link key={p.id} to={`/producto/${p.slug}`} onClick={() => setAbierto(false)} className="flex items-center gap-3 rounded-xl border bg-white p-2 transition hover:border-[var(--color-oro)]"><img src={p.imagen} alt="" className="h-14 w-14 rounded-lg object-cover" /><span className="min-w-0 flex-1"><strong className="block truncate text-xs font-medium">{p.nombre}</strong><span className="text-xs texto-oro">S/ {Number(p.precio).toFixed(2)}</span></span><MessageCircle size={16} /></Link>)}</div>}
          {modo && <p className="text-center text-[0.6rem] uppercase tracking-[0.12em] text-[rgba(44,44,44,0.38)]">RAG · {modo}</p>}
          <div ref={fin} />
        </div>

        <form onSubmit={enviar} className="flex gap-2 border-t bg-white p-3 sm:rounded-b-2xl">
          <label htmlFor="mensaje-lira" className="sr-only">Escribe tu consulta</label>
          <input id="mensaje-lira" value={texto} onChange={(e) => setTexto(e.target.value)} maxLength={500} placeholder="¿Qué regalo me recomiendas?" className="min-w-0 flex-1 rounded-full border bg-[var(--color-crema)] px-4 py-3 text-sm outline-none focus:border-[var(--color-oro)]" />
          <button type="submit" disabled={cargando || !texto.trim()} className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-oro)] text-white disabled:opacity-40" aria-label="Enviar"><Send size={17} /></button>
        </form>
      </aside>
    </>
  );
}
