import { reactive } from 'vue';

/**
 * The settings entered by the user.
 *
 * No pricing rule here, it is only a form. The starting values match the
 * market reference case: a Season Pass sent at the standard pace.
 */
const DEFAULTS = Object.freeze({
  amountEur: 10,
  advanceDays: 0,
  profile: 'regular',
  vouches: 0,
  capacityPerPlayDay: 2,
  playDaysPerWeek: 7,
  sharedSpaces: false,
});

/**
 * `initial` comes from a shared link. Only the known fields are taken, so a
 * crafted URL cannot smuggle an extra property into the payload sent to the
 * API, and anything missing falls back to its default.
 */
export function createQuoteForm(initial = null) {
  const form = { ...DEFAULTS };

  if (initial) {
    for (const key of Object.keys(DEFAULTS)) {
      if (initial[key] !== undefined) form[key] = initial[key];
    }
  }

  return reactive(form);
}
