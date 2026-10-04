import { contents, footer, languagePill } from './chrome.js';
import { inlineScript } from './script.js';
import { head } from './head.js';
import { escape, inline } from './markup.js';

/**
 * A whole FAQ page, as one file with nothing to fetch beside it.
 *
 * Deliberately not a route in the application: a crawler would have to run the
 * bundle to see a word of it, and on static hosting a path with no file behind
 * it is a hard 404. Written as a document, the answers are in the response.
 *
 * Links between pages are relative and the metadata is absolute. That way the
 * pair can be opened from a local preview, where the site has no domain yet,
 * while the canonical and the alternates still name the real addresses.
 */

/**
 * The same mark, with its gradient renamed per instance.
 *
 * The star appears twice on a page, in the masthead and in the footer, and two
 * elements sharing a gradient id would make the second render against the
 * first. The component in the application solves this with useId(); here the
 * sites are known, so they are simply named.
 */
const markFor = (logo, place) =>
  logo.replaceAll('logo-star', `logo-star-${place}`);

/** How far back the site root is, from the depth of this page's own path. */
const upFrom = (path) => '../'.repeat(path.split('/').filter(Boolean).length);

const paragraphs = (lines) => lines.map((line) => `<p>${inline(line)}</p>`).join('');

/**
 * One row per question, closed.
 *
 * Collapsed, not absent: the answers are in the document either way, which is
 * what a crawler reads and what a browser searches. Nineteen open answers is a
 * page nobody scans.
 */
function sections(content, answers) {
  return content.sections
    .map((section) => {
      const rows = section.questions
        .map(
          (question) => `<details class="qa" id="${question.id}">
            <summary><h3>${escape(question.q)}</h3></summary>
            <div class="answer">${answers.get(question.id)}</div>
          </details>`,
        )
        .join('\n          ');

      return `<section id="${section.id}">
          <h2>${escape(section.title)}</h2>
          ${rows}
        </section>`;
    })
    .join('\n        ');
}

export function renderPage({ content, other, siteUrl, css, licence, labels, logo, year }) {
  const up = upFrom(content.path);

  // Built once and handed to both the page and the structured data, so the two
  // can only ever carry the same words.
  const answers = new Map(
    content.sections.flatMap((section) =>
      section.questions.map((question) => [question.id, paragraphs(question.a)]),
    ),
  );

  return `<!doctype html>
<html lang="${content.code}">
${head({ content, other, siteUrl, css, answers })}
  <body>
    <div class="page">
      <header class="masthead">
        <div class="identity">${markFor(logo, 'masthead')}<h1>${escape(content.heading)}</h1></div>
        ${languagePill(content, other, up)}
      </header>

      <p class="intro">${escape(content.intro)}</p>

      <div class="columns">
        ${contents(content)}
        <main>
        ${sections(content, answers)}

          <p class="cta"><a class="back" href="${up}">${escape(content.backLabel)}</a></p>
        </main>
      </div>

      ${footer({ content, labels, licence, logo: markFor(logo, 'footer'), up, year })}
    </div>
    <script>${inlineScript(content.code)}</script>
  </body>
</html>
`;
}
