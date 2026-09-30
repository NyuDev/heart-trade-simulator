import { onScopeDispose, ref } from 'vue';

const FEEDBACK_MS = 1800;

// The Clipboard API does not always settle: it can sit waiting on a permission
// decision that never comes, and an awaited promise that never resolves leaves
// the button silent forever. A short deadline turns that into a plain failure
// the interface can answer for.
const DEADLINE_MS = 600;

function settleWithin(promise, ms) {
  return Promise.race([
    promise.then(
      () => true,
      () => false,
    ),
    new Promise((resolve) => setTimeout(() => resolve(false), ms)),
  ]);
}

/** Older path, still the only one that works outside a secure context. */
function copyBySelection(text) {
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';

    document.body.append(area);
    area.select();
    const done = document.execCommand('copy');
    area.remove();

    return done;
  } catch {
    return false;
  }
}

/**
 * Copies to the clipboard and says whether it worked.
 *
 * `failed` matters as much as `copied`: a browser can refuse the clipboard, and
 * a button that gives no sign either way leaves the visitor unsure whether to
 * click again.
 */
export function useCopyToClipboard() {
  const copied = ref(false);
  const failed = ref(false);
  let timer = null;

  function announce(success) {
    copied.value = success;
    failed.value = !success;

    clearTimeout(timer);
    timer = setTimeout(() => {
      copied.value = false;
      failed.value = false;
    }, FEEDBACK_MS);
  }

  async function copy(text) {
    let done = false;

    if (navigator.clipboard?.writeText) {
      done = await settleWithin(navigator.clipboard.writeText(text), DEADLINE_MS);
    }
    if (!done) done = copyBySelection(text);

    announce(done);
  }

  onScopeDispose(() => clearTimeout(timer));

  return { copied, failed, copy };
}
