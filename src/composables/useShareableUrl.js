import { computed, watch } from 'vue';
import { locale } from '../i18n/index.js';
import { encodeState } from '../share/encode.js';
import { encodeResult } from '../share/encodeResult.js';
import { todayIndex } from '../share/day.js';
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
  /**
   * Read once per session rather than per keystroke.
   *
   * A computed that called the clock would be a computed whose value depends
   * on something it does not track, and the day is not going to turn while
   * someone drags a slider.
   */
  const day = todayIndex();

  const fragment = computed(() =>
    snapshot.value ? encodeState(snapshot.value.payload, snapshot.value.quote, day) : '',
  );

  /**
   * The same quote written down as terms rather than as a form.
   *
   * Short, because most of what the full code carries is the appraisal that
   * produced the price, and none of that is in here.
   */
  const termsFragment = computed(() =>
    snapshot.value ? encodeResult(snapshot.value.payload, snapshot.value.quote, day) : '',
  );

  /**
   * The link the share button hands out.
   *
   * When a share service is configured the code travels in the path rather
   * than the fragment, because a fragment never reaches a server and a chat
   * client therefore cannot see which quote the link is about. That service
   * reads the code, shows a preview of the price, and sends people on here.
   *
   * The current language goes in the path too. A chat client fetches a link
   * once and shows the result to everyone who can see the message, so the
   * preview cannot be written in each reader's language; the best available
   * signal is the language of whoever found the price worth sharing.
   */
  const linkFor = (code) => {
    if (!code) return '';

    const base = globalThis.__SIMULATOR_CONFIG__?.shareBaseUrl;
    if (typeof base === 'string' && base.startsWith('https://')) {
      return `${base}/${locale.value}/${code}`;
    }

    const here = cleanLocation();
    return here ? `${here.origin}${here.path}#${code}` : '';
  };

  /** Everything: opens on the filled-in form. */
  const shareUrl = computed(() => linkFor(fragment.value));

  /** The terms alone: opens on a page that states them and nothing else. */
  const termsUrl = computed(() => linkFor(termsFragment.value));

  const { schedule } = useDebouncedCallback(writeFragment, WRITE_DELAY_MS);

  watch(
    () => [fragment.value, Boolean(active?.value)],
    ([value, on]) => {
      if (on && value) schedule(value);
    },
    { immediate: true },
  );

  return { shareUrl, termsUrl };
}
