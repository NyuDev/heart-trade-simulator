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

  /** The flag artwork lives in components/layout/flags.js, keyed by this code. */
  supportedLanguages: [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
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
