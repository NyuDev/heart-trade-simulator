import { onScopeDispose, ref } from 'vue';

/**
 * Countdown in seconds, with a callback when it reaches zero.
 *
 * Used for the automatic retry after a 429: the visitor sees the time left and
 * has nothing to do.
 */
export function useCountdown(onComplete) {
  const remaining = ref(0);
  let timer = null;

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
    remaining.value = 0;
  }

  function start(seconds) {
    stop();
    remaining.value = seconds;

    timer = setInterval(() => {
      remaining.value -= 1;
      if (remaining.value <= 0) {
        stop();
        onComplete();
      }
    }, 1000);
  }

  onScopeDispose(stop);

  return {
    remaining,
    start,
    stop,
    get isRunning() {
      return timer !== null;
    },
  };
}
