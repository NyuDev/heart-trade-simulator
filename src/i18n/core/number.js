import { locale } from './locale.js';

/** Number formatting in the current language. */
export function formatNumber(value, options) {
  return new Intl.NumberFormat(locale.value, options).format(value);
}
