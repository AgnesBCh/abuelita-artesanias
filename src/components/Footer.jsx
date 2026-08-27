import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Mail } from 'lucide-react';
import { WHATSAPP_NUMERO } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer className="border-t bg-[var(--color-blanco)]">
      <div className="contenedor grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="fuente-display text-2xl">Lira &amp; Lino</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[rgba(44,44,44,0.7)]">
            Mujeres de casa y creativas. Flores de cinta, detalles en chenille y tejidos hechos a mano,
            pensados para durar toda la vida.
          </p>
        </div>

        <div>
          <p className="kicker">Navegación</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[var(--color-oro)]">Inicio</Link></li>
            <li><Link to="/catalogo" className="hover:text-[var(--color-oro)]">Catálogo</Link></li>
            <li><a href="/#testimonios" className="hover:text-[var(--color-oro)]">Testimonios</a></li>
            <li><a href="/#contacto" className="hover:text-[var(--color-oro)]">Contacto</a></li>
          </ul>
        </div>

        <div>
          <p className="kicker">Escríbenos</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <MessageCircle size={16} strokeWidth={1.4} className="texto-oro" />
              <a href={`https://wa.me/${WHATSAPP_NUMERO}`} target="_blank" rel="noreferrer" className="hover:text-[var(--color-oro)]">
                WhatsApp +51 926 8585 658
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} strokeWidth={1.4} className="texto-oro" />
              <a href="mailto:hola@liraylino.pe" className="hover:text-[var(--color-oro)]">hola@liraylino.pe</a>
            </li>
            <li className="flex items-center gap-3">
              <Instagram size={16} strokeWidth={1.4} className="texto-oro" />
              <span>@liraylino</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="contenedor flex flex-col gap-2 py-6 text-xs text-[rgba(44,44,44,0.55)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Lira &amp; Lino. Hecho a mano en Perú.</p>
          <p>Envíos a todo el país</p>
        </div>
      </div>
    </footer>
  );
}
