import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import Carrusel from '@/components/Carrusel';
import useCatalogo from '@/hooks/useCatalogo';
import { construirUrlWhatsApp } from '@/lib/whatsapp';

const ETIQUETAS = {
  material: 'Material',
  tecnica: 'Técnica',
  dimensiones: 'Dimensiones',
  peso: 'Peso',
  colores: 'Colores',
  idealPara: 'Ideal para',
  cuidados: 'Cuidados',
};

export default function ProductoDetalle() {
  const { slug } = useParams();
  const { productos, cargando } = useCatalogo();
  const producto = productos.find((p) => p.slug === slug);

  if (cargando) {
    return (
      <div className="contenedor seccion">
        <div className="h-[480px] animate-pulse bg-[rgba(197,168,128,0.12)]" />
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="contenedor seccion text-center">
        <Helmet>
          <title>Pieza no encontrada | Lira &amp; Lino</title>
          <meta name="description" content="La pieza artesanal que buscas no está disponible en el catálogo de Lira & Lino." />
        </Helmet>
        <h1 className="titulo-seccion">No encontramos esta pieza</h1>
        <Link to="/catalogo" className="boton-oro mt-8">Volver al catálogo</Link>
      </div>
    );
  }

  const mensaje = construirUrlWhatsApp(
    `Hola Lira & Lino, me interesa "${producto.nombre}" (código ${producto.codigo}). ¿Podrían darme más información?`
  );

  return (
    <>
      <Helmet>
        <title>{`${producto.nombre} | Lira & Lino`}</title>
        <meta name="description" content={producto.descripcion.slice(0, 155)} />
      </Helmet>

      <section className="seccion">
        <div className="contenedor grid gap-12 lg:grid-cols-2">
          <Carrusel
            imagenes={producto.imagenes}
            alt={producto.nombre}
            className="h-[420px] w-full md:h-[560px]"
          />

          <div>
            <Link to="/catalogo" className="text-[0.65rem] uppercase tracking-[0.2em] texto-oro">
              ← Catálogo
            </Link>
            <h1 className="fuente-display mt-5 text-4xl">{producto.nombre}</h1>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[rgba(44,44,44,0.55)]">
              {producto.categoria} · {producto.codigo}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-[rgba(44,44,44,0.75)]">{producto.descripcion}</p>

            <p className="fuente-display mt-8 text-3xl texto-oro">S/ {producto.precio.toFixed(2)}</p>
            <p className="mt-2 text-xs text-[rgba(44,44,44,0.6)]">
              {producto.disponibilidad} · Elaboración: {producto.tiempoElaboracion}
            </p>

            <a href={mensaje} target="_blank" rel="noreferrer" className="boton-oro mt-8">
              Pedir por WhatsApp
            </a>

            <dl className="mt-12 border-t">
              {Object.entries(ETIQUETAS).map(([clave, etiqueta]) =>
                producto.caracteristicas?.[clave] ? (
                  <div key={clave} className="grid grid-cols-[9rem_1fr] gap-4 border-b py-4 text-sm">
                    <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-[rgba(44,44,44,0.55)]">
                      {etiqueta}
                    </dt>
                    <dd>{producto.caracteristicas[clave]}</dd>
                  </div>
                ) : null
              )}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
