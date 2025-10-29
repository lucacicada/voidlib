/**
 * Encode a string into a Uint8Array using UTF-8 encoding.
 *
 * @param value The string to encode.
 * @returns A Uint8Array representing the UTF-8 encoded string.
 */
export function stringToBuffer(value: string): Uint8Array {
  return new TextEncoder().encode(value)
}

/**
 * Decode a Uint8Array into a string using UTF-8 encoding.
 *
 * @param buffer The Uint8Array to decode.
 * @returns A string decoded from the Uint8Array.
 */
export function bufferToString(buffer: Uint8Array): string {
  return new TextDecoder().decode(buffer)
}
