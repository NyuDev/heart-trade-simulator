/**
 * Unsigned variable-length integers, seven bits per byte.
 *
 * Amounts, hearts and durations span several orders of magnitude but are
 * almost always small. A fixed width would have to fit the worst case and
 * would waste that room on every ordinary trade; a varint spends one byte on
 * 122 hearts and stretches only when it has to.
 */

const MAX_BYTES = 6;

export function writeVarint(bytes, value) {
  let rest = value;

  do {
    let byte = rest % 128;
    rest = Math.floor(rest / 128);
    if (rest > 0) byte += 128;
    bytes.push(byte);
  } while (rest > 0);
}

export function createVarintReader(bytes, start) {
  let index = start;

  return {
    /** Returns null on a truncated or overlong sequence, never a guess. */
    read() {
      let value = 0;
      let scale = 1;

      for (let step = 0; step < MAX_BYTES; step += 1) {
        if (index >= bytes.length) return null;

        const byte = bytes[index];
        index += 1;
        value += (byte % 128) * scale;

        if (byte < 128) return value;
        scale *= 128;
      }

      return null;
    },

    get exhausted() {
      return index >= bytes.length;
    },
  };
}
