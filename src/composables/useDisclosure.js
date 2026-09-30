import { ref } from 'vue';

/** Open/closed state of a revealable element, with its three actions. */
export function useDisclosure(initial = false) {
  const isOpen = ref(initial);

  return {
    isOpen,
    open: () => {
      isOpen.value = true;
    },
    close: () => {
      isOpen.value = false;
    },
    toggle: () => {
      isOpen.value = !isOpen.value;
    },
  };
}
