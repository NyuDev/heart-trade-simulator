import { formatNumber, translate as t } from '../i18n/index.js';

/**
 * Hearts per euro, for the line beside the price.
 *
 * Nothing new is disclosed by showing it: the reader typed the amount and the
 * page already prints the hearts, so this is a division they can do in their
 * head. What it buys is the comparison people actually make between one offer
 * and another, without them having to.
 *
 * One decimal: the rate moves slowly across the range, and a second digit
 * would suggest a precision the rounding to whole hearts does not have.
 */
export function heartsPerEuro(quote, amountEur) {
  if (!quote || !(amountEur > 0) || !(quote.hearts > 0)) return '';

  const rate = formatNumber(quote.hearts / amountEur, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return t('quote.rate', { n: rate });
}
