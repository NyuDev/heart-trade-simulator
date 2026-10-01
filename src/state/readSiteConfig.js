import { readEmail, readFlag, readLink, readText } from './readValues.js';

/**
 * Turning the hand-edited file into the two things it controls.
 *
 * Each section is read on its own: a broken sponsor block must not take the
 * beta badge down with it.
 */

const MAX_LABEL = 24;
const MAX_HEADLINE = 60;
const MAX_BODY = 160;

export function readBeta(value) {
  // A bare `"beta": true` is what someone writes in a hurry.
  if (typeof value === 'boolean' || typeof value === 'string') {
    return { show: readFlag(value), label: null };
  }
  if (!value || typeof value !== 'object') return { show: false, label: null };

  // The label is decorative: wanting the badge shown is explicit, so a missing
  // or unusable label falls back to the interface's own wording.
  return { show: readFlag(value.show), label: readText(value.label, MAX_LABEL) };
}

export function readSponsor(value) {
  const hidden = { show: false, headline: null, body: null, link: null, email: null };
  if (!value || typeof value !== 'object' || Array.isArray(value)) return hidden;

  const headline = readText(value.headline, MAX_HEADLINE);
  const body = readText(value.body, MAX_BODY);

  // Shown with nothing to say would leave an empty box on the page.
  if (!readFlag(value.show) || (!headline && !body)) return hidden;

  return {
    show: true,
    headline,
    body,
    link: readLink(value.link),
    email: readEmail(value.email),
  };
}
