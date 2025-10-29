/**
 * Represents the lowercase hex alphabet.
 */
export const HEX_ALPHABET_LOWER = '0123456789abcdef' as const

/**
 * Represents the uppercase hex alphabet.
 */
export const HEX_ALPHABET_UPPER = '0123456789ABCDEF' as const

/**
 * A map for decoding hex characters to their numeric values.
 * It contains both uppercase and lowercase characters.
 */
export const HEX_DECODE_MAP: Record<string, number> = Object.freeze({
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15,
})

/**
 * Encodes a Uint8Array to a hex string.
 * Pass in a custom alphabet to use different characters, by default lowercase is used.
 *
 * ### Note: This function does not validate input data.
 */
export function hex(data: Uint8Array, alphabet: string = HEX_ALPHABET_LOWER): string {
  let r = ''
  for (let i = 0; i < data.length; i++) {
    r += alphabet[data[i]! >> 4]
    r += alphabet[data[i]! & 0x0F]
  }
  return r
}

/**
 * Decodes a hex string to a Uint8Array.
 * Throws an error if the input string is not valid hex.
 */
export function decodeHex(data: string): Uint8Array {
  if (data.length % 2 !== 0) {
    throw new Error('Invalid hex string')
  }
  const r = new Uint8Array(data.length / 2)
  for (let i = 0; i < data.length; i += 2) {
    if (!(data[i]! in HEX_DECODE_MAP)) {
      throw new Error('Invalid character')
    }
    if (!(data[i + 1]! in HEX_DECODE_MAP)) {
      throw new Error('Invalid character')
    }
    r[i / 2]! |= HEX_DECODE_MAP[data[i]!]! << 4
    r[i / 2]! |= HEX_DECODE_MAP[data[i + 1]!]!
  }
  return r
}
