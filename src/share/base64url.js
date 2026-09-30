/**
 * Bytes as URL-safe text.
 *
 * Plain base64 uses `+`, `/` and `=`, which a URL escapes into percent codes
 * and a chat client is liable to mangle. The URL-safe alphabet survives both
 * untouched, and the padding is dropped because the length already says how
 * many bytes there are.
 */

export function bytesToBase64Url(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);

  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

export function base64UrlToBytes(text) {
  if (typeof text !== 'string' || !/^[A-Za-z0-9_-]+$/.test(text)) return null;

  const standard = text.replaceAll('-', '+').replaceAll('_', '/');
  const remainder = standard.length % 4;
  if (remainder === 1) return null;

  const padded = remainder ? standard + '='.repeat(4 - remainder) : standard;

  try {
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return bytes;
  } catch {
    return null;
  }
}
