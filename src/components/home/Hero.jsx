import React from 'react';
import { Link } from 'react-router-dom';
import { HERO_IMAGE } from '@/data/catalogoFallback';

export default function Hero() {
  return (
    <section className="relative min-h-[86vh] w-full overflow-hidden md:min-h-[100dvh]">
      <img
        src={HERO_IMAGE}
        alt="Ramo de flores de cinta hechas a mano en el taller de Lira & Lino"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(44,44,44,0.28) 0%, rgba(44,44,44,0.12) 45%, rgba(247,245,240,0.92) 100%)' }}
      />

      <div className="contenedor relative flex min-h-[86vh] flex-col items-center justify-center text-center md:min-h-[100dvh]">
        <p className="kicker aparecer text-white/90">Taller artesanal peruano</p>
        <h1 className="aparecer mt-5 max-w-3xl text-white" style={{ fontSize: 'clamp(2.4rem, 7vw, 4.6rem)', animationDelay: '0.1s' }}>
          Detalles que nacen de las manos,
          <span className="block italic">y se quedan contigo</span>
        </h1>
        <p className="aparecer mt-6 max-w-xl text-sm leading-relaxed text-white/90 md:text-base" style={{ animationDelay: '0.2s' }}>
          Flores que no se marchitan, peluches hechos con cariño y pequeños detalles creados uno a uno.
          Cada pieza nace entre nuestras manos, pensada para quedarse.
        </p>
        <Link to="/catalogo" className="boton-oro aparecer mt-10 shadow-[0_10px_30px_rgba(44,44,44,0.18)]" style={{ animationDelay: '0.3s' }}>
          Ver catálogo
        </Link>
      </div>
    </section>
  );
}
