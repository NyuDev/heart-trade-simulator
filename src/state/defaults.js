/**
 * The settings the interface opens on.
 *
 * Kept free of any framework import so the build can read them too: the
 * deploy asks the API for the quote these produce and bakes the answer in,
 * which is what lets a first visit render without a request. Were this list
 * duplicated there, the baked answer would quietly stop matching the form.
 *
 * The values are the market reference case: a Season Pass sent at the
 * standard pace.
 */
export const DEFAULT_FORM = Object.freeze({
  amountEur: 10,
  advanceDays: 0,
  profile: 'regular',
  vouches: 0,
  capacityPerPlayDay: 2,
  playDaysPerWeek: 7,
  sharedSpaces: false,
});
