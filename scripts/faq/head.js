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
 */

const absolute = (siteUrl, path) => `${siteUrl}${path}`;

/**
 * Serialised so it can never close its own script element.
 *
 * The answers carry the markup the page shows rather than a plainer
 * paraphrase: structured data is only allowed to state what a reader can
 * actually see, so the two have to be the same words.
 */
function structuredData(content, html) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: content.code,
    mainEntity: content.sections.flatMap((section) =>
      section.questions.map((question) => ({
        '@type': 'Question',
        name: question.q,
        acceptedAnswer: { '@type': 'Answer', text: html.get(question.id) },
      })),
    ),
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
    <link rel="alternate" hreflang="x-default" href="${absolute(siteUrl, 'faq/')}" />
    <meta name="theme-color" content="#38bdf8" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="thatskyapp" />
    <meta property="og:url" content="${self}" />
    <meta property="og:title" content="${escape(content.title)}" />
    <meta property="og:description" content="${escape(content.description)}" />
    <meta property="og:locale" content="${content.openGraphLocale}" />
    <meta property="og:locale:alternate" content="${other.openGraphLocale}" />
    <meta name="twitter:card" content="summary" />

    <style>${css}</style>
    <script type="application/ld+json">${structuredData(content, answers)}</script>
  </head>`;
}
