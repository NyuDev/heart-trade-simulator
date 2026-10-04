import { bytesToBase64Url } from './base64url.js';
import { createBitWriter } from './bits.js';
import { CENTI, RESULT_HEADER, RESULT_VERSION } from './layout.js';
import { scaleAmount } from './amount.js';
import { todayIndex } from './day.js';
import { writeVarint } from './varint.js';

/**
 * Turns a quote into a link that states the terms and withholds the reasoning.
 *
 * What goes in is what two people have to agree on to carry a trade out: the
 * sum paid, the number of hearts, how long it runs, at what pace, and how long
 * after the agreement the money is actually spent. That last one matters to
 * whoever is sending the hearts, because a delay means they are paying back
 * something that has not been bought yet.
 *
 * What stays out is what the form asked about the other player — how well they
 * are known, who vouched for them, how many accounts they send from.
 * Those are the sharer's own appraisal, and they are absent from the bytes
 * rather than merely unshown, so no amount of poking at the link recovers them.
 */

const centi = (value) => Math.round(value * CENTI);

export function encodeResult(form, quote, day = todayIndex()) {
  const { delivery } = quote;
  const amount = scaleAmount(form.amountEur);

  const fields = {
    version: RESULT_VERSION,
    amountScale: amount.index,
    playDays: form.playDaysPerWeek,
    shared: form.sharedSpaces ? 1 : 0,
    mode: delivery.mode === 'single' ? 1 : 0,
    // What was asked for, not what the pricing clamped it to: the delay the
    // other side lives with is the real one.
    advanceDays: form.advanceDays,
    hasDate: day === null ? 0 : 1,
  };

  const writer = createBitWriter();
  for (const [name, width] of RESULT_HEADER) writer.write(fields[name], width);

  const bytes = writer.toBytes();
  writeVarint(bytes, amount.scaled);
  writeVarint(bytes, quote.hearts);
  writeVarint(bytes, delivery.calendarDays);
  writeVarint(bytes, centi(delivery.ratePerPlayDay));
  writeVarint(bytes, centi(delivery.smoothedRatePerDay));
  if (fields.hasDate) writeVarint(bytes, day);

  return bytesToBase64Url(bytes);
}
