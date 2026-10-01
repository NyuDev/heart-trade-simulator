/**
 * The fragment as the address bar holds it.
 *
 * The fragment is deliberate rather than a query string: browsers never send
 * it to the server, so a shared configuration stays between the two people who
 * exchange the link and costs the host nothing.
 */

export function readFragment() {
  const hash = globalThis.location?.hash ?? '';
  return hash.startsWith('#') ? hash.slice(1) : hash;
}

/**
 * Where the page lives, without any query string.
 *
 * The interface reads no query parameter at all: everything it needs is in the
 * fragment. Dropping whatever one a visitor happened to arrive with keeps it
 * out of the address bar and, more importantly, out of the links they share.
 */
export function cleanLocation() {
  const location = globalThis.location;
  return location ? { origin: location.origin, path: location.pathname } : null;
}

/**
 * Replaces the current entry rather than pushing a new one.
 *
 * Every slider move would otherwise add a step to the history and the back
 * button would walk through the whole session before leaving the page.
 */
export function writeFragment(fragment) {
  const { history, location } = globalThis;
  if (!history?.replaceState || !location) return;

  const next = `${location.pathname}${fragment ? `#${fragment}` : ''}`;
  if (next === `${location.pathname}${location.search}${location.hash}`) return;

  history.replaceState(history.state, '', next);
}
