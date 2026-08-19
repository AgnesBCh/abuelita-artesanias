import React from 'react';
import { useApp } from '@/context/AppContext';

/** Opiniones reales en disposición tipo masonry (columnas CSS). */
export default function Testimonios() {
  const { testimonios } = useApp();

  return (
    <section id="testimonios" className="seccion">
      <div className="contenedor">
        <div className="max-w-xl">
          <p className="kicker">Opiniones auténticas</p>
          <h2 className="titulo-seccion">Quienes ya recibieron su detalle</h2>
        </div>

        {testimonios.length === 0 ? (
          <p className="mt-12 text-sm text-[rgba(44,44,44,0.6)]">
            Pronto compartiremos las primeras opiniones de quienes ya recibieron su detalle.
          </p>
        ) : (
          <div className="mt-12 gap-6 [column-count:1] sm:[column-count:2] lg:[column-count:3]">
            {testimonios.map((t, i) => (
              <article
                key={t.id}
                className="tarjeta mb-6 break-inside-avoid"
                style={{ marginTop: i === 1 ? '1.5rem' : 0 }}
              >
                {t.foto && (
                  <img
                    src={t.foto}
                    alt={`${t.nombre} con su ${t.producto}`}
                    loading="lazy"
                    className="h-56 w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="text-sm tracking-[0.3em] texto-oro">{'★'.repeat(t.estrellas)}</p>
                  <p className="mt-4 text-sm leading-relaxed text-[rgba(44,44,44,0.8)]">“{t.resena}”</p>
                  <div className="mt-5 border-t pt-4">
                    <p className="fuente-display text-lg">{t.nombre}</p>
                    <p className="text-xs text-[rgba(44,44,44,0.55)]">
                      {t.ciudad} · {t.fecha}
                    </p>
                    <span className="mt-3 inline-block border px-3 py-1 text-[0.62rem] uppercase tracking-[0.16em] texto-oro">
                      {t.producto}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
