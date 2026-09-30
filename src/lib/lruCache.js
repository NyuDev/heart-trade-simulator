/**
 * Small cache evicting whatever was used least recently.
 *
 * Reading an entry moves it back to the front. Without that the map would
 * evict by insertion order, and the settings someone keeps coming back to
 * would be thrown out while values seen once survived. A Map preserves
 * insertion order, so re-inserting on read is all the bookkeeping needed.
 */
export function createLruCache(limit) {
  const entries = new Map();

  return {
    get(key) {
      if (!entries.has(key)) return undefined;

      const value = entries.get(key);
      entries.delete(key);
      entries.set(key, value);

      return value;
    },

    set(key, value) {
      entries.delete(key);
      entries.set(key, value);
      if (entries.size > limit) entries.delete(entries.keys().next().value);
    },

    get size() {
      return entries.size;
    },
  };
}
