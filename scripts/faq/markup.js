/**
 * The smallest amount of markup the answers need.
 *
 * Escaping runs first and the link form is matched afterwards, so a paragraph
 * can never introduce an element of its own: whatever survives into the page
 * is either text or one of the links written here. The prose files hold no
 * HTML, which is the point — they are read and edited as sentences.
 */

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ESCAPES[character]);

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Text with its links turned into anchors.
 *
 * Only https survives. A relative or javascript: target is left as the literal
 * brackets it was written as, which is visible in the page and therefore gets
 * noticed, rather than silently becoming something else.
 */
export function inline(text) {
  return escape(text).replace(LINK, (whole, label, href) =>
    href.startsWith('https://') ? `<a href="${href}">${label}</a>` : whole,
  );
}

/** A heading id, kept to what is legal in a URL fragment. */
export const slug = (value) =>
  String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
