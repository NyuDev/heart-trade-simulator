/**
 * The year the work is dated, the way a copyright line and a licence want it.
 *
 * A notice names when the work was made, not what year it happens to be, so
 * the first year never moves. It is extended rather than replaced once the
 * site has outlived it: 2026, then 2026–2027, then 2026–2028.
 *
 * Three places used to answer this differently — the footer read the clock,
 * the generated pages read a different one, and the licence notice between
 * them had 2026 written into it. On the first of January the footer would have
 * contradicted the notice sitting directly above it.
 *
 * UTC in both, because the generated pages are stamped by a build server and
 * the application by whatever clock the visitor's browser is on. The same rule
 * everywhere beats a difference that only shows for a few hours a year.
 *
 * The range is still only as fresh as the last build on the generated pages:
 * they carry the string, not the code. One deploy in January settles it, and
 * nothing about the licence depends on the day it happens.
 */

/** First publication. Fixed, and not to be bumped. */
const PUBLISHED = 2026;

/** `2026` on its own until the site outlives it, `2026–2027` after that. */
export function copyrightYears(now = new Date()) {
  const current = now.getUTCFullYear();
  return current > PUBLISHED ? `${PUBLISHED}–${current}` : String(PUBLISHED);
}
