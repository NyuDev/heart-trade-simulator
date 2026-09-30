import { onScopeDispose, ref, watch } from 'vue';
import { ApiError, fetchQuote } from '../api/index.js';
import { createLruCache } from '../lib/lruCache.js';
import { useCountdown } from './useCountdown.js';
import { useDebouncedCallback } from './useDebouncedCallback.js';

const DEBOUNCE_MS = 180;
const CACHE_LIMIT = 80;

/** Extracts from the reactive form the payload the API expects. */
function toPayload(form) {
  return {
    amountEur: form.amountEur,
    advanceDays: form.advanceDays,
    profile: form.profile,
    vouches: form.vouches,
    capacityPerPlayDay: form.capacityPerPlayDay,
    playDaysPerWeek: form.playDaysPerWeek,
    sharedSpaces: form.sharedSpaces,
  };
}

/**
 * Connects a reactive form to the API, staying smooth without hammering the
 * server. Four guards stack up, each in its own module:
 *
 *  1. debounce, so a slider sweep triggers one request;
 *  2. cancellation, so the previous request is dropped as soon as a new one
 *     starts and a late reply cannot overwrite a fresher result;
 *  3. memory cache, so going back to settings already seen costs nothing;
 *  4. automatic retry, so a 429 counts down the Retry-After and fires again
 *     on its own.
 */
export function useQuote(form) {
  const quote = ref(null);
  const error = ref(null);
  const pending = ref(false);

  const cache = createLruCache(CACHE_LIMIT);
  const countdown = useCountdown(() => run());

  let controller = null;
  let generation = 0;

  async function run() {
    const payload = toPayload(form);
    const key = JSON.stringify(payload);

    const cached = cache.get(key);
    if (cached) {
      quote.value = cached;
      error.value = null;
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

      cache.set(key, result);
      quote.value = result;
      error.value = null;
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

  run();

  onScopeDispose(() => controller?.abort());

  return { quote, error, pending, retryInSeconds: countdown.remaining, refresh: run };
}
