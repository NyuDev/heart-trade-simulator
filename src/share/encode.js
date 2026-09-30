import { FACTOR_KEYS, PROFILE_CODES, SHARED_FACTOR_KEY, factorToDigit } from './codes.js';

/**
 * Turns a set of inputs and the quote they produced into a fragment.
 *
 * Only the reply is carried, never a coefficient: the same qualitative
 * factors the API already publishes. A shared link therefore reveals nothing
 * the recipient could not have obtained by moving the sliders themselves.
 */

/** Current shape of the result block. Anything else is refused on reading. */
export const RESULT_VERSION = '1';

const flag = (value) => (value ? '1' : '0');
const optional = (value) => (value === null || value === undefined ? '' : String(value));

/**
 * The reply, packed by position.
 *
 * Positional rather than named: this block is machine-read, and a URL that
 * people paste into a conversation is worth keeping short. The version in
 * front is what allows the format to change later without old links starting
 * to lie.
 */
function encodeResult(quote) {
  const { advance, delivery, hints } = quote;

  const factors = quote.factors.map(factorToDigit).join('');
  const flags = [advance.capped, hints.roundingOverride, hints.atFloor, hints.atCeiling]
    .map(flag)
    .join('');

  return [
    RESULT_VERSION,
    quote.hearts,
    delivery.mode === 'single' ? '1' : '0',
    delivery.calendarDays,
    delivery.ratePerPlayDay,
    delivery.smoothedRatePerDay,
    advance.applied,
    optional(hints.oneMoreDayHearts),
    optional(hints.doubleCapacityHearts),
    optional(hints.sharedExtraHearts),
    flags,
    factors,
  ].join('_');
}

/**
 * The full fragment, inputs in readable form and the reply packed after them.
 *
 * Passing no quote yields the settings alone: the link still reopens the right
 * configuration, it is simply recomputed on arrival.
 */
export function encodeState(form, quote = null) {
  const params = new URLSearchParams();

  params.set('a', String(form.amountEur));
  params.set('d', String(form.advanceDays));
  params.set('p', PROFILE_CODES[form.profile] ?? PROFILE_CODES.regular);
  params.set('v', String(form.vouches));
  params.set('c', String(form.capacityPerPlayDay));
  params.set('w', String(form.playDaysPerWeek));
  if (form.sharedSpaces) params.set('s', '1');

  if (quote) params.set('r', encodeResult(quote));

  return params.toString();
}

export { FACTOR_KEYS, SHARED_FACTOR_KEY };
