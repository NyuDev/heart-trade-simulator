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
});
