import { CENTI } from './layout.js';
import { FACTOR_KEYS, MAX_FACTORS, SHARED_FACTOR_KEY, codeToFactor } from './codes.js';
import { MAX_DAY, dateFromIndex } from './day.js';

/**
 * Rebuilds the quote from a link.
 *
 * The ceilings below exist to refuse nonsense, not to second-guess the API: at
 * the top of its range a trade can legitimately run to hundreds of thousands
 * of calendar days.
 */

export const MAX_COUNT = 100_000_000;

const sane = (value, max) => value !== null && value <= max;

function readFactors(fields, sharedSpaces) {
  const keys = sharedSpaces ? [...FACTOR_KEYS, SHARED_FACTOR_KEY] : FACTOR_KEYS;
  const factors = [];

  for (const [index, key] of keys.entries()) {
    const reading = codeToFactor(fields[`factor${index}`]);
    if (!reading) return null;
    factors.push({ key, ...reading });
  }

  // An unused slot must be empty: a link claiming a tax it does not apply is
  // malformed, not merely surprising.
  for (let slot = keys.length; slot < MAX_FACTORS; slot += 1) {
    if (fields[`factor${slot}`] !== 0) return null;
  }

  return factors;
}

/**
 * Play days, Shared Spaces and the requested advance are not repeated in the
 * link: they are read back from the settings, so a link can never describe a
 * delivery that contradicts its own form.
 */
export function decodeResult(fields, form, varints) {
  const hearts = varints.read();
  const calendarDays = varints.read();
  const rate = varints.read();
  const smoothed = varints.read();

  if (!sane(hearts, MAX_COUNT) || !sane(calendarDays, MAX_COUNT)) return null;
  if (!sane(rate, MAX_COUNT) || !sane(smoothed, MAX_COUNT)) return null;

  const oneMore = fields.hasOneMore ? varints.read() : null;
  const doubleCap = fields.hasDoubleCap ? varints.read() : null;
  const sharedExtra = fields.hasSharedExtra ? varints.read() : null;

  if (fields.hasOneMore && !sane(oneMore, MAX_COUNT)) return null;
  if (fields.hasDoubleCap && !sane(doubleCap, MAX_COUNT)) return null;
  if (fields.hasSharedExtra && !sane(sharedExtra, MAX_COUNT)) return null;

  // Last of all, so a link written before dates existed simply ends here.
  const day = fields.hasDate ? varints.read() : null;
  if (fields.hasDate && !sane(day, MAX_DAY)) return null;

  // Nothing may be left over: trailing bytes mean the link was tampered with
  // or spliced, and a partial read would be worse than no link at all.
  if (!varints.exhausted) return null;

  const factors = readFactors(fields, form.sharedSpaces);
  if (!factors) return null;

  return {
    createdOn: day === null ? null : dateFromIndex(day),
    hearts,
    delivery: {
      mode: fields.mode ? 'single' : 'spread',
      calendarDays,
      ratePerPlayDay: rate / CENTI,
      smoothedRatePerDay: smoothed / CENTI,
      playDaysPerWeek: form.playDaysPerWeek,
      sharedSpaces: form.sharedSpaces,
    },
    advance: {
      requested: form.advanceDays,
      applied: fields.applied,
      capped: Boolean(fields.capped),
    },
    factors,
    hints: {
      oneMoreDayHearts: oneMore === null ? null : oneMore / CENTI,
      doubleCapacityHearts: doubleCap === null ? null : doubleCap / CENTI,
      sharedExtraHearts: sharedExtra,
      roundingOverride: Boolean(fields.rounding),
      atFloor: Boolean(fields.atFloor),
      atCeiling: Boolean(fields.atCeiling),
    },
  };
}
