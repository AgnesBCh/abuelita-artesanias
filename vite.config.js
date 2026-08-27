import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

function apiLocalPlugin() {
  const rutas = {
    '/api/ai/chat': './api/ai/chat.js',
    '/api/ai/health': './api/ai/health.js',
    '/api/ai/index': './api/ai/index.js',
  };

  return {
    name: 'api-local-lira',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = new URL(req.url, 'http://localhost').pathname;
        const modulo = rutas[pathname];
        if (!modulo) return next();

        try {
          const partes = [];
          for await (const parte of req) partes.push(parte);
          const texto = Buffer.concat(partes).toString('utf8');
          req.body = texto ? JSON.parse(texto) : {};
          res.status = (codigo) => {
            res.statusCode = codigo;
            return res;
          };
          const { default: handler } = await import(`${modulo}?t=${Date.now()}`);
          await handler(req, res);
        } catch (error) {
          console.error('[API local]', error);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
          }
          if (!res.writableEnded) res.end(JSON.stringify({ error: 'Error en la API local.', detail: error.message }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Vite no expone estas variables al navegador: solo las carga en el proceso
  // Node que ejecuta el middleware local de /api.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
  plugins: [react(), apiLocalPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  };
});
