import { MESSAGES } from '../messages/index.js';
import { LANGUAGE_CONFIG } from '../config/languages.js';
import { interpolate, lookup } from './interpolate.js';
import { pluralIndex } from './plurals.js';
import { locale } from './locale.js';

/**
 * Translates a dotted key.
 *
 * `count` picks the form in a message with pipe-separated variants, while `n`
 * may then hold the number already formatted for the language.
 *
 * A missing key falls back to the source language, then to the key itself, so
 * the interface never breaks on a forgotten translation.
 */
export function translate(key, params = {}) {
  let message = lookup(MESSAGES[locale.value], key);
  if (message === undefined) message = lookup(MESSAGES[LANGUAGE_CONFIG.sourceLanguage], key);
  if (message === undefined) return key;

  // Arrays, such as tooltip paragraphs, and objects pass straight through.
  if (typeof message !== 'string') return message;

  const count = params.count !== undefined ? params.count : params.n;
  if (message.includes('|') && count !== undefined) {
    const forms = message.split('|').map((form) => form.trim());
    message = forms[pluralIndex(locale.value, count, forms.length)];
  }

  return interpolate(message, params);
}
