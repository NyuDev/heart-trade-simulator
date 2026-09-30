import { onMounted, ref, watch } from 'vue';
import { fetchLimits } from '../api/index.js';
import { DEFAULT_LIMITS } from '../state/defaultLimits.js';

/**
 * Input bounds for the fields.
 *
 * The defaults keep the interface usable if the call fails, then the ones the
 * server publishes replace them, so they only live in one authoritative place.
 *
 * `enabled` defers the call: a link opened with its result already attached
 * has nothing to ask the server, and waiting until the visitor actually moves
 * something keeps that promise literally true.
 */
export function useLimits(enabled = null) {
  const limits = ref(DEFAULT_LIMITS);
  let done = false;

  async function load() {
    if (done) return;
    done = true;

    try {
      limits.value = await fetchLimits();
    } catch {
      // The defaults are enough: the server revalidates anyway.
    }
  }

  if (enabled) {
    watch(enabled, (ready) => ready && load(), { immediate: true });
  } else {
    onMounted(load);
  }

  return { limits };
}
