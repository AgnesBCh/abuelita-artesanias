import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const ENLACES = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/#hecho-con-amor', label: 'Nosotras' },
  { to: '/#contacto', label: 'Contacto' },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-[rgba(247,245,240,0.88)] backdrop-blur-md">
      <div className="contenedor flex h-[74px] items-center justify-between">
        <Link to="/" className="leading-none" onClick={() => setAbierto(false)}>
          <span className="fuente-display block text-xl tracking-wide md:text-2xl">Lira &amp; Lino</span>
          <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.34em] texto-oro">
            Regalos eternos hechos a mano
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {ENLACES.map((e) => (
            <NavLink
              key={e.to}
              to={e.to}
              className="text-[0.72rem] uppercase tracking-[0.2em] transition-colors hover:text-[var(--color-oro)]"
            >
              {e.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center md:hidden"
          onClick={() => setAbierto((v) => !v)}
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        >
          {abierto ? <X size={22} strokeWidth={1.4} /> : <Menu size={22} strokeWidth={1.4} />}
        </button>
      </div>

      {abierto && (
        <nav className="border-t bg-[var(--color-crema)] md:hidden">
          <div className="contenedor flex flex-col py-2">
            {ENLACES.map((e) => (
              <NavLink
                key={e.to}
                to={e.to}
                onClick={() => setAbierto(false)}
                className="border-b py-4 text-[0.78rem] uppercase tracking-[0.2em] last:border-b-0"
              >
                {e.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
