import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { construirUrlWhatsApp } from '@/lib/whatsapp';

const INICIAL = { nombre: '', telefono: '', correo: '', asunto: '', mensaje: '' };

/** Valida los campos obligatorios antes de construir el mensaje de WhatsApp. */
const validar = ({ nombre, telefono, correo, asunto, mensaje }) => {
  const errores = {};
  if (nombre.trim().length < 3) errores.nombre = 'Ingresa tu nombre y apellido.';
  if (!/^[\d+\s()-]{6,15}$/.test(telefono.trim())) errores.telefono = 'Ingresa un teléfono válido.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo.trim())) errores.correo = 'Ingresa un correo válido.';
  if (asunto.trim().length < 3) errores.asunto = 'Cuéntanos el asunto.';
  if (mensaje.trim().length < 10) errores.mensaje = 'Escribe al menos 10 caracteres.';
  return errores;
};

export default function ContactForm() {
  const [datos, setDatos] = useState(INICIAL);
  const [errores, setErrores] = useState({});

  const cambiar = (campo) => (evento) => {
    setDatos((prev) => ({ ...prev, [campo]: evento.target.value }));
    setErrores((prev) => ({ ...prev, [campo]: undefined }));
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const nuevosErrores = validar(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const mensaje = [
      `Hola Lira & Lino, soy ${datos.nombre.trim()}.`,
      '',
      `Teléfono: ${datos.telefono.trim()}`,
      `Correo: ${datos.correo.trim()}`,
      `Asunto: ${datos.asunto.trim()}`,
      '',
      `Mensaje: ${datos.mensaje.trim()}`,
    ].join('\n');

    window.open(construirUrlWhatsApp(mensaje), '_blank', 'noopener,noreferrer');
    setDatos(INICIAL);
  };

  const campo = (nombre, etiqueta, tipo = 'text', placeholder = '') => (
    <div className="flex flex-col gap-2">
      <label htmlFor={nombre} className="text-[0.68rem] uppercase tracking-[0.18em] text-[rgba(44,44,44,0.65)]">
        {etiqueta}
      </label>
      <input
        id={nombre}
        name={nombre}
        type={tipo}
        value={datos[nombre]}
        onChange={cambiar(nombre)}
        placeholder={placeholder}
        className="w-full border bg-[var(--color-blanco)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-oro)]"
      />
      {errores[nombre] && <span className="text-xs text-[#a33]">{errores[nombre]}</span>}
    </div>
  );

  return (
    <section id="contacto" className="seccion bg-[var(--color-blanco)]">
      <div className="contenedor grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="kicker">Conversemos</p>
          <h2 className="titulo-seccion">Escríbenos por WhatsApp</h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[rgba(44,44,44,0.7)]">
            Completa el formulario y se abrirá WhatsApp con tu mensaje listo para enviar.
            Respondemos de lunes a sábado, de 9:00 a 19:00.
          </p>
        </div>

        <form onSubmit={enviar} noValidate className="grid gap-5 sm:grid-cols-2">
          {campo('nombre', 'Nombre y apellido', 'text', 'María Fernández')}
          {campo('telefono', 'Teléfono / celular', 'tel', '987 654 321')}
          {campo('correo', 'Correo electrónico', 'email', 'maria@correo.com')}
          {campo('asunto', 'Asunto', 'text', 'Ramo para aniversario')}

          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor="mensaje" className="text-[0.68rem] uppercase tracking-[0.18em] text-[rgba(44,44,44,0.65)]">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              value={datos.mensaje}
              onChange={cambiar('mensaje')}
              placeholder="Cuéntanos qué te gustaría encargar, colores y fecha de entrega."
              className="w-full resize-none border bg-[var(--color-blanco)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-oro)]"
            />
            {errores.mensaje && <span className="text-xs text-[#a33]">{errores.mensaje}</span>}
          </div>

          <div className="sm:col-span-2">
            <button type="submit" className="boton-oro w-full sm:w-auto">
              Enviar a WhatsApp <Send size={15} strokeWidth={1.5} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
