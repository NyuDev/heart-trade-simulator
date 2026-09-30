/**
 * Fixed-width bit packing.
 *
 * The shareable link is pasted into conversations, so every bit saved is a
 * character the reader does not have to look at. Small fields are written at
 * their real width rather than padded to a byte: seven settings and a dozen
 * indicators fit in six bytes this way.
 */

export function createBitWriter() {
  const bytes = [];
  let accumulator = 0;
  let filled = 0;

  return {
    write(value, width) {
      for (let bit = width - 1; bit >= 0; bit -= 1) {
        accumulator = (accumulator << 1) | ((value >>> bit) & 1);
        filled += 1;

        if (filled === 8) {
          bytes.push(accumulator & 0xff);
          accumulator = 0;
          filled = 0;
        }
      }
    },

    /** Flushes the last, partly filled byte. */
    toBytes() {
      if (filled > 0) {
        bytes.push((accumulator << (8 - filled)) & 0xff);
        accumulator = 0;
        filled = 0;
      }
      return bytes;
    },
  };
}

export function createBitReader(bytes) {
  let index = 0;
  let bit = 0;

  return {
    read(width) {
      let value = 0;

      for (let step = 0; step < width; step += 1) {
        const byte = bytes[index] ?? 0;
        value = (value << 1) | ((byte >> (7 - bit)) & 1);

        bit += 1;
        if (bit === 8) {
          bit = 0;
          index += 1;
        }
      }

      return value >>> 0;
    },

    /** Where the byte-aligned part of the payload starts. */
    get byteIndex() {
      return bit === 0 ? index : index + 1;
    },
  };
}
