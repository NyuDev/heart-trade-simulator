// Default: the same origin as the interface, which matches the nominal
// deployment behind a reverse proxy. The Docker container rewrites this file
// on startup from API_BASE_URL.
window.__SIMULATOR_CONFIG__ = { apiBaseUrl: '/api' };
