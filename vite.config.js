import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

import { DEFAULT_SITE_URL } from './scripts/site.mjs';

/**
 * Pairs config.js with the bundle it was built for, and fills in the two
 * absolute addresses the document needs: its own, and the site root the
 * breadcrumb climbs to.
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
        html
          .replaceAll('%BUILD_ID%', buildId)
          .replaceAll('%SITE_URL%', siteUrl)
          .replaceAll('%SITE_ORIGIN%', new URL(siteUrl).origin),
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

  // Canonical address, used by the link preview tags and the breadcrumb. A
  // crawler needs an absolute URL, and hard-coding one would follow the bundle
  // to a deployment it does not belong to. The default lives in one module so
  // the generators cannot drift away from it.
  // Both generators normalise the trailing slash; this did not, and every
  // address here is built by concatenation, so a VITE_SITE_URL without one
  // produced "...simulatorog.png" and an #app id that disagreed with the
  // one the FAQ pages emit. Empty is caught here too: further down this
  // value goes through new URL(), whose failure says only "Invalid URL".
  const configured = env.VITE_SITE_URL?.trim() || DEFAULT_SITE_URL;
  const siteUrl = configured.endsWith('/') ? configured : `${configured}/`;
  if (!URL.canParse(siteUrl)) {
    throw new Error(`VITE_SITE_URL is not a valid absolute address: ${JSON.stringify(configured)}`);
  }

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
