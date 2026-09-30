import { computed } from 'vue';
import { LANGUAGE_CONFIG } from './config/languages.js';
import { locale, setLocale } from './core/locale.js';
import { translate } from './core/translate.js';

/** Composable exposed to the components. */
export function useI18n() {
  return {
    locale: computed(() => locale.value),
    languages: LANGUAGE_CONFIG.supportedLanguages,
    t: translate,
    setLocale,
  };
}
