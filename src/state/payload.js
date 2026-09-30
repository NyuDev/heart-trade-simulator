/** The settings the API expects, taken out of the reactive form. */
export function toPayload(form) {
  return {
    amountEur: form.amountEur,
    advanceDays: form.advanceDays,
    profile: form.profile,
    vouches: form.vouches,
    capacityPerPlayDay: form.capacityPerPlayDay,
    playDaysPerWeek: form.playDaysPerWeek,
    sharedSpaces: form.sharedSpaces,
  };
}

/** Cache key. Field order is fixed by toPayload, so the string is stable. */
export const payloadKey = (payload) => JSON.stringify(payload);
