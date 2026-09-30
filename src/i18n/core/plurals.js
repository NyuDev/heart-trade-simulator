/**
 * Plural rules, per language.
 *
 * English pluralises as soon as the value differs from 1, giving "1.5 hearts".
 * French only from 2, giving "1,5 coeur". A single rule for both would produce
 * wrong agreement on decimal values, which are common here: smoothed capacity,
 * boosted pace.
 */
const RULES = {
  en: (count) => (count === 1 ? 0 : 1),
  fr: (count) => (count < 2 ? 0 : 1),
};

const DEFAULT_RULE = RULES.en;

/** Index of the form to use among those separated by a pipe. */
export function pluralIndex(locale, count, formCount) {
  const rule = RULES[locale] ?? DEFAULT_RULE;
  return Math.min(rule(Number(count)), formCount - 1);
}
