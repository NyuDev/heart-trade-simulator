import { LINKS } from '../../src/config/links.js';

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
const DEED = 'https://creativecommons.org/licenses/by-nc-nd/4.0/';

const YEAR = new Date().getUTCFullYear();

const PARTS = {
  '{work}': `<a href="${LINKS.site}" rel="cc:attributionURL">${WORK}</a>`,
  '{creator}': `<a href="${LINKS.profile}" rel="cc:attributionURL">${CREATOR}</a>`,
  '{licence}': `<a href="${DEED}" rel="license noopener noreferrer" target="_blank">${LICENCE}</a>`,
};

export function licenceNotice(footer) {
  return footer.licenceNotice
    .replace('{year}', String(YEAR))
    .replace(/\{work\}|\{creator\}|\{licence\}/g, (token) => PARTS[token]);
}
