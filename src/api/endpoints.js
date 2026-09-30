import { request } from './request.js';

export function fetchQuote(payload, { signal } = {}) {
  return request('/quote', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  });
}

export function fetchLimits({ signal } = {}) {
  return request('/limits', { method: 'GET', signal });
}
