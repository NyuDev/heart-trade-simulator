/**
 * The day a quote was worked out, as a small whole number.
 *
 * A date in a link has to be the day it was written, not the day it is read:
 * the card a chat client shows is rendered once and then cached for weeks, so
 * reading a clock at render time would stamp it with whenever the crawler
 * happened to come by. The day therefore travels in the code.
 *
 * Days rather than milliseconds, counted from the start of this project rather
 * than from 1970: "when was this worked out" is a question about a date, and
 * the smaller number costs two bytes instead of six.
 */

export const DAY_MS = 86_400_000;

/** 1 January 2026, UTC. */
export const EPOCH_MS = Date.UTC(2026, 0, 1);

/** Refuses a link claiming a date a century out, which is not a real quote. */
export const MAX_DAY = 36_500;

/** Today, or null if the clock reads before this project existed. */
export function todayIndex(now = Date.now()) {
  const day = Math.floor((now - EPOCH_MS) / DAY_MS);
  return day >= 0 && day <= MAX_DAY ? day : null;
}

/** The date a stored index stands for, at midnight UTC. */
export function dateFromIndex(day) {
  if (!Number.isInteger(day) || day < 0 || day > MAX_DAY) return null;
  return new Date(EPOCH_MS + day * DAY_MS);
}
