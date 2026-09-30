import { reactive } from 'vue';

/**
 * The settings entered by the user.
 *
 * No pricing rule here, it is only a form. The starting values match the
 * market reference case: a Season Pass sent at the standard pace.
 */
export function createQuoteForm() {
  return reactive({
    amountEur: 10,
    advanceDays: 0,
    profile: 'regular',
    vouches: 0,
    capacityPerPlayDay: 2,
    playDaysPerWeek: 7,
    sharedSpaces: false,
  });
}
