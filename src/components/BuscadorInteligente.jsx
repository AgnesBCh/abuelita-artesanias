import React, { useMemo, useState } from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import { recomendarProductos } from '@/lib/recomendador';

const EJEMPLOS = [
  'Regalo de cumpleaños por menos de S/ 100',
  'Flores románticas para aniversario',
  'Algo tejido para decorar mi casa',
];

export default function BuscadorInteligente({ productos, onResultados }) {
  const [texto, setTexto] = useState('');
  const [consulta, setConsulta] = useState('');
  const resultados = useMemo(
    () => (consulta ? recomendarProductos(productos, consulta) : []),
    [productos, consulta]
  );

  const buscar = (event, ejemplo) => {
    event?.preventDefault();
    const valor = (ejemplo ?? texto).trim();
    setTexto(valor);
    setConsulta(valor);
  };

  // Notifica después del render para incluir el ranking de la consulta vigente.
  React.useEffect(() => {
    onResultados(consulta ? resultados : null, consulta);
  }, [consulta, resultados, onResultados]);

  const limpiar = () => {
    setTexto('');
    setConsulta('');
  };

  return (
    <div className="mt-10 border border-[rgba(197,168,128,0.45)] bg-white p-5 shadow-[0_16px_45px_rgba(44,44,44,0.05)] md:p-7">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[rgba(197,168,128,0.16)] texto-oro">
          <Sparkles size={17} aria-hidden="true" />
        </span>
        <div>
          <h2 className="fuente-display text-xl">Encuentra tu detalle ideal</h2>
          <p className="mt-1 text-sm leading-relaxed text-[rgba(44,44,44,0.62)]">
            Cuéntanos la ocasión, estilo, color o presupuesto. Nuestro recomendador buscará en el catálogo real.
          </p>
        </div>
      </div>

      <form onSubmit={buscar} className="relative mt-5">
        <label htmlFor="busqueda-inteligente" className="sr-only">Describe el regalo que buscas</label>
        <input
          id="busqueda-inteligente"
          value={texto}
          onChange={(event) => setTexto(event.target.value)}
          placeholder="Ej.: un regalo romántico en tonos claros por menos de S/ 150"
          className="min-h-14 w-full rounded-full border bg-[var(--color-crema)] py-3 pl-5 pr-28 text-sm outline-none transition focus:border-[var(--color-oro)] focus:ring-2 focus:ring-[rgba(197,168,128,0.16)]"
        />
        {consulta && (
          <button type="button" onClick={limpiar} aria-label="Limpiar búsqueda" className="absolute right-[4.5rem] top-1/2 -translate-y-1/2 p-2 text-[rgba(44,44,44,0.45)] hover:text-[var(--color-carbon)]">
            <X size={17} />
          </button>
        )}
        <button type="submit" aria-label="Buscar recomendaciones" className="absolute right-1.5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-oro)] text-white transition hover:scale-105">
          <Search size={18} />
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2" aria-label="Ejemplos de búsqueda">
        {EJEMPLOS.map((ejemplo) => (
          <button key={ejemplo} type="button" onClick={(event) => buscar(event, ejemplo)} className="rounded-full border px-3 py-2 text-left text-[0.68rem] text-[rgba(44,44,44,0.65)] transition hover:border-[var(--color-oro)] hover:text-[var(--color-oro)]">
            {ejemplo}
          </button>
        ))}
      </div>

      {consulta && (
        <p className="mt-5 text-xs text-[rgba(44,44,44,0.55)]" aria-live="polite">
          {resultados.length
            ? `${resultados.length} recomendaciones ordenadas por afinidad con “${consulta}”.`
            : 'No encontramos una coincidencia clara. Prueba con una ocasión, material o presupuesto diferente.'}
        </p>
      )}
    </div>
  );
}
