/**
 * The shape of a shared link, in one table.
 *
 * Writing and reading both walk this list in order, so the two can never drift
 * apart: adding a field in the wrong place breaks both at once rather than
 * producing links that decode into something plausible but wrong.
 */

export const VERSION = 1;

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

export const HEADER_BYTES = Math.ceil(HEADER.reduce((sum, [, width]) => sum + width, 0) / 8);

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
