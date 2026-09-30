import { translate as t } from '../i18n/index.js';
import { unit } from './number.js';

/**
 * Difference in hearts, rounded to a whole once it passes one heart.
 *
 * Below a tenth of a heart we return null: showing "-0 hearts" would suggest a
 * dead lever, when it is in fact still moving.
 */
export function formatHeartDelta(value) {
  if (value === null || value <= 0.05) return null;

  const rounded = Math.round(value);
  return t('units.minus', { value: value >= 1 ? unit('hearts', rounded) : unit('hearts', value) });
}
