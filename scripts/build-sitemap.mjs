import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import en from '../src/content/faq/en/index.js';
import fr from '../src/content/faq/fr/index.js';
import { DEFAULT_SITE_URL } from './site.mjs';

/**
 * Writes dist/sitemap.xml, after the pages it lists exist.
 *
 * This repository owns a sub-path of the domain, not its root, so it ships its
 * own sitemap rather than editing the one next door: a sitemap may list any
 * address at or below its own directory, and robots.txt at the root names both.
 * A page added here is therefore listed by building, with nobody having to
 * remember the other repository.
 *
 * The language alternates are built from the same two modules the pages
 * themselves are built from, so the sitemap cannot come to disagree with the
 * <link rel="alternate"> tags in their heads. Search engines accept either
 * place; what they do not forgive is the two of them saying different things.
 *
 * No lastmod, no changefreq, no priority. The last two are ignored outright,
 * and a lastmod set to the build date would claim the content changed every
 * time anything was rebuilt, which teaches a crawler to stop believing the
 * field at all.
 */

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const SITE_URL = process.env.VITE_SITE_URL ?? DEFAULT_SITE_URL;
const site = SITE_URL.endsWith('/') ? SITE_URL : `${SITE_URL}/`;

const LANGUAGES = [en, fr];
const absolute = (path) => `${site}${path}`;

/** The reciprocal set every translated page carries, plus the default. */
const alternates = LANGUAGES.map(
  (page) =>
    `      <xhtml:link rel="alternate" hreflang="${page.code}" href="${absolute(page.path)}" />`,
)
  .concat(`      <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(en.path)}" />`)
  .join('\n');

const entries = [
  `  <url>\n    <loc>${site}</loc>\n  </url>`,
  ...LANGUAGES.map(
    (page) => `  <url>
    <loc>${absolute(page.path)}</loc>
${alternates}
  </url>`,
  ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${entries.join('\n')}
</urlset>
`;

await writeFile(resolve(ROOT, 'dist', 'sitemap.xml'), xml, 'utf8');
console.log(`sitemap: ${entries.length} addresses under ${site}`);
