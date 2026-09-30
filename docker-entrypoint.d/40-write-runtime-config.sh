#!/bin/sh
# Writes the runtime configuration of the interface from the environment.
# The nginx image automatically runs any script placed in /docker-entrypoint.d/
# before starting the server.
#
# This is what allows changing endpoint without rebuilding the bundle: one
# image, several deployments.
set -eu

target=/usr/share/nginx/html/config.js
api_base_url="${API_BASE_URL:-/api}"

# Minimal escaping: the value ends up inside a JavaScript string.
escaped=$(printf '%s' "$api_base_url" | sed 's/\/\\/g; s/"/\\"/g')

cat > "$target" <<INNER
window.__SIMULATEUR_CONFIG__ = { apiBaseUrl: "${escaped}" };
INNER

echo "[entrypoint] apiBaseUrl = ${api_base_url}"
