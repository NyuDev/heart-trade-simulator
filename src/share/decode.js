import { DEFAULT_LIMITS } from '../state/defaultLimits.js';
import { PROFILE_BY_CODE } from './codes.js';
import { decodeResult } from './decodeResult.js';
import { boundedInt, boundedNumber } from './guards.js';

/** Reads a fragment written by encode.js, refusing anything malformed. */

function decodeForm(params) {
  const amountEur = boundedNumber(params.get('a'), DEFAULT_LIMITS.amount);
  const advanceDays = boundedInt(params.get('d'), DEFAULT_LIMITS.advanceDays);
  const profile = PROFILE_BY_CODE[params.get('p')];
  const vouches = boundedInt(params.get('v'), DEFAULT_LIMITS.vouches);
  const capacity = boundedInt(params.get('c'), DEFAULT_LIMITS.capacityPerPlayDay);
  const playDays = boundedInt(params.get('w'), DEFAULT_LIMITS.playDaysPerWeek);

  if (amountEur === null || advanceDays === null || !profile) return null;
  if (vouches === null || capacity === null || playDays === null) return null;

  return {
    amountEur,
    advanceDays,
    profile,
    vouches,
    capacityPerPlayDay: capacity,
    playDaysPerWeek: playDays,
    sharedSpaces: params.get('s') === '1',
  };
}

/**
 * Returns the settings and, when the link carried one, the quote that goes
 * with them.
 *
 * Readable settings with an unreadable result still count as a win: the form
 * opens filled in and the price is simply recomputed, which is the ordinary
 * path anyway.
 */
export function decodeState(fragment) {
  if (!fragment) return null;

  let params;
  try {
    params = new URLSearchParams(fragment);
  } catch {
    return null;
  }

  const form = decodeForm(params);
  if (!form) return null;

  return { form, quote: decodeResult(params.get('r'), form) };
}
