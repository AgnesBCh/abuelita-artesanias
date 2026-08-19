import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Carrusel from '@/components/Carrusel';

/** Rejilla asimétrica de categorías: imagen con curva y título en el espacio negativo. */
export default function CategoriasDestacadas({ categorias = [], cargando = false }) {
  return (
    <section id="categorias" className="seccion">
      <div className="contenedor">
        <div className="max-w-xl">
          <p className="kicker">Nuestras colecciones</p>
          <h2 className="titulo-seccion">Cada técnica, una historia distinta</h2>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {cargando &&
            [0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[380px] animate-pulse bg-[rgba(197,168,128,0.12)]" />
            ))}

          {!cargando &&
            categorias.map((categoria, i) => {
              const impar = i % 2 === 1;
              return (
                <Link
                  key={categoria.id}
                  to={`/catalogo?categoria=${categoria.slug}`}
                  className="group block"
                  style={{ marginTop: impar ? '2.5rem' : 0 }}
                >
                  <Carrusel
                    imagenes={categoria.imagenes}
                    alt={categoria.nombre}
                    intervalo={3000 + i * 400}
                    className={`h-[300px] w-full transition-transform duration-500 ease-out group-hover:-translate-y-1 md:h-[340px] ${
                      impar ? 'categoria-media--invertida' : 'categoria-media'
                    }`}
                  />
                  <div className={`px-1 ${impar ? 'text-right' : 'text-left'}`}>
                    <h3 className="fuente-display text-2xl">{categoria.nombre}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[rgba(44,44,44,0.65)]">
                      {categoria.descripcion}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[0.68rem] uppercase tracking-[0.2em] texto-oro">
                      Ver piezas <ArrowUpRight size={14} strokeWidth={1.5} />
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}
