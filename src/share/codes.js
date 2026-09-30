/**
 * Lookup tables for the shareable link.
 *
 * A shared URL is read by people and pasted into chat, so every value gets the
 * shortest unambiguous spelling. These tables are the only place that knows
 * them; encoding and decoding both go through here, which makes an asymmetry
 * between the two impossible.
 */

export const PROFILE_CODES = Object.freeze({ unknown: 'u', regular: 'r', loyal: 'l' });

export const PROFILE_BY_CODE = Object.freeze(
  Object.fromEntries(Object.entries(PROFILE_CODES).map(([name, code]) => [code, name])),
);

/**
 * Factor order, fixed by the API: advance, profile, vouches, speed, then the
 * Shared Spaces tax when the trick is on. Only the reading of each factor
 * travels in the URL; the names are rebuilt from this list.
 */
export const FACTOR_KEYS = Object.freeze(['advance', 'profile', 'vouches', 'speed']);
export const SHARED_FACTOR_KEY = 'sharedTax';

const DIRECTIONS = Object.freeze(['down', 'up']);

/**
 * One factor as a single digit.
 *
 * Strength runs from 0 to 3 and a strength of 0 is always neutral, which
 * leaves 0 for neutral, 1-3 for a discount and 4-6 for a surcharge.
 */
export function factorToDigit({ direction, strength }) {
  if (!strength) return '0';
  const offset = direction === 'up' ? 3 : 0;
  return String(offset + Math.min(3, Math.max(1, strength)));
}

export function digitToFactor(digit) {
  const value = Number(digit);
  if (!Number.isInteger(value) || value < 0 || value > 6) return null;
  if (value === 0) return { direction: 'neutral', strength: 0 };

  return {
    direction: DIRECTIONS[value > 3 ? 1 : 0],
    strength: value > 3 ? value - 3 : value,
  };
}
