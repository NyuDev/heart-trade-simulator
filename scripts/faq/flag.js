import { FLAGS } from '../../src/components/layout/flags.js';

/**
 * One flag, from the same artwork the application draws.
 *
 * The mask id is passed in rather than generated: both flags appear twice on a
 * page, once in the trigger and once in the list, and two elements sharing a
 * mask id would make the second clip against the first.
 */
export function flag(code, maskId) {
  const paths = FLAGS[code]
    .map((path) => `<path fill="${path.fill}" d="${path.d}"/>`)
    .join('');

  return `<svg class="flag" viewBox="0 0 512 512" aria-hidden="true" focusable="false"><mask id="${maskId}"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#${maskId})">${paths}</g></svg>`;
}

export const CHEVRON =
  '<svg class="dropdown-chevron" viewBox="0 0 12 12" aria-hidden="true" focusable="false">' +
  '<path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" stroke-width="1.5" ' +
  'stroke-linecap="round" stroke-linejoin="round"/></svg>';
