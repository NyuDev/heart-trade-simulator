import { translate as t } from '../i18n/index.js';
import { n, unit } from './number.js';
import { formatDurationShort } from './duration.js';

/** The "with 3 vouches" fragment, empty when there are none. */
function vouchesPart(vouches) {
  if (vouches === 0) return '';
  if (vouches >= 5) return t('summary.vouchesMax');
  return t('summary.vouchesPart', { n: unit('vouches', vouches) });
}

const usable = (form, quote) => quote && form.amountEur > 0 && quote.hearts > 0;

/** The parts of a quote both sides of a trade have to agree on. */
function termsOf(form, quote) {
  const { delivery, hearts } = quote;

  return {
    amount: n(form.amountEur),
    hearts: unit('hearts', hearts),
    shared: delivery.sharedSpaces ? t('summary.sharedPart') : '',
  };
}

/**
 * The trade stated without the appraisal that priced it.
 *
 * The full summary names the profile, the vouches and the advance, which are
 * the sharer's reading of the other player. Quoting someone a price should not
 * hand them that reading, so this one stops at what they are being asked to
 * agree to.
 */
export function buildTermsSummary(form, quote) {
  if (!usable(form, quote)) return t('summary.empty');

  const { delivery } = quote;
  const common = termsOf(form, quote);

  if (delivery.mode === 'single') return t('summary.termsSingle', common);

  return t('summary.termsSpread', {
    ...common,
    rate: unit('hearts', delivery.ratePerPlayDay),
    playDays: unit('days', delivery.playDaysPerWeek),
    duration: formatDurationShort(delivery.calendarDays),
  });
}

/** Text ready to paste into a Discord conversation. */
export function buildSummary(form, quote) {
  if (!usable(form, quote)) return t('summary.empty');

  const { advance, delivery } = quote;

  const common = {
    ...termsOf(form, quote),
    advance: unit('days', advance.applied),
    profile: t(`summary.profiles.${form.profile}`),
    vouches: vouchesPart(form.vouches),
  };

  if (delivery.mode === 'single') return t('summary.single', common);

  return t('summary.spread', {
    ...common,
    rate: unit('hearts', delivery.ratePerPlayDay),
    playDays: unit('days', delivery.playDaysPerWeek),
    duration: formatDurationShort(delivery.calendarDays),
  });
}
