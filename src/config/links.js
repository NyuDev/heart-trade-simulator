/**
 * Addresses the interface points at.
 *
 * In one place because they appear in several corners of the page, and because
 * a repository that gets renamed should take one edit rather than a search.
 */
const REPO = 'https://github.com/NyuDev/heart-trade-simulator';

export const LINKS = Object.freeze({
  repo: REPO,
  licence: `${REPO}/blob/main/LICENSE`,
  newIssue: `${REPO}/issues/new`,
  site: 'https://thatskyapp.com/heart-trade-simulator/',
  profile: 'https://github.com/NyuDev',
  // The licence deed itself, not the file in the repository: the footer, the
  // generated pages and the structured data all name it, and four copies of a
  // URL is three chances to update only three of them.
  deed: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
});
