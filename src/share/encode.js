import { bytesToBase64Url } from './base64url.js';
import { createBitWriter } from './bits.js';
import { MAX_FACTORS, PROFILE_ORDER, factorToCode } from './codes.js';
import { AMOUNT_SCALES, CENTI, HEADER, VERSION } from './layout.js';
import { writeVarint } from './varint.js';

/**
 * Turns a set of settings and the quote they produced into a shareable link.
 *
 * Only the reply travels, never a coefficient: the same price and qualitative
 * factors the API already publishes. A link therefore reveals nothing the
 * recipient could not have obtained by moving the sliders themselves.
 */

/** The coarsest scale that still represents the amount exactly. */
function scaleAmount(amount) {
  for (const [index, scale] of AMOUNT_SCALES.entries()) {
    const scaled = Math.round(amount * scale);
    if (Math.abs(scaled / scale - amount) < 1e-9) return { index, scaled };
  }

  const last = AMOUNT_SCALES.length - 1;
  return { index: last, scaled: Math.round(amount * AMOUNT_SCALES[last]) };
}

const centi = (value) => Math.round(value * CENTI);
const present = (value) => (value === null || value === undefined ? 0 : 1);

export function encodeState(form, quote) {
  const { advance, delivery, hints } = quote;
  const amount = scaleAmount(form.amountEur);
  const codes = quote.factors.map(factorToCode);

  const fields = {
    version: VERSION,
    amountScale: amount.index,
    advanceDays: form.advanceDays,
    profile: Math.max(0, PROFILE_ORDER.indexOf(form.profile)),
    vouches: form.vouches,
    playDays: form.playDaysPerWeek,
    shared: form.sharedSpaces ? 1 : 0,
    mode: delivery.mode === 'single' ? 1 : 0,
    applied: advance.applied,
    capped: advance.capped ? 1 : 0,
    rounding: hints.roundingOverride ? 1 : 0,
    atFloor: hints.atFloor ? 1 : 0,
    atCeiling: hints.atCeiling ? 1 : 0,
    hasOneMore: present(hints.oneMoreDayHearts),
    hasDoubleCap: present(hints.doubleCapacityHearts),
    hasSharedExtra: present(hints.sharedExtraHearts),
  };

  // Always five slots: a quote without the Shared Spaces tax leaves the last
  // one at zero, and the reader knows from `shared` whether to use it.
  for (let slot = 0; slot < MAX_FACTORS; slot += 1) fields[`factor${slot}`] = codes[slot] ?? 0;

  const writer = createBitWriter();
  for (const [name, width] of HEADER) writer.write(fields[name], width);

  const bytes = writer.toBytes();
  writeVarint(bytes, amount.scaled);
  writeVarint(bytes, form.capacityPerPlayDay);
  writeVarint(bytes, quote.hearts);
  writeVarint(bytes, delivery.calendarDays);
  writeVarint(bytes, centi(delivery.ratePerPlayDay));
  writeVarint(bytes, centi(delivery.smoothedRatePerDay));
  if (fields.hasOneMore) writeVarint(bytes, centi(hints.oneMoreDayHearts));
  if (fields.hasDoubleCap) writeVarint(bytes, centi(hints.doubleCapacityHearts));
  if (fields.hasSharedExtra) writeVarint(bytes, hints.sharedExtraHearts);

  return bytesToBase64Url(bytes);
}
