import { ref } from 'vue';
import { LANGUAGE_CONFIG } from '../config/languages.js';
import { detectLanguage } from './detect.js';
import { readStored, writeStored } from './storage.js';

/** Reactive state of the current language. Single source of truth. */
export const locale = ref(LANGUAGE_CONFIG.sourceLanguage);

const SUPPORTED = LANGUAGE_CONFIG.supportedLanguages.map((language) => language.code);

export const isSupported = (code) => SUPPORTED.includes(code);

/** Language to apply on startup: the remembered choice, otherwise detection. */
function initialLanguage() {
  const { persistence } = LANGUAGE_CONFIG;

  if (persistence.enabled) {
    const stored = readStored(persistence.storageKey);
    // An explicit choice always wins over detection, even when the browser
    // says otherwise: the visitor already decided.
    if (stored && isSupported(stored)) return stored;
  }

  return persistence.detectBrowserLanguage
    ? detectLanguage()
    : LANGUAGE_CONFIG.autoDetection.fallbackLanguage;
}

export function setLocale(code, { manual = false } = {}) {
  if (!isSupported(code)) return;

  locale.value = code;
  document.documentElement.lang = code;

  const { persistence } = LANGUAGE_CONFIG;
  if (persistence.enabled && manual) {
    writeStored(persistence.storageKey, code);
    writeStored(persistence.manualKey, 'true');
  }
}

/** Called once on startup, before the first render. */
export function initLocale() {
  setLocale(initialLanguage());
}
