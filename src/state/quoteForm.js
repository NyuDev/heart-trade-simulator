import { reactive } from 'vue';
import { DEFAULT_FORM } from './defaults.js';

/**
 * The settings entered by the user. No pricing rule here, it is only a form.
 *
 * `initial` comes from a shared link. Only the known fields are taken, so a
 * crafted URL cannot smuggle an extra property into the payload sent to the
 * API, and anything missing falls back to its default.
 */
export function createQuoteForm(initial = null) {
  const form = { ...DEFAULT_FORM };

  if (initial) {
    for (const key of Object.keys(DEFAULT_FORM)) {
      if (initial[key] !== undefined) form[key] = initial[key];
    }
  }

  return reactive(form);
}
