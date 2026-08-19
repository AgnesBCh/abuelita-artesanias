import React from 'react';
import { BANNER_PERSONALIZADO } from '@/data/catalogoFallback';
import { construirUrlWhatsApp } from '@/lib/whatsapp';

/** Banner de pedidos personalizados con CTA directo a WhatsApp. */
export default function BannerPersonalizado() {
  const url = construirUrlWhatsApp(
    'Hola Lira & Lino, quisiera cotizar un pedido personalizado.'
  );

  return (
    <section className="relative overflow-hidden">
      <img
        src={BANNER_PERSONALIZADO}
        alt="Arreglo personalizado de flores de cinta con tarjeta dedicada"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(44,44,44,0.62)' }} />
      <div className="contenedor relative flex flex-col items-center py-20 text-center md:py-28">
        <p className="kicker">Pedidos personalizados</p>
        <h2 className="titulo-seccion max-w-2xl text-white">
          ¿Tienes una idea en mente? La hacemos realidad
        </h2>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/80">
          Colores de tu boda, la flor favorita de tu mamá, un logo tejido para tu empresa.
          Cuéntanos y te enviamos una propuesta con boceto y precio.
        </p>
        <a href={url} target="_blank" rel="noreferrer" className="boton-oro mt-9">
          Cotizar mi proyecto
        </a>
      </div>
    </section>
  );
}
