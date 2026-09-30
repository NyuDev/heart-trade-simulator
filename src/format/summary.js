import { translate as t } from '../i18n/index.js';
import { n, unit } from './number.js';
import { formatDurationShort } from './duration.js';

/** The "with 3 vouches" fragment, empty when there are none. */
function vouchesPart(vouches) {
  if (vouches === 0) return '';
  if (vouches >= 5) return t('summary.vouchesMax');
  return t('summary.vouchesPart', { n: unit('vouches', vouches) });
}

/** Text ready to paste into a Discord conversation. */
export function buildSummary(form, quote) {
  if (!quote || form.amountEur <= 0 || quote.hearts <= 0) return t('summary.empty');

  const { advance, delivery, hearts } = quote;

  const common = {
    amount: n(form.amountEur),
    advance: unit('days', advance.applied),
    profile: t(`summary.profiles.${form.profile}`),
    vouches: vouchesPart(form.vouches),
    hearts: unit('hearts', hearts),
    shared: delivery.sharedSpaces ? t('summary.sharedPart') : '',
  };

  if (delivery.mode === 'single') return t('summary.single', common);

  return t('summary.spread', {
    ...common,
    rate: unit('hearts', delivery.ratePerPlayDay),
    playDays: unit('days', delivery.playDaysPerWeek),
    duration: formatDurationShort(delivery.calendarDays),
  });
}
