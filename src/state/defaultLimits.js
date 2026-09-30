/**
 * Input bounds used before the server publishes its own.
 *
 * They serve two callers: the fields, so the interface stays usable if the
 * call fails, and the reader of a shared link, which has to reject a crafted
 * URL before it reaches the form. Keeping a single copy is what stops the two
 * from drifting apart.
 */
export const DEFAULT_LIMITS = Object.freeze({
  amount: { min: 0, max: 10000 },
  advanceDays: { min: 0, max: 30 },
  capacityPerPlayDay: { min: 1, max: 1000 },
  playDaysPerWeek: { min: 1, max: 7 },
  vouches: { min: 0, max: 5 },
});
