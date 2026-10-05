import { LINKS } from '../../src/config/links.js';
import { escape } from './markup.js';

/**
 * The head of a generated page.
 *
 * Two things here are easy to get wrong and silent when wrong. The canonical
 * names the page itself rather than the site, because the application
 * substitutes one address into every document it builds and a page inheriting
 * it would declare the home page as its own canonical and be dropped as a
 * duplicate. And the alternates are reciprocal and absolute, each language
 * listing both plus x-default: a set where one side omits the other, or where
 * a href starts with a slash, is ignored outright with no error anywhere.
 *
 * x-default names whichever of the two declares itself English rather than a
 * written-out path, because the sitemap derives the same target. Today they
 * agree; a rename would pull them apart with no error anywhere, and a cluster
 * whose two declarations disagree is thrown out whole rather than in part.
 */

const absolute = (siteUrl, path) => `${siteUrl}${path}`;

/** Whichever of the pages passed in is the English one. */
const english = (pages) => pages.find((page) => page.code === 'en').path;

/**
 * Serialised so it can never close its own script element.
 *
 * The answers carry the markup the page shows rather than a plainer
 * paraphrase: structured data is only allowed to state what a reader can
 * actually see, so the two have to be the same words.
 *
 * A graph rather than the lone FAQPage this used to emit: that node said what
 * kind of page this is and nothing about which page, which site, or whose. The
 * breadcrumb is the one rich result here Google still draws, the FAQ result
 * having been retired in May 2026; the FAQPage stays for the engines and
 * crawlers that read structured data rather than render a page.
 *
 * Every address is derived from the one the build was handed. A literal would
 * make these the only documents on the site still naming the old host after a
 * move, and nothing would report it.
 */
function structuredData(content, html, self, siteUrl) {
  const origin = new URL(siteUrl).origin;

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${origin}/#creator`,
        name: 'NyuDev',
        url: LINKS.profile,
      },
      {
        '@type': 'FAQPage',
        '@id': `${self}#faq`,
        url: self,
        name: content.title,
        description: content.description,
        inLanguage: content.code,
        license: LINKS.deed,
        creator: { '@id': `${origin}/#creator` },
        isPartOf: { '@id': `${origin}/#site` },
        about: { '@id': `${siteUrl}#app` },
        mainEntity: content.sections.flatMap((section) =>
          section.questions.map((question) => ({
            '@type': 'Question',
            name: question.q,
            acceptedAnswer: { '@type': 'Answer', text: html.get(question.id) },
          })),
        ),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'thatskyapp', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: content.appName, item: siteUrl },
          // No `item` on the last one: it is the page being read.
          { '@type': 'ListItem', position: 3, name: content.heading },
        ],
      },
    ],
  };

  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

export function head({ content, other, siteUrl, css, answers }) {
  const self = absolute(siteUrl, content.path);
  const alternates = [content, other]
    .map((page) => `    <link rel="alternate" hreflang="${page.code}" href="${absolute(siteUrl, page.path)}" />`)
    .join('\n');

  return `  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />

    <title>${escape(content.title)}</title>
    <meta name="description" content="${escape(content.description)}" />
    <link rel="canonical" href="${self}" />
${alternates}
    <link rel="alternate" hreflang="x-default" href="${absolute(siteUrl, english([content, other]))}" />
    <meta name="theme-color" content="#38bdf8" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="thatskyapp" />
    <meta property="og:url" content="${self}" />
    <meta property="og:title" content="${escape(content.title)}" />
    <meta property="og:description" content="${escape(content.description)}" />
    <meta property="og:locale" content="${content.openGraphLocale}" />
    <meta property="og:locale:alternate" content="${other.openGraphLocale}" />
    <meta property="og:image" content="${absolute(siteUrl, 'og.png')}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escape(content.imageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />

    <style>${css}</style>
    <script type="application/ld+json">${structuredData(content, answers, self, siteUrl)}</script>
  </head>`;
}
