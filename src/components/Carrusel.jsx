import React, { useEffect, useRef, useState } from 'react';

/**
 * Carrusel de imágenes reutilizable con auto-avance y pausa en hover.
 * Se usa dentro de las tarjetas de categoría y en la galería de producto.
 */
export default function Carrusel({ imagenes = [], alt = '', intervalo = 3200, className = '' }) {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);
  const temporizador = useRef(null);

  useEffect(() => {
    if (pausado || imagenes.length < 2) return undefined;
    temporizador.current = setInterval(() => {
      setIndice((actual) => (actual + 1) % imagenes.length);
    }, intervalo);
    return () => clearInterval(temporizador.current);
  }, [pausado, imagenes.length, intervalo]);

  if (!imagenes.length) {
    return <div className={`bg-[var(--color-crema)] ${className}`} aria-hidden="true" />;
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      {imagenes.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${alt}${imagenes.length > 1 ? ` — imagen ${i + 1}` : ''}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: i === indice ? 1 : 0 }}
        />
      ))}
      {imagenes.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {imagenes.map((src, i) => (
            <button
              key={`punto-${src}`}
              type="button"
              aria-label={`Ver imagen ${i + 1}`}
              onClick={() => setIndice(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === indice ? 20 : 6,
                background: i === indice ? 'var(--color-oro)' : 'rgba(255,255,255,0.75)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
