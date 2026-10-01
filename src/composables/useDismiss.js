import { onBeforeUnmount, watch } from 'vue';

/**
 * Closes a transient layer the way people expect: Escape, or a click anywhere
 * outside it.
 *
 * Listeners are attached only while the layer is open. A dropdown that keeps a
 * document-wide handler alive for the whole session is a small leak that
 * multiplies once several of them exist on the page.
 */
export function useDismiss(isOpen, container, close) {
  function onPointerDown(event) {
    if (!container.value?.contains(event.target)) close();
  }

  function onKeyDown(event) {
    if (event.key === 'Escape') close();
  }

  function stop() {
    document.removeEventListener('pointerdown', onPointerDown, true);
    document.removeEventListener('keydown', onKeyDown);
  }

  watch(isOpen, (open) => {
    if (open) {
      document.addEventListener('pointerdown', onPointerDown, true);
      document.addEventListener('keydown', onKeyDown);
    } else {
      stop();
    }
  });

  onBeforeUnmount(stop);
}
