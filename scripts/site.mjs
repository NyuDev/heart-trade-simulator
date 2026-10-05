/**
 * The address the site is served from when nothing says otherwise.
 *
 * Three scripts need it — the Vite config for the canonical and the breadcrumb,
 * and the two generators for the FAQ heads and the sitemap — and they used to
 * each carry their own literal. Two said thatskyapp.com and one still said the
 * github.io address it was first written for, which meant a build with no
 * environment set (the Dockerfile runs exactly that) produced a document
 * declaring itself canonical on one host while its own sitemap announced the
 * other: the disagreement the sitemap generator is written to prevent.
 *
 * It is a default, not a pin: VITE_SITE_URL still overrides it everywhere, so
 * one artefact keeps working at whatever address it is deployed to.
 */
export const DEFAULT_SITE_URL = 'https://thatskyapp.com/heart-trade-simulator/';
