import { apiBaseUrl, isApiConfigured } from './baseUrl.js';
import { ApiError } from './ApiError.js';

const DEFAULT_RETRY_SECONDS = 10;

/** Turns a failed response into a typed ApiError. */
async function toError(response) {
  const body = await response.json().catch(() => ({}));

  if (response.status === 429) {
    const header = Number(response.headers.get('retry-after'));
    return new ApiError(body.message ?? 'Too many requests.', {
      status: 429,
      code: 'rate_limited',
      retryAfterSeconds:
        body.retryAfterSeconds ?? (Number.isFinite(header) ? header : DEFAULT_RETRY_SECONDS),
    });
  }

  return new ApiError(body.error === 'invalid_input' ? 'Invalid input.' : 'Quote failed.', {
    status: response.status,
    code: body.error ?? 'unknown',
    issues: body.issues,
  });
}

/** The only HTTP call of the interface. AbortError passes through, it is not a failure. */
export async function request(path, options) {
  if (!isApiConfigured()) {
    throw new ApiError('Pricing API not configured for this deployment.', {
      code: 'not_configured',
    });
  }

  let response;

  try {
    response = await fetch(`${apiBaseUrl()}${path}`, options);
  } catch (cause) {
    if (cause?.name === 'AbortError') throw cause;
    throw new ApiError('Cannot reach the server.', { code: 'network_error' });
  }

  if (!response.ok) throw await toError(response);

  return response.json().catch(() => ({}));
}
