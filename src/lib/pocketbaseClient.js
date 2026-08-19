import PocketBase from 'pocketbase';

// Cambia esta URL por la dirección de tu servidor de PocketBase (si está en producción o local)
const url = import.meta.env.VITE_PB_URL || 'http://127.0.0.1:8090';
const pb = new PocketBase(url);

// Opcional: deshabilita la cancelación automática de peticiones si te llega a dar problemas
pb.autoCancellation(false);

export default pb;