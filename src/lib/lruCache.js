/**
 * Small cache evicting the oldest entry.
 *
 * Keeps an already-seen quote from being asked for twice, so sliding back and
 * forth on a slider is free. Deliberately minimal, no dependency.
 */
export function createLruCache(limit) {
  const entries = new Map();

  return {
    get(key) {
      return entries.get(key);
    },

    set(key, value) {
      entries.set(key, value);
      if (entries.size > limit) entries.delete(entries.keys().next().value);
    },

    get size() {
      return entries.size;
    },
  };
}
