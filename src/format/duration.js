import { translate as t } from '../i18n/index.js';
import { n, unit } from './number.js';

/**
 * Duration formatting.
 *
 * The thresholds avoid absurd wording: no "1 day, about 1 week", and no
 * "84 months" for seven years.
 */

const MONTH_DAYS = 30;
const YEAR_DAYS = 365;

/** Splits a duration into months and weeks, carrying 4 weeks into a month. */
function splitMonths(days) {
  let months = Math.floor(days / MONTH_DAYS);
  let weeks = Math.round((days - months * MONTH_DAYS) / 7);
  if (weeks >= 4) {
    months += 1;
    weeks = 0;
  }
  return { months, weeks };
}

/** Splits a duration into years and months, carrying 12 months into a year. */
function splitYears(days) {
  let years = Math.floor(days / YEAR_DAYS);
  let months = Math.round((days - years * YEAR_DAYS) / MONTH_DAYS);
  if (months >= 12) {
    years += 1;
    months = 0;
  }
  return { years, months };
}

const join = (a, b) => t('duration.and', { a, b });

/** Compact wording: "3 months and 1 week", "7 years". */
export function coarseDuration(days) {
  if (days <= 730) {
    const { months, weeks } = splitMonths(days);
    return weeks >= 1 ? join(unit('months', months), unit('weeks', weeks)) : unit('months', months);
  }

  const { years, months } = splitYears(days);
  return months >= 1 ? join(unit('years', years), unit('months', months)) : unit('years', years);
}

/** Detailed duration shown under the price. */
export function formatDuration(days) {
  if (days <= 0) return t('quote.empty');
  if (days <= 13) return unit('calendarDays', days);
  if (days <= 30) {
    return t('duration.daysWeeks', { n: n(days), weeks: unit('weeks', Math.round(days / 7)) });
  }
  return t('duration.about', { value: coarseDuration(days), n: n(days) });
}

/** Short version, for the copied summary. */
export function formatDurationShort(days) {
  if (days <= 13) return unit('days', days);
  if (days <= 60) return unit('weeks', Math.round(days / 7));
  return coarseDuration(days);
}
