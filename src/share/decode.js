import { DEFAULT_LIMITS } from '../state/defaultLimits.js';
import { base64UrlToBytes } from './base64url.js';
import { createBitReader } from './bits.js';
import { PROFILE_ORDER } from './codes.js';
import { decodeResult } from './decodeResult.js';
import { decodeTerms } from './decodeTerms.js';
import {
  AMOUNT_SCALES,
  HEADER,
  HEADER_BYTES,
  RESULT_VERSION,
  RESULT_VERSION_V2,
  VERSION,
  VERSION_BITS,
} from './layout.js';
import { createVarintReader } from './varint.js';

/**
 * Reads a link written by encode.js.
 *
 * Everything here is hostile input: a link can be hand-edited, truncated by a
 * chat client, or crafted. Every field is checked and the slightest doubt
 * returns null, which leaves the page on its defaults rather than showing
 * settings nobody chose.
 *
 * A link written in a future format is refused the same way. That is the
 * deliberate trade for a short link: the format is versioned as a whole, so an
 * unknown version is ignored rather than misread.
 */

const within = (value, { min, max }) => value >= min && value <= max;

function decodeForm(fields, varints) {
  const scale = AMOUNT_SCALES[fields.amountScale];
  const scaled = varints.read();
  const capacity = varints.read();

  if (scale === undefined || scaled === null || capacity === null) return null;

  const amountEur = scaled / scale;
  const profile = PROFILE_ORDER[fields.profile];

  if (!profile) return null;
  if (!within(amountEur, DEFAULT_LIMITS.amount)) return null;
  if (!within(fields.advanceDays, DEFAULT_LIMITS.advanceDays)) return null;
  if (!within(fields.vouches, DEFAULT_LIMITS.vouches)) return null;
  if (!within(capacity, DEFAULT_LIMITS.capacityPerPlayDay)) return null;
  if (!within(fields.playDays, DEFAULT_LIMITS.playDaysPerWeek)) return null;

  // An applied advance can only ever be shorter than the one asked for.
  if (fields.applied > fields.advanceDays) return null;

  return {
    amountEur,
    advanceDays: fields.advanceDays,
    profile,
    vouches: fields.vouches,
    capacityPerPlayDay: capacity,
    playDaysPerWeek: fields.playDays,
    sharedSpaces: Boolean(fields.shared),
  };
}

export function decodeState(fragment) {
  const bytes = base64UrlToBytes(fragment);
  if (!bytes || bytes.length === 0) return null;

  // The version leads both layouts and is the same width in each, so which
  // shape is being held can be settled before committing to either.
  const version = createBitReader(bytes).read(VERSION_BITS);
  if (version === RESULT_VERSION || version === RESULT_VERSION_V2) {
    return decodeTerms(bytes, version);
  }
  if (version !== VERSION) return null;
  if (bytes.length <= HEADER_BYTES) return null;

  const reader = createBitReader(bytes);
  const fields = {};
  for (const [name, width] of HEADER) fields[name] = reader.read(width);

  const varints = createVarintReader(bytes, HEADER_BYTES);

  const form = decodeForm(fields, varints);
  if (!form) return null;

  const quote = decodeResult(fields, form, varints);
  return quote ? { kind: 'full', form, quote } : null;
}
