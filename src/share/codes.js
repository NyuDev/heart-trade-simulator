/**
 * Value tables for the shareable link.
 *
 * Encoding and decoding both go through here, which makes an asymmetry between
 * the two impossible.
 */

/** Position is the encoded value, so this order is part of the format. */
export const PROFILE_ORDER = Object.freeze(['unknown', 'regular', 'loyal']);

/**
 * Factor order, fixed by the API: advance, profile, vouches, speed, then the
 * Shared Spaces tax when the trick is on. Only the reading of each factor
 * travels in the link; the names are rebuilt from this list.
 */
export const FACTOR_KEYS = Object.freeze(['advance', 'profile', 'vouches', 'speed']);
export const SHARED_FACTOR_KEY = 'sharedTax';
export const MAX_FACTORS = FACTOR_KEYS.length + 1;

const DIRECTIONS = Object.freeze(['down', 'up']);

/**
 * One factor as a three-bit number.
 *
 * Strength runs from 0 to 3 and a strength of 0 is always neutral, which
 * leaves 0 for neutral, 1-3 for a discount and 4-6 for a surcharge.
 */
export function factorToCode({ direction, strength }) {
  if (!strength) return 0;
  const offset = direction === 'up' ? 3 : 0;
  return offset + Math.min(3, Math.max(1, strength));
}

export function codeToFactor(code) {
  if (!Number.isInteger(code) || code < 0 || code > 6) return null;
  if (code === 0) return { direction: 'neutral', strength: 0 };

  return {
    direction: DIRECTIONS[code > 3 ? 1 : 0],
    strength: code > 3 ? code - 3 : code,
  };
}
