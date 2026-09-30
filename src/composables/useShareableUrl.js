import { watch } from 'vue';
import { encodeState } from '../share/encode.js';
import { writeFragment } from '../share/hash.js';
import { useDebouncedCallback } from './useDebouncedCallback.js';

// Long enough that dragging a slider does not rewrite the address bar on every
// frame, short enough that the link is ready by the time a hand reaches it.
const WRITE_DELAY_MS = 250;

/**
 * Keeps the address bar in step with what is on screen, so the page can be
 * shared by copying the URL.
 *
 * It follows the priced snapshot, not the raw form: the settings and the price
 * written to the link are always the ones that were computed together. A URL
 * showing a price that belongs to different settings would be worse than no
 * URL at all.
 */
export function useShareableUrl(snapshot) {
  const { schedule } = useDebouncedCallback((state) => {
    writeFragment(encodeState(state.payload, state.quote));
  }, WRITE_DELAY_MS);

  watch(
    snapshot,
    (state) => {
      if (state) schedule(state);
    },
    { immediate: true },
  );
}
