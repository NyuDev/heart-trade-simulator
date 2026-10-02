import { bytesToBase64Url } from './base64url.js';
import { createBitWriter } from './bits.js';
import { MAX_FACTORS, PROFILE_ORDER, factorToCode } from './codes.js';
import { CENTI, HEADER, VERSION } from './layout.js';
import { scaleAmount } from './amount.js';
import { todayIndex } from './day.js';
import { writeVarint } from './varint.js';

/**
 * Turns a set of settings and the quote they produced into a shareable link.
 *
 * Only the reply travels, never a coefficient: the same price and qualitative
 * factors the API already publishes. A link therefore reveals nothing the
 * recipient could not have obtained by moving the sliders themselves.
 */

const centi = (value) => Math.round(value * CENTI);
const present = (value) => (value === null || value === undefined ? 0 : 1);

export function encodeState(form, quote, day = todayIndex()) {
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
    hasDate: day === null ? 0 : 1,
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
  if (fields.hasDate) writeVarint(bytes, day);

  return bytesToBase64Url(bytes);
}
