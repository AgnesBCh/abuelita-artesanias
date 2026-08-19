import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import useCatalogo from '@/hooks/useCatalogo';

export default function Catalogo() {
  const { productos, categorias, cargando, error } = useCatalogo();
  const [params, setParams] = useSearchParams();
  const categoriaActiva = params.get('categoria') || 'todos';

  const visibles = useMemo(
    () =>
      categoriaActiva === 'todos'
        ? productos
        : productos.filter((p) => p.categoriaSlug === categoriaActiva),
    [productos, categoriaActiva]
  );

  const filtrar = (slug) => setParams(slug === 'todos' ? {} : { categoria: slug });

  return (
    <>
      <Helmet>
        <title>Catálogo artesanal | Lira &amp; Lino</title>
        <meta
          name="description"
          content="Explora el catálogo de Lira & Lino: ramos de cinta, detalles en chenille, tejidos a crochet y cajas de regalo hechas a mano en Perú."
        />
      </Helmet>

      <section className="seccion">
        <div className="contenedor">
          <p className="kicker">Catálogo</p>
          <h1 className="titulo-seccion">Piezas hechas a mano, una por una</h1>

          <div className="mt-9 flex flex-wrap gap-3">
            {[{ slug: 'todos', nombre: 'Todos' }, ...categorias].map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => filtrar(c.slug)}
                className="boton-linea"
                style={
                  categoriaActiva === c.slug
                    ? { borderColor: 'var(--color-oro)', color: 'var(--color-oro)' }
                    : undefined
                }
              >
                {c.nombre}
              </button>
            ))}
          </div>

          {error && (
            <p className="mt-8 text-sm text-[rgba(44,44,44,0.6)]">
              No pudimos conectar con el catálogo en línea; mostrando piezas destacadas del taller.
            </p>
          )}

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cargando &&
              [0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-[420px] animate-pulse bg-[rgba(197,168,128,0.12)]" />
              ))}

            {!cargando &&
              visibles.map((producto) => (
                <Link key={producto.id} to={`/producto/${producto.slug}`} className="group tarjeta block">
                  <div className="overflow-hidden">
                    <img
                      src={producto.imagenes[0]}
                      alt={producto.nombre}
                      loading="lazy"
                      className="h-72 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] texto-oro">{producto.categoria}</p>
                    <h2 className="fuente-display mt-2 text-xl">{producto.nombre}</h2>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[rgba(44,44,44,0.65)]">
                      {producto.descripcion}
                    </p>
                    <p className="mt-4 text-sm">S/ {producto.precio.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
          </div>

          {!cargando && visibles.length === 0 && (
            <p className="mt-12 text-sm text-[rgba(44,44,44,0.6)]">
              Aún no hay piezas publicadas en esta colección. Escríbenos y la creamos para ti.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
