import { formatNumber, translate as t } from '../i18n/index.js';

export const n = (value) => formatNumber(value);

/**
 * Agreed unit.
 *
 * `count` picks the form, since the rules differ: English pluralises from 1.5,
 * French only from 2. `n` carries the number already formatted for the
 * language.
 */
export const unit = (key, count) => t(`units.${key}`, { n: n(count), count });
