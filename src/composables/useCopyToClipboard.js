import { ref } from 'vue';

const FEEDBACK_MS = 1800;

/**
 * Copies to the clipboard, with a short acknowledgement.
 *
 * Falls back to the older method when the modern API is refused: it is only
 * available in a secure context, which rules out plain http access.
 */
export function useCopyToClipboard() {
  const copied = ref(false);

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.append(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }

    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, FEEDBACK_MS);
  }

  return { copied, copy };
}
