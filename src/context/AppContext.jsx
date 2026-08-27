import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from 'react';
import pb from '@/lib/pocketbaseClient';
import {
  urlsImagenes,
  urlImagen,
  fallbackProducto,
  fallbackCategoria,
  fallbackTestimonio,
} from '@/lib/imagenes';
import { CATEGORIAS_DEMO, PRODUCTOS_DEMO } from '@/data/catalogoDemo';

/**
 * AppContext — estado global de la tienda Lira & Lino respaldado por la nube.
 *
 * Se conecta a PocketBase para productos, categorías y testimonios, expone
 * CRUD completo (con subida de imágenes al Storage de la nube) y mantiene
 * sincronización en tiempo real: cualquier cambio en la base de datos se
 * refleja al instante en todos los clientes conectados.
 */

const generarCodigo = (datos, categoria) => {
  console.log('Generando código para datos:', datos, 'y categoría:', categoria);
  if (datos.codigo && datos.codigo.trim() !== '') return datos.codigo;
  
  const prefijo = categoria?.siglas || 'PROD';
  const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
  return `${prefijo.toUpperCase()}-${numeroAleatorio}`;
};


const slugify = (texto) =>
  String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/* ----------------------- Transformaciones PB → UI ----------------------- */

const transformProducto = (rec) => ({
  id: rec.id,
  slug: rec.slug || '',
  nombre: rec.nombre || '',
  categoriaSlug: rec.categoriaSlug || '',
  categoria: rec.categoria || '',
  descripcion: rec.descripcion || '',
  precio: Number(rec.precio) || 0,
  tiempoElaboracion: rec.tiempoElaboracion || '',
  disponibilidad: rec.disponibilidad || '',
  codigo: rec.codigo || '',
  imagenes: urlsImagenes(rec, 'imagenes', fallbackProducto(rec.slug)),
  caracteristicas: rec.caracteristicas || {},
  // Conservamos referencias para reconstruir archivos al editar
  _imagenesArchivos: Array.isArray(rec.imagenes) ? rec.imagenes : [],
  _raw: rec,
});

const transformCategoria = (rec) => ({
  id: rec.id,
  slug: rec.slug || '',
  nombre: rec.nombre || '',
  descripcion: rec.descripcion || '',
  siglas: rec.siglas || '',
  imagenes: urlsImagenes(rec, 'portada', fallbackCategoria(rec.slug)),
  _portadaArchivos: Array.isArray(rec.portada) ? rec.portada : [],
  _raw: rec,
});

const transformTestimonio = (rec) => ({
  id: rec.id,
  nombre: rec.nombre || '',
  ciudad: rec.ciudad || '',
  fecha: rec.fecha || '',
  estrellas: Number(rec.estrellas) || 5,
  resena: rec.resena || '',
  producto: rec.producto || '',
  foto: urlImagen(rec, 'foto', fallbackTestimonio(rec.nombre)),
  _fotoArchivo: typeof rec.foto === 'string' ? rec.foto : '',
  _raw: rec,
});

/* ----------------------------- Contexto ----------------------------- */

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [productos, setProductos] = useState(PRODUCTOS_DEMO);
  const [categorias, setCategorias] = useState(CATEGORIAS_DEMO);
  const [testimonios, setTestimonios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  /* ----------------------------- Carga ----------------------------- */

  const cargarProductos = useCallback(async () => {
    try {
      const lista = await pb.collection('productos').getFullList({ sort: 'orden,created' });
      const remotos = lista.map(transformProducto);
      const slugs = new Set(remotos.map((item) => item.slug));
      setProductos([...remotos, ...PRODUCTOS_DEMO.filter((item) => !slugs.has(item.slug))]);
    } catch (err) {
      console.error('Error cargando productos:', err);
      setError(err);
    }
  }, []);

  const cargarCategorias = useCallback(async () => {
    try {
      const lista = await pb.collection('categorias').getFullList({ sort: 'orden,created' });
      const remotas = lista.map(transformCategoria);
      const slugs = new Set(remotas.map((item) => item.slug));
      setCategorias([...remotas, ...CATEGORIAS_DEMO.filter((item) => !slugs.has(item.slug))]);
    } catch (err) {
      console.error('Error cargando categorías:', err);
      setError(err);
    }
  }, []);

  const cargarTestimonios = useCallback(async () => {
    try {
      const lista = await pb.collection('testimonios').getFullList({ sort: 'orden,created' });
      setTestimonios(lista.map(transformTestimonio));
    } catch (err) {
      console.error('Error cargando testimonios:', err);
      setError(err);
    }
  }, []);

  const cargarTodo = useCallback(async () => {
    setCargando(true);
    await Promise.all([cargarCategorias(), cargarProductos(), cargarTestimonios()]);
    setCargando(false);
  }, [cargarCategorias, cargarProductos, cargarTestimonios]);

  useEffect(() => {
    void cargarTodo();
  }, [cargarTodo]);

  /* ----------------------- Suscripciones tiempo real ----------------------- */
  // Ref para evitar reconexiones innecesarias.
  const montado = useRef(true);
  useEffect(() => {
    montado.current = true;
    const suscripciones = ['productos', 'categorias', 'testimonios'].map((col) =>
      pb
        .collection(col)
        .subscribe('*', () => {
          // Recarga la colección afectada — simple y libre de carreras.
          if (!montado.current) return;
          if (col === 'productos') void cargarProductos();
          if (col === 'categorias') void cargarCategorias();
          if (col === 'testimonios') void cargarTestimonios();
        })
        .catch((e) => console.error(`Suscripción ${col} falló:`, e))
    );
    return () => {
      montado.current = false;
      suscripciones.forEach((p) =>
        p.then((unsub) => (typeof unsub === 'function' ? unsub() : undefined)).catch(() => {})
      );
      void pb.collection('productos').unsubscribe('*').catch(() => {});
      void pb.collection('categorias').unsubscribe('*').catch(() => {});
      void pb.collection('testimonios').unsubscribe('*').catch(() => {});
    };
  }, [cargarProductos, cargarCategorias, cargarTestimonios]);

  /* ----------------------------- Helpers FormData ----------------------------- */

  const texto = (fd, k, v) => {
    if (v === undefined || v === null) return;
    fd.append(k, String(v));
  };

  /* ------------------------------- PRODUCTOS ------------------------------ */

  const crearProducto = useCallback(async (datos) => {
    const fd = new FormData();
     // 1. Buscar la categoría completa para obtener sus siglas
    const categoriaSeleccionada = categorias.find(c => c.slug === datos.categoriaSlug);
    const codigoFinal = generarCodigo(datos, categoriaSeleccionada);
    
    const nombreCategoria = categoriaSeleccionada ? categoriaSeleccionada.nombre : datos.categoria; 

    const slug = datos.slug?.trim() || slugify(datos.nombre);
   
   
    texto(fd, 'slug', slug);
    texto(fd, 'nombre', datos.nombre);
    texto(fd, 'categoriaSlug', datos.categoriaSlug);
    texto(fd, 'categoria', nombreCategoria);
    texto(fd, 'descripcion', datos.descripcion);
    texto(fd, 'precio', datos.precio);
    texto(fd, 'tiempoElaboracion', datos.tiempoElaboracion);
    texto(fd, 'disponibilidad', datos.disponibilidad);
    texto(fd, 'codigo', codigoFinal);
    texto(fd, 'orden', datos.orden ?? 0);
    fd.append('caracteristicas', JSON.stringify(datos.caracteristicas || {}));
    (datos.archivosNuevos || []).forEach((f) => fd.append('imagenes', f));
    const rec = await pb.collection('productos').create(fd);
    await cargarProductos();
    return transformProducto(rec);
  }, [cargarProductos, categorias]);

  const actualizarProducto = useCallback(async (id, datos) => {
    const fd = new FormData();

    console.log("Categorías disponibles en el contexto:", categorias);

    const categoriaSeleccionada = categorias.find(c => c.slug === datos.categoriaSlug);
    
    // Generación de código respetando si el usuario escribió uno o lo dejó vacío para regenerarlo
    const sigla = categoriaSeleccionada?.siglas || 'PROD';
    const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
    const codigoFinal = datos.codigo && datos.codigo.trim() !== '' 
                        ? datos.codigo 
                        : `${sigla.toUpperCase()}-${numeroAleatorio}`;
    
    const nombreCategoria = categoriaSeleccionada ? categoriaSeleccionada.nombre : datos.categoria;
    const slug = datos.slug?.trim() || slugify(datos.nombre);

    texto(fd, 'slug', slug);
    texto(fd, 'nombre', datos.nombre);
    texto(fd, 'categoriaSlug', datos.categoriaSlug);
    texto(fd, 'categoria', nombreCategoria);
    texto(fd, 'descripcion', datos.descripcion);
    texto(fd, 'precio', datos.precio);
    texto(fd, 'tiempoElaboracion', datos.tiempoElaboracion);
    texto(fd, 'disponibilidad', datos.disponibilidad);
    texto(fd, 'codigo', codigoFinal);
    texto(fd, 'orden', datos.orden ?? 0);
    fd.append('caracteristicas', JSON.stringify(datos.caracteristicas || {}));

    if (datos.archivosNuevos && datos.archivosNuevos.length > 0) {
      (datos.archivosNuevos || []).forEach((f) => fd.append('imagenes', f));
    }
    const rec = await pb.collection('productos').update(id, fd);
    await cargarProductos();
    return transformProducto(rec);
  }, [cargarProductos, categorias]);

  const eliminarProducto = useCallback(async (id) => {
    await pb.collection('productos').delete(id);
    setProductos((prev) => prev.filter((p) => p.id !== id));
  }, []);

  /* ------------------------------ CATEGORÍAS ------------------------------ */

  const crearCategoria = useCallback(async (datos) => {
    const fd = new FormData();
    const slug = datos.slug?.trim() || slugify(datos.nombre);
    texto(fd, 'slug', slug);
    texto(fd, 'nombre', datos.nombre);
    texto(fd, 'descripcion', datos.descripcion);
    texto(fd, 'orden', datos.orden ?? 0);
    (datos.archivosNuevos || []).forEach((f) => fd.append('portada', f));
    const rec = await pb.collection('categorias').create(fd);
    await cargarCategorias();
    return transformCategoria(rec);
  }, [cargarCategorias]);

  const actualizarCategoria = useCallback(async (id, datos) => {
    const fd = new FormData();
    const slug = datos.slug?.trim() || slugify(datos.nombre);
    texto(fd, 'slug', slug);
    texto(fd, 'nombre', datos.nombre);
    texto(fd, 'descripcion', datos.descripcion);
    texto(fd, 'orden', datos.orden ?? 0);
    // (datos.imagenesExistentes || []).forEach((fn) => fd.append('portada', fn));
    // (datos.archivosNuevos || []).forEach((f) => fd.append('portada', f));
    if (datos.archivosNuevos && datos.archivosNuevos.length > 0) {
    (datos.archivosNuevos || []).forEach((f) => fd.append('portada', f));
  }
    const rec = await pb.collection('categorias').update(id, fd);
    await cargarCategorias();
    return transformCategoria(rec);
  }, [cargarCategorias]);

  const eliminarCategoria = useCallback(async (id) => {
    await pb.collection('categorias').delete(id);
    setCategorias((prev) => prev.filter((c) => c.id !== id));
  }, []);

  /* ------------------------------ TESTIMONIOS ----------------------------- */

  const crearTestimonio = useCallback(async (datos) => {
    const fd = new FormData();
    texto(fd, 'nombre', datos.nombre);
    texto(fd, 'ciudad', datos.ciudad);
    texto(fd, 'fecha', datos.fecha);
    texto(fd, 'estrellas', datos.estrellas);
    texto(fd, 'resena', datos.resena);
    texto(fd, 'producto', datos.producto);
    texto(fd, 'orden', datos.orden ?? 0);
    if (datos.archivosNuevos?.[0]) fd.append('foto', datos.archivosNuevos[0]);
    const rec = await pb.collection('testimonios').create(fd);
    await cargarTestimonios();
    return transformTestimonio(rec);
  }, [cargarTestimonios]);

  const actualizarTestimonio = useCallback(async (id, datos) => {
    const fd = new FormData();
    texto(fd, 'nombre', datos.nombre);
    texto(fd, 'ciudad', datos.ciudad);
    texto(fd, 'fecha', datos.fecha);
    texto(fd, 'estrellas', datos.estrellas);
    texto(fd, 'resena', datos.resena);
    texto(fd, 'producto', datos.producto);
    texto(fd, 'orden', datos.orden ?? 0);
    // if (datos.archivosNuevos?.[0]) {
    //   fd.append('foto', datos.archivosNuevos[0]);
    // } else if (datos.imagenesExistentes?.[0]) {
    //   fd.append('foto', datos.imagenesExistentes[0]);
    // } else {
    //   fd.append('foto', '');
    // }
    if (datos.archivosNuevos?.[0]) {
    fd.append('foto', datos.archivosNuevos[0]);
    }
    const rec = await pb.collection('testimonios').update(id, fd);
    await cargarTestimonios();
    return transformTestimonio(rec);
  }, [cargarTestimonios]);

  const eliminarTestimonio = useCallback(async (id) => {
    await pb.collection('testimonios').delete(id);
    setTestimonios((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const valor = useMemo(
    () => ({
      productos,
      categorias,
      testimonios,
      cargando,
      error,
      recargar: cargarTodo,
      crearProducto,
      actualizarProducto,
      eliminarProducto,
      crearCategoria,
      actualizarCategoria,
      eliminarCategoria,
      crearTestimonio,
      actualizarTestimonio,
      eliminarTestimonio,
    }),
    [
      productos, categorias, testimonios, cargando, error, cargarTodo,
      crearProducto, actualizarProducto, eliminarProducto,
      crearCategoria, actualizarCategoria, eliminarCategoria,
      crearTestimonio, actualizarTestimonio, eliminarTestimonio,
    ]
  );

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp debe usarse dentro de <AppProvider>');
  return ctx;
}

export default AppContext;
