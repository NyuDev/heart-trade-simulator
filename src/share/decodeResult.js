import { DEFAULT_LIMITS } from '../state/defaultLimits.js';
import { FACTOR_KEYS, SHARED_FACTOR_KEY, digitToFactor } from './codes.js';
import { RESULT_VERSION } from './encode.js';
import { boundedInt, boundedNumber, optionalNumber } from './guards.js';

/** Reads the packed reply out of a shared link. */

const RESULT_FIELDS = 12;

function decodeFactors(digits, sharedSpaces) {
  const keys = sharedSpaces ? [...FACTOR_KEYS, SHARED_FACTOR_KEY] : FACTOR_KEYS;
  if (!digits || digits.length !== keys.length) return null;

  const factors = [];
  for (const [index, key] of keys.entries()) {
    const reading = digitToFactor(digits[index]);
    if (!reading) return null;
    factors.push({ key, ...reading });
  }

  return factors;
}

/**
 * The fields the form already carries are not repeated in the link: play days,
 * Shared Spaces and the requested advance are read back from the settings, so
 * a link can never describe a delivery that contradicts its own form.
 */
export function decodeResult(raw, form) {
  if (!raw) return null;

  const parts = raw.split('_');
  if (parts.length !== RESULT_FIELDS || parts[0] !== RESULT_VERSION) return null;

  const [, hearts, mode, days, rate, smoothed, applied, oneMore, doubled, extra, flags, digits] =
    parts;

  if (!/^[01]{4}$/.test(flags)) return null;

  // Generous ceilings. They exist to refuse NaN, Infinity and negatives, not
  // to second-guess the API: at the top of the range a trade can legitimately
  // span hundreds of thousands of calendar days.
  const numbers = {
    hearts: boundedInt(hearts, { min: 0, max: 100_000_000 }),
    calendarDays: boundedInt(days, { min: 0, max: 100_000_000 }),
    ratePerPlayDay: boundedNumber(rate, { min: 0, max: 10_000_000 }),
    smoothedRatePerDay: boundedNumber(smoothed, { min: 0, max: 10_000_000 }),
    applied: boundedInt(applied, DEFAULT_LIMITS.advanceDays),
  };
  if (Object.values(numbers).some((value) => value === null)) return null;

  const hints = [oneMore, doubled, extra].map(optionalNumber);
  if (hints.some((hint) => !hint.ok)) return null;

  const factors = decodeFactors(digits, form.sharedSpaces);
  if (!factors) return null;

  // An applied advance can only ever be shorter than the one asked for.
  if (numbers.applied > form.advanceDays) return null;

  return {
    hearts: numbers.hearts,
    delivery: {
      mode: mode === '1' ? 'single' : 'spread',
      calendarDays: numbers.calendarDays,
      ratePerPlayDay: numbers.ratePerPlayDay,
      smoothedRatePerDay: numbers.smoothedRatePerDay,
      playDaysPerWeek: form.playDaysPerWeek,
      sharedSpaces: form.sharedSpaces,
    },
    advance: {
      requested: form.advanceDays,
      applied: numbers.applied,
      capped: flags[0] === '1',
    },
    factors,
    hints: {
      oneMoreDayHearts: hints[0].value,
      doubleCapacityHearts: hints[1].value,
      sharedExtraHearts: hints[2].value,
      roundingOverride: flags[1] === '1',
      atFloor: flags[2] === '1',
      atCeiling: flags[3] === '1',
    },
  };
}
