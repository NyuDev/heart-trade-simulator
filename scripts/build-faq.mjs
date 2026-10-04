import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import en from '../src/content/faq/en/index.js';
import fr from '../src/content/faq/fr/index.js';
import enFooter from '../src/i18n/messages/en/footer.js';
import frFooter from '../src/i18n/messages/fr/footer.js';
import { YEAR, licenceNotice } from './faq/licence.js';
import { renderPage } from './faq/render.js';
import { FAQ_CSS } from './faq/style.js';

/**
 * Writes the FAQ pages into dist, after Vite has built the application.
 *
 * A second entry in the bundler would have been the obvious place for this,
 * but the build resolves assets relatively so that one artefact works both
 * under a repository sub-path and at the root of a domain, and a document in
 * a sub-directory would then look for the bundle beside itself. These pages
 * need no bundle at all, so they are written here instead and carry their
 * styles inline: nothing to resolve, nothing to get wrong at either depth.
 */

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'dist');

// The same fallback as vite.config.js. The deployment workflow sets the real
// address; a local build still produces a page, with metadata naming where it
// would live rather than where it happens to be served from.
const SITE_URL = process.env.VITE_SITE_URL ?? 'https://thatskyapp.com/heart-trade-simulator/';

const PAGES = [
  { content: en, other: fr, footer: enFooter },
  { content: fr, other: en, footer: frFooter },
];

const read = (relative) => readFile(resolve(ROOT, relative), 'utf8');

/** The licence badges, served from this site rather than from a CC mirror. */
const upFor = (path) => '../'.repeat(path.split('/').filter(Boolean).length);
const BADGES = (up) =>
  ['cc', 'by', 'nc', 'nd']
    .map((name) => `<img class="badge" src="${up}cc/${name}.svg" alt="" width="16" height="16" />`)
    .join('');

async function main() {
  // The application's own stylesheets, inlined ahead of this page's: the
  // language pill is its control, down to the pixel, and a copy of those rules
  // here would be a second one to keep in step.
  const [tokens, reset, dropdown, flagCss, logo] = await Promise.all([
    read('src/styles/tokens.css'),
    read('src/styles/reset.css'),
    read('src/styles/controls/dropdown.css'),
    read('src/styles/controls/flag.css'),
    read('public/logo.svg'),
  ]);

  const css = [tokens, reset, dropdown, flagCss, FAQ_CSS].join('\n');
  const siteUrl = SITE_URL.endsWith('/') ? SITE_URL : `${SITE_URL}/`;

  for (const { content, other, footer } of PAGES) {
    const html = renderPage({
      content,
      other,
      siteUrl,
      css,
      logo: logo.trim(),
      licence: licenceNotice(footer, BADGES(upFor(content.path))),
      labels: footer,
      year: YEAR,
    });

    const file = resolve(OUT, content.path, 'index.html');
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html, 'utf8');

    const questions = content.sections.reduce((total, section) => total + section.questions.length, 0);
    console.log(`faq: ${content.path} — ${questions} questions, ${(html.length / 1024).toFixed(1)} kB`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
