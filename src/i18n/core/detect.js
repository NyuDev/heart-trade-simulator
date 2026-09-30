import { LANGUAGE_CONFIG } from '../config/languages.js';
import { TIMEZONE_LANGUAGES } from '../config/timezones.js';

const SUPPORTED = LANGUAGE_CONFIG.supportedLanguages.map((language) => language.code);

/** First supported language among the browser preferences. */
function fromNavigator() {
  const preferences = navigator.languages?.length
    ? navigator.languages
    : [navigator.language].filter(Boolean);

  for (const preference of preferences) {
    const code = String(preference).split('-')[0].toLowerCase();
    if (SUPPORTED.includes(code)) return code;
  }

  return null;
}

/** Geographic hint, when the browser says nothing usable. */
function fromTimezone() {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const guess = TIMEZONE_LANGUAGES[zone];
    return guess && SUPPORTED.includes(guess) ? guess : null;
  } catch {
    return null;
  }
}

/** Automatic detection, in order: browser, then time zone. */
export function detectLanguage() {
  const { autoDetection, defaultLanguage } = LANGUAGE_CONFIG;

  if (defaultLanguage !== 'auto' || !autoDetection.enabled) {
    return SUPPORTED.includes(defaultLanguage) ? defaultLanguage : autoDetection.fallbackLanguage;
  }

  if (autoDetection.useNavigatorLanguages) {
    const fromBrowser = fromNavigator();
    if (fromBrowser) return fromBrowser;
  }

  if (autoDetection.useTimezone) {
    const guessed = fromTimezone();
    if (guessed) return guessed;
  }

  return autoDetection.fallbackLanguage;
}
