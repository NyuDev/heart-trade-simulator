import { LINKS } from '../../src/config/links.js';
import { escape } from './markup.js';

/**
 * The attribution notice, built from the same sentence the footer uses.
 *
 * Read from the dictionaries rather than copied, so the two surfaces cannot
 * say different things about the same licence. The words are translated; the
 * three links around them are built here, which is why the dictionary holds
 * tokens and no markup.
 */

const WORK = 'Price & Risk Simulator';
const CREATOR = 'NyuDev';
const LICENCE = 'CC BY-NC-ND 4.0';
const DEED = LINKS.deed;

export const YEAR = new Date().getUTCFullYear();

// The work's own address follows the build rather than LINKS.site: a copy
// deployed elsewhere would otherwise attribute the work to a page that is
// not the one being read. The name is escaped like every other string that
// reaches the page; it contains an ampersand, and was the only one that
// went out raw.
const parts = (siteUrl) => ({
  '{work}': `<a href="${siteUrl}" rel="cc:attributionURL">${escape(WORK)}</a>`,
  '{creator}': `<a href="${LINKS.profile}" rel="cc:attributionURL">${escape(CREATOR)}</a>`,
  '{licence}': `<a href="${DEED}" rel="license noopener noreferrer" target="_blank">${escape(LICENCE)}</a>`,
});

/**
 * The badges ride inside the {licence} substitution rather than after the
 * sentence, so they can never be left on a line of their own when the text
 * wraps. Both languages end on that token.
 */
export function licenceNotice(footer, badges = '', siteUrl = LINKS.site) {
  const base = parts(siteUrl);
  const filled = { ...base, '{licence}': `<span class="deed">${base['{licence}']}${badges}</span>` };

  return footer.licenceNotice
    .replace('{year}', String(YEAR))
    .replace(/\{work\}|\{creator\}|\{licence\}/g, (token) => filled[token]);
}
