/**
 * The shape of a shared link, in one table.
 *
 * Writing and reading both walk this list in order, so the two can never drift
 * apart: adding a field in the wrong place breaks both at once rather than
 * producing links that decode into something plausible but wrong.
 */

export const VERSION = 1;

/**
 * The second kind of link: the terms of the trade and nothing else.
 *
 * A full link carries the settings that produced the price, which include a
 * judgement about the other player — how well they are known, how many people
 * vouched for them, how long they are being asked to wait. That belongs to the
 * person who filled the form in, not to whoever they quote a price to. This
 * version carries what both sides of a trade already have to agree on, and
 * leaves the rest out of the link entirely rather than merely out of sight.
 */
export const RESULT_VERSION = 2;

/** Fixed-width part: every small field, packed into six bytes. */
export const HEADER = Object.freeze([
  ['version', 3],
  ['amountScale', 2],
  ['advanceDays', 5],
  ['profile', 2],
  ['vouches', 3],
  ['playDays', 3],
  ['shared', 1],
  ['mode', 1],
  ['applied', 5],
  ['capped', 1],
  ['rounding', 1],
  ['atFloor', 1],
  ['atCeiling', 1],
  ['hasOneMore', 1],
  ['hasDoubleCap', 1],
  ['hasSharedExtra', 1],
  ['factor0', 3],
  ['factor1', 3],
  ['factor2', 3],
  ['factor3', 3],
  ['factor4', 3],
]);

/** Fixed-width part of a terms-only link. */
export const RESULT_HEADER = Object.freeze([
  ['version', 3],
  ['amountScale', 2],
  ['playDays', 3],
  ['shared', 1],
  ['mode', 1],
]);

const bytesFor = (header) => Math.ceil(header.reduce((sum, [, width]) => sum + width, 0) / 8);

export const HEADER_BYTES = bytesFor(HEADER);
export const RESULT_HEADER_BYTES = bytesFor(RESULT_HEADER);

/**
 * The version field sits first and is the same width in both layouts, so a
 * reader can learn which shape it is holding before committing to either.
 */
export const VERSION_BITS = HEADER[0][1];

/**
 * How the amount is scaled before becoming an integer.
 *
 * A whole number of euros is the common case and costs one byte; cents and
 * thousandths are there so a typed amount is never silently rounded. The index
 * travels in the header.
 */
export const AMOUNT_SCALES = Object.freeze([1, 100, 1000]);

/** Hearts and rates keep two decimals, matching what the API publishes. */
export const CENTI = 100;
