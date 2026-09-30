/**
 * Language configuration.
 *
 * Detection through navigator.languages, time zone as a secondary hint, the
 * choice persisted, and a manual flag so an explicit pick is never overridden
 * by detection.
 */
export const LANGUAGE_CONFIG = {
  /** 'auto' means detect, otherwise a forced language code. */
  defaultLanguage: 'auto',

  /** Language the interface is written in, and translation fallback. */
  sourceLanguage: 'en',

  supportedLanguages: [
    { code: 'en', name: 'English', flag: '\u{1F1EC}\u{1F1E7}' },
    { code: 'fr', name: 'Francais', flag: '\u{1F1EB}\u{1F1F7}' },
  ],

  persistence: {
    enabled: true,
    storageKey: 'selectedLanguage',
    manualKey: 'selectedLanguage_manual',
    detectBrowserLanguage: true,
  },

  autoDetection: {
    enabled: true,
    fallbackLanguage: 'en',
    useNavigatorLanguages: true,
    useTimezone: true,
    priority: 'browser',
  },
};
