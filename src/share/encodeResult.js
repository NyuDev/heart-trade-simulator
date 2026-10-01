import { bytesToBase64Url } from './base64url.js';
import { createBitWriter } from './bits.js';
import { CENTI, RESULT_HEADER, RESULT_VERSION } from './layout.js';
import { scaleAmount } from './amount.js';
import { writeVarint } from './varint.js';

/**
 * Turns a quote into a link that states the terms and withholds the reasoning.
 *
 * What goes in is what two people have to agree on to carry a trade out: the
 * sum paid, the number of hearts, how long it runs and at what pace. What
 * stays out is everything the form asked about the other player — how well
 * they are known, who vouched for them, how long they were asked to wait, how
 * many hearts a day they can manage. Those are the sharer's own appraisal, and
 * they are absent from the bytes rather than merely unshown, so no amount of
 * poking at the link recovers them.
 */

const centi = (value) => Math.round(value * CENTI);

export function encodeResult(form, quote) {
  const { delivery } = quote;
  const amount = scaleAmount(form.amountEur);

  const fields = {
    version: RESULT_VERSION,
    amountScale: amount.index,
    playDays: form.playDaysPerWeek,
    shared: form.sharedSpaces ? 1 : 0,
    mode: delivery.mode === 'single' ? 1 : 0,
  };

  const writer = createBitWriter();
  for (const [name, width] of RESULT_HEADER) writer.write(fields[name], width);

  const bytes = writer.toBytes();
  writeVarint(bytes, amount.scaled);
  writeVarint(bytes, quote.hearts);
  writeVarint(bytes, delivery.calendarDays);
  writeVarint(bytes, centi(delivery.ratePerPlayDay));
  writeVarint(bytes, centi(delivery.smoothedRatePerDay));

  return bytesToBase64Url(bytes);
}
