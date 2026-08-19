import React from 'react';
import { COLLAGE } from '@/data/catalogoFallback';

/** Collage fotográfico del proceso artesanal, en columnas de distinto tamaño. */
export default function HechoConAmor() {
  const columnaA = COLLAGE.slice(0, 2);
  const columnaB = COLLAGE.slice(2, 4);
  const columnaC = COLLAGE.slice(4);

  const renderColumna = (items, extraClass = '') => (
    <div className={`flex flex-col gap-4 ${extraClass}`}>
      {items.map((img) => (
        <figure key={img.src} className={`collage-item overflow-hidden ${img.size}`}>
          <img src={img.src} alt={img.alt} loading="lazy" className="collage-img" />
        </figure>
      ))}
    </div>
  );

  return (
    <section id="hecho-con-amor" className="seccion bg-[var(--color-blanco)]">
      <div className="contenedor grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="kicker">Hecho con amor</p>
          <h2 className="titulo-seccion">
            Nada sale de una máquina.
            <span className="block italic texto-oro">Todo sale de unas manos.</span>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-[rgba(44,44,44,0.7)]">
            Detrás de cada creación hay manos que cortan, moldean, tejen, unen y dan forma con paciencia.
            No buscamos hacer dos piezas exactamente iguales; buscamos que cada una tenga su propia historia.

            Porque cuando algo está hecho a mano, también lleva un poquito de la persona que lo hizo.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t pt-8">
            {[
              ['+900', 'piezas entregadas'],
              ['100%', 'hecho a mano'],
              ['24', 'regiones alcanzadas'],
            ].map(([valor, etiqueta]) => (
              <div key={etiqueta}>
                <dt className="fuente-display text-2xl texto-oro">{valor}</dt>
                <dd className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-[rgba(44,44,44,0.6)]">
                  {etiqueta}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {renderColumna(columnaA)}
          {renderColumna(columnaB, 'md:pt-10')}
          {renderColumna(columnaC, 'hidden md:flex md:pt-20')}
        </div>
      </div>
    </section>
  );
}
