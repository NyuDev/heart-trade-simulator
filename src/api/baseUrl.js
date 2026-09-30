const DEFAULT_BASE = '/api';
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]', '']);

/**
 * Root of the API, read at runtime.
 *
 * Written into config.js when the container starts, or by the deploy workflow,
 * so changing endpoint needs no rebuild.
 */
export function apiBaseUrl() {
  const runtime = globalThis.__SIMULATEUR_CONFIG__?.apiBaseUrl;
  return typeof runtime === 'string' && runtime.length > 0 ? runtime : DEFAULT_BASE;
}

/**
 * Can the API be reached from this deployment?
 *
 * On static hosting the default value would point at a path that does not
 * exist, so it is better to say it plainly than to let it look like a failed
 * calculation. Locally that same path is proxied by Vite to the dev server, so
 * it stays valid.
 */
export function isApiConfigured() {
  if (apiBaseUrl() !== DEFAULT_BASE) return true;
  return LOCAL_HOSTS.has(globalThis.location?.hostname ?? '');
}
