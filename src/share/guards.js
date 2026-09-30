/**
 * Range checks for values arriving from a URL.
 *
 * A fragment can be hand-typed, truncated by a chat client, or crafted on
 * purpose, so nothing read from one is trusted. Each guard returns null on the
 * slightest doubt, which the callers turn into "ignore this link".
 */

export function boundedInt(raw, { min, max }) {
  const value = Number(raw);
  if (!Number.isInteger(value) || value < min || value > max) return null;
  return value;
}

export function boundedNumber(raw, { min, max }) {
  const value = Number(raw);
  if (!Number.isFinite(value) || value < min || value > max) return null;
  return value;
}

/**
 * A positive number, or null when the field was deliberately left empty.
 *
 * The distinction matters: the API returns null for a hint that does not
 * apply, and an absent hint is not the same as a malformed one.
 */
export function optionalNumber(raw) {
  if (raw === '') return { ok: true, value: null };

  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) return { ok: false };

  return { ok: true, value };
}
