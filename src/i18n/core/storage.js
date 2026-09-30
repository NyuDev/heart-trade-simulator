/**
 * Local storage access, tolerant of refusals.
 *
 * In private browsing, or with site data blocked, localStorage throws. These
 * two functions absorb the failure: without persistence the detection simply
 * runs again on the next load, which is still correct.
 */

export function readStored(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStored(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
