import { CHEVRON, flag } from './flag.js';
import { escape } from './markup.js';

/**
 * The furniture around the questions: the language pill, the contents list and
 * the licence line.
 *
 * Apart from the prose itself, this is everything the page shares with the
 * application, which is why it sits on its own rather than inside the document
 * assembly next door.
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

export function footer(content, licence, up) {
  const badges = ['cc', 'by', 'nc', 'nd']
    .map((name) => `<img src="${up}cc/${name}.svg" alt="" width="20" height="20" />`)
    .join('');

  return `<footer class="foot">
        <p>${licence}<span class="badges">${badges}</span></p>
        <p>${escape(content.disclaimer)}</p>
      </footer>`;
}
