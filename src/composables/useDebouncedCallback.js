import { onScopeDispose } from 'vue';

/**
 * Holds a call back while new ones keep arriving.
 *
 * This is what turns a slider sweep into one request instead of one per move.
 */
export function useDebouncedCallback(callback, delayMs) {
  let timer = null;

  const cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };

  const schedule = (...args) => {
    cancel();
    timer = setTimeout(() => callback(...args), delayMs);
  };

  onScopeDispose(cancel);

  return { schedule, cancel };
}
