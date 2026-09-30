/** Facade of the language module: nothing else is imported elsewhere. */
export { useI18n } from './useI18n.js';
export { translate } from './core/translate.js';
export { initLocale, setLocale, locale } from './core/locale.js';
export { detectLanguage } from './core/detect.js';
export { formatNumber } from './core/number.js';
