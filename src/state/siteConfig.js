import { ref } from 'vue';
import { readBeta, readSponsor } from './readSiteConfig.js';

/**
 * Settings the owner edits by hand, straight from the GitHub web interface.
 *
 * Deliberately separate from config.js: that one is rewritten by the deploy
 * script, so anything hand-written there would be erased on the next build.
 * This one is fetched at runtime rather than imported, which means a stray
 * comma costs a missing badge instead of a failed deployment.
 */

const NO_BETA = Object.freeze({ show: false, label: null });
const NO_SPONSOR = Object.freeze({ show: false, headline: null, body: null, link: null, email: null });
const TIMEOUT_MS = 4000;
const MAX_BYTES = 20_000;

export const beta = ref(NO_BETA);
export const sponsor = ref(NO_SPONSOR);

let started = false;

export async function loadSiteConfig(baseUrl) {
  if (started) return;
  started = true;

  try {
    const response = await fetch(`${baseUrl}site.json`, {
      // Revalidates against the ETag, so an edit shows up on the next load
      // instead of waiting out the ten-minute cache. `no-store` would throw
      // away the cheap 304 that makes this free.
      cache: 'no-cache',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) return;

    const text = await response.text();
    if (text.length > MAX_BYTES) return;

    // JSON.parse chokes on a byte-order mark, which an editor can add unseen.
    const parsed = JSON.parse(text.replace(/^﻿/, ''));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return;

    beta.value = readBeta(parsed.beta);
    sponsor.value = readSponsor(parsed.sponsor);
  } catch (error) {
    console.warn(`site.json ignored (${error.message}) — check for a stray comma or comment.`);
  }
}
