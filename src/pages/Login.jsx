import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

/** Login elegante para el panel de administración (Supabase/PocketBase Auth). */
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    setError('');
    setEnviando(true);
    try {
      await login(email.trim(), clave);
      navigate('/admin', { replace: true });
    } catch (err) {
      const msg =
        err?.response?.message ||
        err?.message ||
        'No pudimos iniciar sesión. Verifica tus credenciales.';
      setError(msg);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Acceso | Lira &amp; Lino Admin</title>
        <meta name="description" content="Inicio de sesión del panel de administración de Lira & Lino." />
      </Helmet>

      <section className="seccion flex min-h-[78vh] items-center justify-center">
        <form onSubmit={enviar} className="tarjeta w-full max-w-sm p-8" noValidate>
          <div className="mb-7 flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(197,168,128,0.15)]">
              <Lock size={22} className="texto-oro" />
            </div>
            <h1 className="fuente-display mt-4 text-2xl">Panel de administración</h1>
            <p className="mt-2 text-xs text-[rgba(44,44,44,0.6)]">Lira &amp; Lino · acceso restringido</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[0.68rem] uppercase tracking-[0.18em] text-[rgba(44,44,44,0.65)]">
              Correo
            </label>
            <div className="flex items-center gap-2 border bg-[var(--color-blanco)] px-4 focus-within:border-[var(--color-oro)]">
              <Mail size={16} strokeWidth={1.5} className="text-[rgba(44,44,44,0.4)]" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                placeholder="admin@liraylino.pe"
                className="w-full bg-transparent py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <label htmlFor="clave" className="text-[0.68rem] uppercase tracking-[0.18em] text-[rgba(44,44,44,0.65)]">
              Contraseña
            </label>
            <div className="flex items-center gap-2 border bg-[var(--color-blanco)] px-4 focus-within:border-[var(--color-oro)]">
              <Lock size={16} strokeWidth={1.5} className="text-[rgba(44,44,44,0.4)]" />
              <input
                id="clave"
                type="password"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent py-3 text-sm outline-none"
              />
            </div>
          </div>

          {error && <p className="mt-4 text-xs text-[#a33]">{error}</p>}

          <button type="submit" disabled={enviando} className="boton-oro mt-7 w-full disabled:opacity-60">
            {enviando ? 'Entrando…' : 'Entrar'}
          </button>

          <Link to="/" className="mt-5 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] texto-oro">
            <ArrowLeft size={14} strokeWidth={1.5} /> Volver a la tienda
          </Link>
        </form>
      </section>
    </>
  );
}
