import { LINKS } from '../../src/config/links.js';
import { CHEVRON, flag } from './flag.js';
import { escape } from './markup.js';

/**
 * The furniture around the questions: the language pill, the contents list and
 * the footer.
 *
 * Apart from the prose itself, this is everything the page shares with the
 * application, which is why it sits on its own rather than inside the document
 * assembly next door. The footer is deliberately the same two columns and the
 * same links as the application's: the two pages are one site, and a reader
 * who scrolls to the bottom of either should not be able to tell them apart.
 */

/**
 * The same pill the application uses, as a disclosure rather than a listbox.
 *
 * Two languages and no framework here, so the native element does the work the
 * component does there: it opens on click, closes on Escape, and is reachable
 * from the keyboard without a line of script.
 */
export function languagePill(content, other, up) {
  const option = (page, href, current) =>
    `<li><a class="dropdown-option" href="${href}" lang="${page.code}"${
      current ? ' aria-current="page"' : ''
    }>${flag(page.code, `flag-${page.code}-option`)}<span>${escape(page.nativeName)}</span></a></li>`;

  return `<details class="dropdown">
        <summary class="dropdown-trigger" aria-label="${escape(content.languageLabel)}">
          ${flag(content.code, `flag-${content.code}-trigger`)}<span>${content.code.toUpperCase()}</span>${CHEVRON}
        </summary>
        <ul class="dropdown-list" role="list">
          ${option(content, '#', true)}
          ${option(other, `${up}${other.path}`, false)}
        </ul>
      </details>`;
}

/**
 * The landmark takes its name from the heading rather than repeating it, and
 * the list keeps its role: stripping the markers off a list is enough for some
 * readers to stop announcing it as one.
 */
export function contents(content) {
  const items = content.sections
    .map((section) => `<li><a href="#${section.id}">${escape(section.title)}</a></li>`)
    .join('');

  return `<nav class="toc" aria-labelledby="toc-heading">
        <h2 id="toc-heading">${escape(content.tocLabel)}</h2>
        <ol role="list">${items}</ol>
      </nav>`;
}

const external = (href, text, rel = 'noopener noreferrer') =>
  `<a href="${href}" target="_blank" rel="${rel}">${escape(text)}</a>`;

export function footer({ content, labels, licence, logo, up, year }) {
  const links = [
    `<a href="${up}">${escape(labels.simulator)}</a>`,
    external(LINKS.repo, labels.source),
    external(LINKS.licence, labels.licence, 'license noopener noreferrer'),
    `<a class="contribute" href="${LINKS.newIssue}" target="_blank" rel="noopener noreferrer">${escape(labels.contribute)}</a>`,
  ].join('');

  return `<footer class="foot">
        <div class="row">
          <div class="prose">
            <p class="licence">${licence}</p>
            <p class="notice">${escape(labels.short)}</p>
          </div>

          <div class="meta">
            <p class="identity">${logo}<span>${escape(labels.copyright.replace('{year}', year))}</span></p>
            <nav class="links" aria-label="${escape(labels.label)}">${links}</nav>
          </div>
        </div>
      </footer>`;
}
