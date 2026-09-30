import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // In development Vite proxies /api to the Node server, so the browser only
  // ever sees one origin, exactly like behind the reverse proxy in production.
  // Nothing to configure for CORS while working.
  const target = env.DEV_API_TARGET ?? 'http://127.0.0.1:3001';

  // On GitHub Pages the site is served from /<repository>/ rather than the
  // root, and without this base every asset would point to the wrong place.
  // The workflow fills it in; locally it stays at the root.
  const base = env.VITE_BASE ?? '/';

  return {
    base,
    plugins: [vue()],
    server: {
      port: Number(env.DEV_PORT ?? 5173),
      proxy: { '/api': { target, changeOrigin: true } },
    },
    build: { outDir: 'dist', sourcemap: false },
  };
});
