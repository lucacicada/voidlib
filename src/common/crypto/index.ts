/**
 * Implements a constant-time comparison algorithm.
 *
 * @param a Original string (running time is always proportional to its length)
 * @param b String to compare to original string
 * @returns Returns true if `a` is equal to `b`, without leaking timing information  that would allow an attacker to guess one of the values.
 */
export function fixedTimeComparison(a: string, b: string): boolean {
  let mismatch = a.length === b.length ? 0 : 1

  if (mismatch) {
    b = a
  }

  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return mismatch === 0
}

export type DigestData = BufferSource | Uint8Array | string

export async function digest(alg: AlgorithmIdentifier, data: DigestData): Promise<ArrayBuffer> {
  return await crypto.subtle.digest(alg, typeof data === 'string' ? new TextEncoder().encode(data) : data as any)
}

const keyLengths: Record<string, number> = {
  'SHA-1': 20,
  // 'SHA-256': 32,
  'SHA-384': 48,
  'SHA-512': 64,

  'RSA-OAEP': 256,
  'RSA-PSS': 256,
  'RSA-ES': 256,
}

/**
 * Gets the key length in bytes for a given hash algorithm.
 * - `SHA-1`: 20 bytes
 * - `SHA-256`: 32 bytes
 * - `SHA-384`: 48 bytes
 * - `SHA-512`: 64 bytes
 * - `RSA-OAEP`: 256 bytes
 * - `RSA-PSS`: 256 bytes
 * - `RSA-ES`: 256 bytes
 *
 * ### Note: Unsupported algorithms default to 32 bytes.
 */
export function klen(alg: HashAlgorithmIdentifier): number {
  const name = (typeof alg === 'string' ? alg : alg.name).toUpperCase()
  return keyLengths[name] ?? 32
}
