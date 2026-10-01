import { writeFileSync } from 'node:fs';
import { DEFAULT_FORM } from '../src/state/defaults.js';

/**
 * Writes the runtime configuration next to the built interface.
 *
 * Two things end up in it. The API address, so one build can serve several
 * deployments. And the reply for the opening settings, asked for here once so
 * that every first visit renders without a request of its own.
 *
 * The defaults come from the interface itself rather than being repeated here:
 * a baked answer that no longer matches the form it describes would be worse
 * than no baked answer at all.
 */

const TARGET = 'dist/config.js';
const TIMEOUT_MS = 10_000;

const apiBaseUrl = process.env.API_BASE_URL || '/api';

// Where the share button points. A link preview has to be built by a server,
// so a shared link goes through one; empty means the button falls back to this
// site's own address, which still opens the right quote but previews as the
// plain site.
const shareBaseUrl = (process.env.SHARE_BASE_URL || '').replace(/\/$/, '');

/** Null rather than a throw: a missing bake costs one request, not a build. */
async function openingQuote() {
  if (!/^https?:\/\//.test(apiBaseUrl)) {
    return { quote: null, why: 'no absolute API address configured' };
  }

  try {
    const response = await fetch(`${apiBaseUrl}/quote`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(DEFAULT_FORM),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) return { quote: null, why: `API answered ${response.status}` };

    const quote = await response.json();
    if (typeof quote?.hearts !== 'number') return { quote: null, why: 'unexpected reply shape' };

    return { quote, why: null };
  } catch (error) {
    return { quote: null, why: error.message };
  }
}

const config = { apiBaseUrl };
if (shareBaseUrl) config.shareBaseUrl = shareBaseUrl;
const { quote, why } = await openingQuote();
if (quote) config.defaultQuote = quote;

writeFileSync(TARGET, `window.__SIMULATOR_CONFIG__ = ${JSON.stringify(config)};\n`);

console.log(`apiBaseUrl   = ${apiBaseUrl}`);
console.log(`shareBase    = ${shareBaseUrl || 'none (links point at this site)'}`);
console.log(quote ? `baked quote  = ${quote.hearts} hearts` : `baked quote  = none (${why})`);
