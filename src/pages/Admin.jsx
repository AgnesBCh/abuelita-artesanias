import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  LogOut, Plus, Pencil, Trash2, X, Save, Image as ImageIcon, Loader2, AlertCircle,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/contexts/AuthContext';

/* ============================ Utilidades UI ============================ */

const slugify = (t) =>
  String(t || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const PESTANAS = [
  { id: 'productos', label: 'Productos' },
  { id: 'categorias', label: 'Categorías' },
  { id: 'testimonios', label: 'Testimonios' },
];

function Campo({ label, children, error }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[0.68rem] uppercase tracking-[0.18em] text-[rgba(44,44,44,0.65)]">
        {label}
      </label>
      {children}
      {error && <span className="text-xs text-[#a33]">{error}</span>}
    </div>
  );
}

const inputCls =
  'w-full border bg-[var(--color-blanco)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-oro)]';

/* ====================== Editor de imágenes (nube) ====================== */
/**
 * Gestiona imágenes subidas al Storage de la nube (PocketBase):
 * muestra las ya guardadas (con su URL pública) y permite añadir archivos
 * nuevos desde el dispositivo. Devuelve `{ imagenesExistentes, archivosNuevos }`.
 */
function EditorImagenes({ existentes = [], archivosNuevos = [], onChange, max = 10, campo = 'imagenes' }) {
  const archivoRef = useRef(null);
  const [nuevosPreview, setNuevosPreview] = useState(() =>
    archivosNuevos.map((f) => ({ file: f, url: URL.createObjectURL(f) }))
  );

  const quitarExistente = (filename) => {
    const ex = existentes.filter((e) => e.filename !== filename);
    onChange({ imagenesExistentes: ex, archivosNuevos: nuevosPreview.map((n) => n.file) });
  };

  const quitarNuevo = (idx) => {
    const filtrados = nuevosPreview.filter((_, i) => i !== idx);
    setNuevosPreview(filtrados);
    onChange({ imagenesExistentes: existentes, archivosNuevos: filtrados.map((n) => n.file) });
  };

  const subir = (e) => {
    const archivos = Array.from(e.target.files || []).slice(0, max - existentes.length - nuevosPreview.length);
    if (!archivos.length) { e.target.value = ''; return; }
    const previews = archivos.map((f) => ({ file: f, url: URL.createObjectURL(f) }));
    const combined = [...nuevosPreview, ...previews];
    setNuevosPreview(combined);
    onChange({ imagenesExistentes: existentes, archivosNuevos: combined.map((n) => n.file) });
    e.target.value = '';
  };

  return (
    <div className="flex flex-col gap-3">
      {existentes.map((img) => (
        <div key={img.filename} className="flex items-center gap-3">
          <img src={img.url} alt={img.filename} className="h-14 w-14 object-cover border" />
          <span className="flex-1 truncate text-xs text-[rgba(44,44,44,0.55)]">{img.filename}</span>
          <button
            type="button"
            onClick={() => quitarExistente(img.filename)}
            className="flex h-9 w-9 shrink-0 items-center justify-center border text-[#a33] transition-colors hover:bg-[#a33] hover:text-white"
            aria-label="Quitar imagen"
          >
            <X size={15} />
          </button>
        </div>
      ))}

      {nuevosPreview.map((n, i) => (
        <div key={n.url} className="flex items-center gap-3">
          <img src={n.url} alt="Nueva imagen" className="h-14 w-14 object-cover border" />
          <span className="flex-1 truncate text-xs text-[rgba(44,44,44,0.55)]">{n.file.name}</span>
          <button
            type="button"
            onClick={() => quitarNuevo(i)}
            className="flex h-9 w-9 shrink-0 items-center justify-center border text-[#a33] transition-colors hover:bg-[#a33] hover:text-white"
            aria-label="Quitar nueva imagen"
          >
            <X size={15} />
          </button>
        </div>
      ))}

      <button type="button" onClick={() => archivoRef.current?.click()} className="boton-linea w-fit">
        <ImageIcon size={15} /> Subir imagen desde el dispositivo
      </button>
      <input
        ref={archivoRef}
        type="file"
        accept="image/*"
        multiple={campo !== 'foto'}
        onChange={subir}
        className="hidden"
      />
      <p className="text-[0.62rem] text-[rgba(44,44,44,0.45)]">
        Las imágenes se guardan en el almacenamiento de la nube y quedan visibles para todos los clientes.
      </p>
    </div>
  );
}

/* ============================ Modal genérico ============================ */

function Modal({ titulo, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[rgba(44,44,44,0.55)] p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="my-8 w-full max-w-2xl bg-[var(--color-crema)] p-6 shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="fuente-display text-2xl">{titulo}</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center transition-colors hover:text-[var(--color-oro)]"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>
        <div className="pt-5">{children}</div>
      </div>
    </div>
  );
}

function Confirmar({ mensaje, onConfirm, onCancel, esperando }) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[rgba(44,44,44,0.55)] p-4 backdrop-blur-sm" onClick={esperando ? undefined : onCancel}>
      <div className="w-full max-w-sm bg-[var(--color-crema)] p-6 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm leading-relaxed text-[rgba(44,44,44,0.8)]">{mensaje}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button type="button" onClick={onCancel} disabled={esperando} className="boton-linea">Cancelar</button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={esperando}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#a33] px-6 py-3 text-[0.78rem] uppercase tracking-[0.18em] text-[#a33] transition-colors hover:bg-[#a33] hover:text-white disabled:opacity-60"
          >
            {esperando ? <Loader2 size={15} className="animate-spin" /> : null}
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================ Productos ============================ */

const PRODUCTO_VACIO = {
  nombre: '', slug: '', categoriaSlug: '', descripcion: '', precio: '',
  tiempoElaboracion: '', disponibilidad: '', codigo: '',
  caracteristicas: { material: '', tecnica: '', dimensiones: '', peso: '', colores: '', idealPara: '', cuidados: '' },
};

function FormProducto({ inicial, categorias, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(() => ({
    ...PRODUCTO_VACIO,
    ...inicial,
    caracteristicas: { ...PRODUCTO_VACIO.caracteristicas, ...(inicial?.caracteristicas || {}) },
  }));
  const [imagenes, setImagenes] = useState(() => ({
    imagenesExistentes: inicial?.imagenesExistentes || [],
    archivosNuevos: [],
  }));
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [serverError, setServerError] = useState('');

  const set = (campo, valor) => setDatos((d) => ({ ...d, [campo]: valor }));
  const setCaract = (campo, valor) =>
    setDatos((d) => ({ ...d, caracteristicas: { ...d.caracteristicas, [campo]: valor } }));

  const validar = () => {
    const e = {};
    if (datos.nombre.trim().length < 3) e.nombre = 'Ingresa un nombre.';
    if (!datos.categoriaSlug) e.categoriaSlug = 'Selecciona una categoría.';
    if (!datos.precio || Number(datos.precio) <= 0) e.precio = 'Ingresa un precio válido.';
    if (datos.descripcion.trim().length < 10) e.descripcion = 'Describe el producto (mín. 10 caracteres).';
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const guardar = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validar()) return;
    setGuardando(true);
    try {
      await onGuardar({
        ...datos,
        ...imagenes,
        slug: datos.slug.trim() || slugify(datos.nombre),
      });
    } catch (err) {
      setServerError(err?.response?.message || err?.message || 'No se pudo guardar.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={guardar} className="grid gap-5 sm:grid-cols-2">
      <Campo label="Nombre" error={errores.nombre}>
        <input className={inputCls} value={datos.nombre} onChange={(e) => set('nombre', e.target.value)} />
      </Campo>
      <Campo label="Slug (URL)">
        <input className={inputCls} value={datos.slug} onChange={(e) => set('slug', e.target.value)} placeholder={slugify(datos.nombre) || 'auto'} />
      </Campo>
      <Campo label="Categoría" error={errores.categoriaSlug}>
        <select className={inputCls} value={datos.categoriaSlug} onChange={(e) => set('categoriaSlug', e.target.value)}>
          <option value="">Selecciona…</option>
          {categorias.map((c) => <option key={c.id} value={c.slug}>{c.nombre}</option>)}
        </select>
      </Campo>
      <Campo label="Precio (S/)" error={errores.precio}>
        <input type="number" step="0.01" min="0" className={inputCls} value={datos.precio} onChange={(e) => set('precio', e.target.value)} />
      </Campo>
      <Campo label="Código">
        <input className={inputCls} value={datos.codigo} onChange={(e) => set('codigo', e.target.value)} />
      </Campo>
      <Campo label="Disponibilidad">
        <input className={inputCls} value={datos.disponibilidad} onChange={(e) => set('disponibilidad', e.target.value)} placeholder="Bajo pedido / Disponible" />
      </Campo>
      <Campo label="Tiempo de elaboración">
        <input className={inputCls} value={datos.tiempoElaboracion} onChange={(e) => set('tiempoElaboracion', e.target.value)} />
      </Campo>
      <div className="sm:col-span-2">
        <Campo label="Descripción" error={errores.descripcion}>
          <textarea rows={3} className={`${inputCls} resize-none`} value={datos.descripcion} onChange={(e) => set('descripcion', e.target.value)} />
        </Campo>
      </div>
      <div className="sm:col-span-2">
        <Campo label="Imágenes (almacenamiento en la nube)">
          <EditorImagenes
            existentes={imagenes.imagenesExistentes}
            archivosNuevos={imagenes.archivosNuevos}
            onChange={setImagenes}
            max={10}
          />
        </Campo>
      </div>
      <div className="sm:col-span-2 border-t pt-4">
        <p className="kicker mb-3">Características</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ['material', 'Material'], ['tecnica', 'Técnica'], ['dimensiones', 'Dimensiones'],
            ['peso', 'Peso'], ['colores', 'Colores'], ['idealPara', 'Ideal para'], ['cuidados', 'Cuidados'],
          ].map(([k, lbl]) => (
            <Campo key={k} label={lbl}>
              <input className={inputCls} value={datos.caracteristicas[k] || ''} onChange={(e) => setCaract(k, e.target.value)} />
            </Campo>
          ))}
        </div>
      </div>
      {serverError && (
        <p className="sm:col-span-2 flex items-center gap-2 text-xs text-[#a33]">
          <AlertCircle size={14} /> {serverError}
        </p>
      )}
      <div className="flex gap-3 sm:col-span-2">
        <button type="submit" disabled={guardando} className="boton-oro disabled:opacity-60">
          {guardando ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Guardar
        </button>
        <button type="button" onClick={onCancelar} className="boton-linea">Cancelar</button>
      </div>
    </form>
  );
}

function TabProductos() {
  const { productos, categorias, crearProducto, actualizarProducto, eliminarProducto } = useApp();
  const [editando, setEditando] = useState(null);
  const [confirmar, setConfirmar] = useState(null);
  const [esperando, setEsperando] = useState(false);

  const guardar = async (datos) => {
    if (editando === 'nuevo') await crearProducto(datos);
    else await actualizarProducto(editando.id, datos);
    setEditando(null);
  };

  const confirmarEliminar = async () => {
    setEsperando(true);
    try {
      await eliminarProducto(confirmar.id);
      setConfirmar(null);
    } finally {
      setEsperando(false);
    }
  };

  const abrirEditar = (p) => setEditando({
    ...p,
    imagenesExistentes: (p._imagenesArchivos || []).map((fn, i) => ({
      filename: fn,
      url: p.imagenes[i] || '',
    })),
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-[rgba(44,44,44,0.65)]">{productos.length} producto(s)</p>
        <button onClick={() => setEditando('nuevo')} className="boton-oro"><Plus size={15} /> Nuevo producto</button>
      </div>
      <div className="grid gap-4">
        {productos.map((p) => (
          <div key={p.id} className="tarjeta flex items-center gap-4 p-4">
            {p.imagenes[0] ? (
              <img src={p.imagenes[0]} alt={p.nombre} className="h-16 w-16 shrink-0 object-cover" />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[var(--color-crema)]">
                <ImageIcon size={18} className="text-[rgba(44,44,44,0.3)]" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="fuente-display text-lg">{p.nombre}</p>
              <p className="truncate text-xs text-[rgba(44,44,44,0.6)]">{p.categoria} · {p.codigo} · S/ {Number(p.precio).toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => abrirEditar(p)} className="flex h-10 w-10 items-center justify-center border transition-colors hover:border-[var(--color-oro)] hover:text-[var(--color-oro)]" aria-label="Editar"><Pencil size={16} /></button>
              <button onClick={() => setConfirmar(p)} className="flex h-10 w-10 items-center justify-center border text-[#a33] transition-colors hover:bg-[#a33] hover:text-white" aria-label="Eliminar"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {productos.length === 0 && <p className="text-sm text-[rgba(44,44,44,0.6)]">No hay productos. Crea el primero.</p>}
      </div>

      {editando && (
        <Modal titulo={editando === 'nuevo' ? 'Nuevo producto' : 'Editar producto'} onClose={() => setEditando(null)}>
          <FormProducto
            inicial={editando === 'nuevo' ? null : editando}
            categorias={categorias}
            onGuardar={guardar}
            onCancelar={() => setEditando(null)}
          />
        </Modal>
      )}
      {confirmar && (
        <Confirmar
          mensaje={`¿Eliminar "${confirmar.nombre}"? Esta acción no se puede deshacer.`}
          onConfirm={confirmarEliminar}
          onCancel={() => setConfirmar(null)}
          esperando={esperando}
        />
      )}
    </div>
  );
}

/* ============================ Categorías ============================ */

const CATEGORIA_VACIA = { nombre: '', slug: '', descripcion: '' };

function FormCategoria({ inicial, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(() => ({ ...CATEGORIA_VACIA, ...inicial }));
  const [imagenes, setImagenes] = useState(() => ({
    imagenesExistentes: inicial?.imagenesExistentes || [],
    archivosNuevos: [],
  }));
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [serverError, setServerError] = useState('');
  const set = (c, v) => setDatos((d) => ({ ...d, [c]: v }));

  const guardar = async (e) => {
    e.preventDefault();
    setServerError('');
    const er = {};
    if (datos.nombre.trim().length < 2) er.nombre = 'Ingresa un nombre.';
    setErrores(er);
    if (Object.keys(er).length) return;
    setGuardando(true);
    try {
      await onGuardar({ ...datos, ...imagenes, slug: datos.slug.trim() || slugify(datos.nombre) });
    } catch (err) {
      setServerError(err?.response?.message || err?.message || 'No se pudo guardar.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={guardar} className="grid gap-5">
      <Campo label="Nombre" error={errores.nombre}>
        <input className={inputCls} value={datos.nombre} onChange={(e) => set('nombre', e.target.value)} />
      </Campo>
      <Campo label="Slug (URL)">
        <input className={inputCls} value={datos.slug} onChange={(e) => set('slug', e.target.value)} placeholder={slugify(datos.nombre) || 'auto'} />
      </Campo>
      <Campo label="Descripción">
        <textarea rows={2} className={`${inputCls} resize-none`} value={datos.descripcion} onChange={(e) => set('descripcion', e.target.value)} />
      </Campo>
      <Campo label="Fotos de portada (nube)">
        <EditorImagenes
          existentes={imagenes.imagenesExistentes}
          archivosNuevos={imagenes.archivosNuevos}
          onChange={setImagenes}
          max={5}
          campo="portada"
        />
      </Campo>
      {serverError && <p className="flex items-center gap-2 text-xs text-[#a33]"><AlertCircle size={14} /> {serverError}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={guardando} className="boton-oro disabled:opacity-60">
          {guardando ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Guardar
        </button>
        <button type="button" onClick={onCancelar} className="boton-linea">Cancelar</button>
      </div>
    </form>
  );
}

function TabCategorias() {
  const { categorias, crearCategoria, actualizarCategoria, eliminarCategoria } = useApp();
  const [editando, setEditando] = useState(null);
  const [confirmar, setConfirmar] = useState(null);
  const [esperando, setEsperando] = useState(false);

  const guardar = async (datos) => {
    if (editando === 'nuevo') await crearCategoria(datos);
    else await actualizarCategoria(editando.id, datos);
    setEditando(null);
  };

  const confirmarEliminar = async () => {
    setEsperando(true);
    try { await eliminarCategoria(confirmar.id); setConfirmar(null); } finally { setEsperando(false); }
  };

  const abrirEditar = (c) => setEditando({
    ...c,
    imagenesExistentes: (c._portadaArchivos || []).map((fn, i) => ({
      filename: fn,
      url: c.imagenes[i] || '',
    })),
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-[rgba(44,44,44,0.65)]">{categorias.length} categoría(s)</p>
        <button onClick={() => setEditando('nuevo')} className="boton-oro"><Plus size={15} /> Nueva categoría</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {categorias.map((c) => (
          <div key={c.id} className="tarjeta p-4">
            <div className="flex items-start gap-4">
              {c.imagenes[0] ? (
                <img src={c.imagenes[0]} alt={c.nombre} className="h-16 w-16 shrink-0 object-cover" />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[var(--color-crema)]"><ImageIcon size={18} className="text-[rgba(44,44,44,0.3)]" /></div>
              )}
              <div className="min-w-0 flex-1">
                <p className="fuente-display text-lg">{c.nombre}</p>
                <p className="mt-1 line-clamp-2 text-xs text-[rgba(44,44,44,0.6)]">{c.descripcion}</p>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <button onClick={() => abrirEditar(c)} className="flex h-9 w-9 items-center justify-center border transition-colors hover:border-[var(--color-oro)] hover:text-[var(--color-oro)]" aria-label="Editar"><Pencil size={15} /></button>
              <button onClick={() => setConfirmar(c)} className="flex h-9 w-9 items-center justify-center border text-[#a33] transition-colors hover:bg-[#a33] hover:text-white" aria-label="Eliminar"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
        {categorias.length === 0 && <p className="text-sm text-[rgba(44,44,44,0.6)]">No hay categorías.</p>}
      </div>

      {editando && (
        <Modal titulo={editando === 'nuevo' ? 'Nueva categoría' : 'Editar categoría'} onClose={() => setEditando(null)}>
          <FormCategoria
            inicial={editando === 'nuevo' ? null : editando}
            onGuardar={guardar}
            onCancelar={() => setEditando(null)}
          />
        </Modal>
      )}
      {confirmar && (
        <Confirmar
          mensaje={`¿Eliminar la categoría "${confirmar.nombre}"?`}
          onConfirm={confirmarEliminar}
          onCancel={() => setConfirmar(null)}
          esperando={esperando}
        />
      )}
    </div>
  );
}

/* ============================ Testimonios ============================ */

const TESTIMONIO_VACIO = { nombre: '', ciudad: '', fecha: '', estrellas: 5, resena: '', producto: '' };

function FormTestimonio({ inicial, productos, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(() => ({ ...TESTIMONIO_VACIO, ...inicial }));
  const [imagenes, setImagenes] = useState(() => ({
    imagenesExistentes: inicial?.imagenesExistentes || [],
    archivosNuevos: [],
  }));
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [serverError, setServerError] = useState('');
  const set = (c, v) => setDatos((d) => ({ ...d, [c]: v }));

  const guardar = async (e) => {
    e.preventDefault();
    setServerError('');
    const er = {};
    if (datos.nombre.trim().length < 3) er.nombre = 'Ingresa el nombre.';
    if (datos.resena.trim().length < 10) er.resena = 'Escribe la reseña (mín. 10 caracteres).';
    setErrores(er);
    if (Object.keys(er).length) return;
    setGuardando(true);
    try {
      await onGuardar({ ...datos, ...imagenes });
    } catch (err) {
      setServerError(err?.response?.message || err?.message || 'No se pudo guardar.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={guardar} className="grid gap-5 sm:grid-cols-2">
      <Campo label="Nombre" error={errores.nombre}>
        <input className={inputCls} value={datos.nombre} onChange={(e) => set('nombre', e.target.value)} />
      </Campo>
      <Campo label="Ciudad">
        <input className={inputCls} value={datos.ciudad} onChange={(e) => set('ciudad', e.target.value)} />
      </Campo>
      <Campo label="Fecha">
        <input className={inputCls} value={datos.fecha} onChange={(e) => set('fecha', e.target.value)} placeholder="Marzo 2025" />
      </Campo>
      <Campo label="Calificación (1-5)">
        <select className={inputCls} value={datos.estrellas} onChange={(e) => set('estrellas', Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} estrellas</option>)}
        </select>
      </Campo>
      <Campo label="Producto adquirido">
        <input className={inputCls} value={datos.producto} onChange={(e) => set('producto', e.target.value)} list="lista-productos" />
        <datalist id="lista-productos">
          {productos.map((p) => <option key={p.id} value={p.nombre} />)}
        </datalist>
      </Campo>
      <Campo label="Foto del cliente (nube)">
        <EditorImagenes
          existentes={imagenes.imagenesExistentes}
          archivosNuevos={imagenes.archivosNuevos}
          onChange={setImagenes}
          max={1}
          campo="foto"
        />
      </Campo>
      <div className="sm:col-span-2">
        <Campo label="Reseña" error={errores.resena}>
          <textarea rows={3} className={`${inputCls} resize-none`} value={datos.resena} onChange={(e) => set('resena', e.target.value)} />
        </Campo>
      </div>
      {serverError && <p className="sm:col-span-2 flex items-center gap-2 text-xs text-[#a33]"><AlertCircle size={14} /> {serverError}</p>}
      <div className="flex gap-3 sm:col-span-2">
        <button type="submit" disabled={guardando} className="boton-oro disabled:opacity-60">
          {guardando ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Guardar
        </button>
        <button type="button" onClick={onCancelar} className="boton-linea">Cancelar</button>
      </div>
    </form>
  );
}

function TabTestimonios() {
  const { testimonios, productos, crearTestimonio, actualizarTestimonio, eliminarTestimonio } = useApp();
  const [editando, setEditando] = useState(null);
  const [confirmar, setConfirmar] = useState(null);
  const [esperando, setEsperando] = useState(false);

  const guardar = async (datos) => {
    if (editando === 'nuevo') await crearTestimonio(datos);
    else await actualizarTestimonio(editando.id, datos);
    setEditando(null);
  };

  const confirmarEliminar = async () => {
    setEsperando(true);
    try { await eliminarTestimonio(confirmar.id); setConfirmar(null); } finally { setEsperando(false); }
  };

  const abrirEditar = (t) => setEditando({
    ...t,
    imagenesExistentes: t._fotoArchivo ? [{ filename: t._fotoArchivo, url: t.foto }] : [],
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-[rgba(44,44,44,0.65)]">{testimonios.length} testimonio(s)</p>
        <button onClick={() => setEditando('nuevo')} className="boton-oro"><Plus size={15} /> Nuevo testimonio</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {testimonios.map((t) => (
          <div key={t.id} className="tarjeta p-4">
            <div className="flex items-start gap-4">
              {t.foto ? (
                <img src={t.foto} alt={t.nombre} className="h-14 w-14 shrink-0 rounded-full object-cover" />
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-crema)]"><ImageIcon size={16} className="text-[rgba(44,44,44,0.3)]" /></div>
              )}
              <div className="min-w-0 flex-1">
                <p className="fuente-display text-lg">{t.nombre}</p>
                <p className="text-xs texto-oro">{'★'.repeat(t.estrellas)}</p>
                <p className="mt-1 line-clamp-2 text-xs text-[rgba(44,44,44,0.6)]">{t.resena}</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.14em] text-[rgba(44,44,44,0.5)]">{t.ciudad} · {t.fecha} · {t.producto}</p>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <button onClick={() => abrirEditar(t)} className="flex h-9 w-9 items-center justify-center border transition-colors hover:border-[var(--color-oro)] hover:text-[var(--color-oro)]" aria-label="Editar"><Pencil size={15} /></button>
              <button onClick={() => setConfirmar(t)} className="flex h-9 w-9 items-center justify-center border text-[#a33] transition-colors hover:bg-[#a33] hover:text-white" aria-label="Eliminar"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
        {testimonios.length === 0 && <p className="text-sm text-[rgba(44,44,44,0.6)]">No hay testimonios.</p>}
      </div>

      {editando && (
        <Modal titulo={editando === 'nuevo' ? 'Nuevo testimonio' : 'Editar testimonio'} onClose={() => setEditando(null)}>
          <FormTestimonio
            inicial={editando === 'nuevo' ? null : editando}
            productos={productos}
            onGuardar={guardar}
            onCancelar={() => setEditando(null)}
          />
        </Modal>
      )}
      {confirmar && (
        <Confirmar
          mensaje={`¿Eliminar el testimonio de "${confirmar.nombre}"?`}
          onConfirm={confirmarEliminar}
          onCancel={() => setConfirmar(null)}
          esperando={esperando}
        />
      )}
    </div>
  );
}

/* ============================ Página Admin ============================ */

export default function Admin() {
  const { logout } = useAuth();
  const [pestana, setPestana] = useState('productos');

  return (
    <>
      <Helmet>
        <title>Admin | Lira &amp; Lino</title>
        <meta name="description" content="Panel de administración de Lira & Lino." />
      </Helmet>

      <section className="seccion">
        <div className="contenedor">
          <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="kicker">Panel de administración</p>
              <h1 className="titulo-seccion">Gestión de la tienda</h1>
            </div>
            <div className="flex gap-3">
              <Link to="/" className="boton-linea">Ver tienda</Link>
              <button onClick={logout} className="boton-linea"><LogOut size={15} /> Salir</button>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[200px_1fr]">
            <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              {PESTANAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPestana(p.id)}
                  className="whitespace-nowrap border px-5 py-3 text-left text-[0.72rem] uppercase tracking-[0.18em] transition-colors"
                  style={
                    pestana === p.id
                      ? { borderColor: 'var(--color-oro)', color: 'var(--color-oro)', background: 'rgba(197,168,128,0.08)' }
                      : undefined
                  }
                >
                  {p.label}
                </button>
              ))}
            </nav>

            <div>
              {pestana === 'productos' && <TabProductos />}
              {pestana === 'categorias' && <TabCategorias />}
              {pestana === 'testimonios' && <TabTestimonios />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
