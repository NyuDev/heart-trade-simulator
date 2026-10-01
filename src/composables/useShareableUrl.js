import { computed, watch } from 'vue';
import { encodeState } from '../share/encode.js';
import { cleanLocation, writeFragment } from '../share/hash.js';
import { useDebouncedCallback } from './useDebouncedCallback.js';

// Long enough that dragging a slider does not rewrite the address bar on every
// frame, short enough that the link is ready by the time a hand reaches it.
const WRITE_DELAY_MS = 250;

/**
 * Keeps the address bar in step with what is on screen, and hands back the
 * same link for the share button.
 *
 * It follows the priced snapshot, not the raw form: the settings and the price
 * written to the link are always the ones that were computed together. A URL
 * showing a price that belongs to different settings would be worse than no
 * URL at all.
 *
 * `active` holds the address bar back until there is something worth putting
 * in it. Someone who opens the page and reads it should leave with the plain
 * address they arrived on, not a code they never asked for; the code appears
 * the moment they change a setting. The share button is unaffected and works
 * from the first paint, because it reads `shareUrl` directly rather than the
 * address bar.
 */
export function useShareableUrl(snapshot, active) {
  const fragment = computed(() =>
    snapshot.value ? encodeState(snapshot.value.payload, snapshot.value.quote) : '',
  );

  const shareUrl = computed(() => {
    const here = cleanLocation();
    if (!fragment.value || !here) return '';
    return `${here.origin}${here.path}#${fragment.value}`;
  });

  const { schedule } = useDebouncedCallback(writeFragment, WRITE_DELAY_MS);

  watch(
    () => [fragment.value, Boolean(active?.value)],
    ([value, on]) => {
      if (on && value) schedule(value);
    },
    { immediate: true },
  );

  return { shareUrl };
}
