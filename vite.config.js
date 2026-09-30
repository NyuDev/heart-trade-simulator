import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

/**
 * Pairs config.js with the bundle it was built for.
 *
 * The bundle carries a content hash in its name, config.js does not: it is
 * written after the build, or when the container starts. Without a token the
 * two age independently, and a browser holding a cached config.js would feed a
 * stale endpoint to a fresh bundle. The Docker image solves this with a
 * no-store header; on static hosting the URL is the only lever available.
 */
function fillHtmlPlaceholders(siteUrl) {
  const buildId = Date.now().toString(36);
  return {
    name: 'fill-html-placeholders',
    transformIndexHtml: {
      // After Vite has substituted %BASE_URL%.
      order: 'post',
      handler: (html) =>
        html.replaceAll('%BUILD_ID%', buildId).replaceAll('%SITE_URL%', siteUrl),
    },
  };
}

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

  // Canonical address, used by the link preview tags. A crawler needs an
  // absolute URL, and hard-coding one would follow the bundle to a deployment
  // it does not belong to.
  const siteUrl = env.VITE_SITE_URL ?? 'https://nyudev.github.io/heart-trade-simulator/';

  return {
    base,
    plugins: [vue(), fillHtmlPlaceholders(siteUrl)],
    server: {
      port: Number(env.DEV_PORT ?? 5173),
      proxy: { '/api': { target, changeOrigin: true } },
    },
    build: { outDir: 'dist', sourcemap: false },
  };
});
