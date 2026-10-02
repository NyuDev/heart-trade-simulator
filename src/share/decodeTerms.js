import { DEFAULT_LIMITS } from '../state/defaultLimits.js';
import { createBitReader } from './bits.js';
import { MAX_COUNT } from './decodeResult.js';
import {
  AMOUNT_SCALES,
  CENTI,
  RESULT_HEADER,
  RESULT_HEADER_BYTES,
  RESULT_HEADER_V2,
  RESULT_HEADER_V2_BYTES,
  RESULT_VERSION_V2,
} from './layout.js';
import { createVarintReader } from './varint.js';
import { MAX_DAY, dateFromIndex } from './day.js';

/**
 * Reads a link written by encodeResult.js: the terms, without the reasoning.
 *
 * The settings that are missing from this kind of link are missing from the
 * bytes, so there is nothing here that attempts to guess them back. What comes
 * out describes a trade; it does not describe a form, and the interface shows
 * it as such.
 */

const within = (value, { min, max }) => value >= min && value <= max;
const sane = (value) => value !== null && value <= MAX_COUNT;

export function decodeTerms(bytes, version) {
  const legacy = version === RESULT_VERSION_V2;
  const header = legacy ? RESULT_HEADER_V2 : RESULT_HEADER;
  const headerBytes = legacy ? RESULT_HEADER_V2_BYTES : RESULT_HEADER_BYTES;

  if (bytes.length <= headerBytes) return null;

  const reader = createBitReader(bytes);
  const fields = {};
  for (const [name, width] of header) fields[name] = reader.read(width);

  const scale = AMOUNT_SCALES[fields.amountScale];
  if (scale === undefined) return null;

  const varints = createVarintReader(bytes, headerBytes);
  const scaled = varints.read();
  const hearts = varints.read();
  const calendarDays = varints.read();
  const rate = varints.read();
  const smoothed = varints.read();
  // Last of all, so a link written before dates existed simply ends here.
  const day = fields.hasDate ? varints.read() : null;

  if (scaled === null) return null;
  if (fields.hasDate && (day === null || day > MAX_DAY)) return null;
  if (!sane(hearts) || !sane(calendarDays) || !sane(rate) || !sane(smoothed)) return null;

  // Nothing may be left over: trailing bytes mean the link was tampered with
  // or spliced, and a partial read would be worse than no link at all.
  if (!varints.exhausted) return null;

  const amountEur = scaled / scale;
  if (!within(amountEur, DEFAULT_LIMITS.amount)) return null;
  if (!within(fields.playDays, DEFAULT_LIMITS.playDaysPerWeek)) return null;

  // A link that predates the field cannot say what the delay was, and saying
  // "none" on its behalf would be stating a term nobody wrote down.
  const advanceDays = legacy ? null : fields.advanceDays;
  if (advanceDays !== null && !within(advanceDays, DEFAULT_LIMITS.advanceDays)) return null;

  const sharedSpaces = Boolean(fields.shared);

  return {
    kind: 'result',
    // Only what a counterparty is being told about anyway. There is
    // deliberately no profile, no vouches and no capacity.
    form: { amountEur, advanceDays, playDaysPerWeek: fields.playDays, sharedSpaces },
    quote: {
      createdOn: day === null ? null : dateFromIndex(day),
      hearts,
      delivery: {
        mode: fields.mode ? 'single' : 'spread',
        calendarDays,
        ratePerPlayDay: rate / CENTI,
        smoothedRatePerDay: smoothed / CENTI,
        playDaysPerWeek: fields.playDays,
        sharedSpaces,
      },
    },
  };
}
