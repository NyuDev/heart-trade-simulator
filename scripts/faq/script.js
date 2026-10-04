import { LANGUAGE_CONFIG } from '../../src/i18n/config/languages.js';

/**
 * The only script on either page, and nothing of substance depends on it:
 * every answer is in the document whether or not it runs.
 *
 * It does two small things. It opens the answer a link points at, which a
 * closed row would otherwise swallow. And it keeps the language in step with
 * the application, which stores its own choice in the browser — without this
 * the two halves of the site would disagree the moment someone switched here.
 *
 * Choosing a language is explicit and overwrites whatever was stored. Merely
 * arriving on a page only writes when nothing is stored at all: a link someone
 * sent you is not a decision, and should not undo one made in the application.
 */

const { storageKey, manualKey } = LANGUAGE_CONFIG.persistence;

export function inlineScript(code) {
  const KEY = JSON.stringify(storageKey);
  const MANUAL = JSON.stringify(manualKey);
  const PAGE = JSON.stringify(code);

  return (
    // Reveal the targeted answer, on load and on every later hash change.
    'var reveal=function(){var e=document.getElementById(location.hash.slice(1));' +
    'if(e&&e.tagName==="DETAILS")e.open=true};' +
    'addEventListener("hashchange",reveal);reveal();' +
    // Storage throws outright in private browsing and with site data blocked,
    // so every access is wrapped: losing the preference costs a detection on
    // the next load, which is still correct.
    `var K=${KEY},M=${MANUAL};` +
    'var read=function(){try{return localStorage.getItem(K)}catch(e){return null}};' +
    'var write=function(c,explicit){try{localStorage.setItem(K,c);' +
    'if(explicit)localStorage.setItem(M,"true")}catch(e){}};' +
    `if(!read())write(${PAGE},false);` +
    'document.querySelectorAll(".dropdown-option").forEach(function(a){' +
    'a.addEventListener("click",function(){write(a.getAttribute("lang"),true)})});'
  );
}
