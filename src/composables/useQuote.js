import { onScopeDispose, ref, watch } from 'vue';
import { ApiError, fetchQuote } from '../api/index.js';
import { createLruCache } from '../lib/lruCache.js';
import { payloadKey, toPayload } from '../state/payload.js';
import { useCountdown } from './useCountdown.js';
import { useDebouncedCallback } from './useDebouncedCallback.js';

const DEBOUNCE_MS = 180;

// A quote weighs a few hundred bytes, so holding a session's worth of them
// costs a fraction of a megabyte. Generous on purpose: every entry kept is one
// request the server never sees. The cache dies with the page, deliberately.
const CACHE_LIMIT = 600;

/**
 * Connects a reactive form to the API, staying smooth without hammering the
 * server. Four guards stack up, each in its own module:
 *
 *  1. debounce, so a slider sweep triggers one request;
 *  2. cancellation, so the previous request is dropped as soon as a new one
 *     starts and a late reply cannot overwrite a fresher result;
 *  3. memory cache, so coming back to settings already seen costs nothing;
 *  4. automatic retry, so a 429 counts down the Retry-After and fires again
 *     on its own.
 *
 * `initialQuote` is the reply carried by a shared link. It is adopted as-is
 * and seeded into the cache, so opening such a link asks the server nothing.
 */
export function useQuote(form, { initialQuote = null } = {}) {
  const quote = ref(initialQuote);
  const error = ref(null);
  const pending = ref(false);

  // The settings and the price that were computed together. What gets shared
  // follows this, never the live form, so the two can never disagree.
  const snapshot = ref(null);

  const cache = createLruCache(CACHE_LIMIT);
  const countdown = useCountdown(() => run());

  let controller = null;
  let generation = 0;

  function adopt(payload, result) {
    cache.set(payloadKey(payload), result);
    quote.value = result;
    error.value = null;
    snapshot.value = { payload, quote: result };
  }

  async function run() {
    const payload = toPayload(form);

    const cached = cache.get(payloadKey(payload));
    if (cached) {
      adopt(payload, cached);
      pending.value = false;
      return;
    }

    controller?.abort();
    controller = new AbortController();

    const ticket = (generation += 1);
    pending.value = true;

    try {
      const result = await fetchQuote(payload, { signal: controller.signal });
      if (ticket !== generation) return; // a newer request took over

      adopt(payload, result);
      countdown.stop();
    } catch (cause) {
      if (cause?.name === 'AbortError' || ticket !== generation) return;

      error.value = cause instanceof ApiError ? cause : new ApiError('Unexpected error.');
      if (error.value.isRateLimited) countdown.start(error.value.retryAfterSeconds);
    } finally {
      if (ticket === generation) pending.value = false;
    }
  }

  const { schedule } = useDebouncedCallback(run, DEBOUNCE_MS);

  watch(
    form,
    () => {
      if (countdown.isRunning) return; // wait for the retry window to close
      schedule();
    },
    { deep: true },
  );

  if (initialQuote) adopt(toPayload(form), initialQuote);
  else run();

  onScopeDispose(() => controller?.abort());

  return { quote, error, pending, snapshot, retryInSeconds: countdown.remaining, refresh: run };
}
