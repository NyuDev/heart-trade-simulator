import { AMOUNT_SCALES } from './layout.js';

/**
 * The coarsest scale that still represents the amount exactly.
 *
 * A whole number of euros is the common case and costs one byte; cents and
 * thousandths are there so a typed amount is never silently rounded.
 */
export function scaleAmount(amount) {
  for (const [index, scale] of AMOUNT_SCALES.entries()) {
    const scaled = Math.round(amount * scale);
    if (Math.abs(scaled / scale - amount) < 1e-9) return { index, scaled };
  }

  const last = AMOUNT_SCALES.length - 1;
  return { index: last, scaled: Math.round(amount * AMOUNT_SCALES[last]) };
}
