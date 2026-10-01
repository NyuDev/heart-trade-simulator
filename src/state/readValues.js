/**
 * Coercing single values out of the hand-edited settings file.
 *
 * Every helper answers "can this be used?" and returns null when it cannot.
 * Nothing here throws: the file is edited in a browser text box by someone not
 * thinking about types, so a wrong value should cost one missing element.
 */

const MAX_URL = 2000;
const MAX_EMAIL = 254;
const TRUTHY = new Set(['true', 'yes', 'on']);

/** A real boolean, or the words someone types meaning the same. */
export function readFlag(value) {
  if (value === true) return true;
  if (typeof value !== 'string') return false;
  return TRUTHY.has(value.trim().toLowerCase());
}

/**
 * Text that may be written once for every language, or per language. Unknown
 * language keys are ignored rather than rejected, so a translation can be
 * written before the language exists.
 */
export function readText(value, limit) {
  const raw = typeof value === 'string' ? { en: value, fr: value } : value;
  if (!raw || typeof raw !== 'object') return null;

  const out = {};
  for (const [code, text] of Object.entries(raw)) {
    if (code.startsWith('_') || typeof text !== 'string') continue;
    const clean = text.replace(/\s+/g, ' ').trim().slice(0, limit);
    if (clean) out[code] = clean;
  }

  return Object.keys(out).length ? out : null;
}

/**
 * The one field that could execute something.
 *
 * Gated on the parsed protocol, never on how the string starts: the URL parser
 * lowercases and normalises the scheme, which defeats `JavaScript:`, leading
 * whitespace and embedded control characters in a single check. Only https
 * survives, so data:, blob: and the rest need no rule of their own.
 */
export function readLink(value) {
  if (typeof value !== 'string' || !value.trim() || value.length > MAX_URL) return null;

  try {
    const url = new URL(value.trim());
    return url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

/**
 * An address, refused unless it is plainly one.
 *
 * `?` is rejected along with the separators: without that, a mailto: can be
 * handed a pre-addressed message through `someone@example.com?bcc=...`.
 */
export function readEmail(value) {
  if (typeof value !== 'string') return null;

  const clean = value.trim();
  if (!clean || clean.length > MAX_EMAIL) return null;
  if (/[\s,;?<>]/.test(clean)) return null;

  const parts = clean.split('@');
  if (parts.length !== 2 || !parts[0] || !parts[1].includes('.')) return null;

  return clean;
}
