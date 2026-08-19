import { useApp } from '@/context/AppContext';

/**
 * Hook del catálogo. Lee productos y categorías desde el estado global
 * (AppContext), respaldado por PocketBase en la nube con sincronización
 * en tiempo real.
 */
export function useCatalogo() {
  const { productos, categorias, cargando, error } = useApp();
  return { productos, categorias, cargando, error };
}

export default useCatalogo;
