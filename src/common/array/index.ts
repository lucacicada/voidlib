/**
 * Shuffle an array using the Fisher-Yates algorithm with the built-in {@link Math.random} function.
 */
export function shuffle<T>(array: T[]): T[] {
  const length = array == null ? 0 : array.length

  if (!length) {
    return []
  }

  let index = -1
  const lastIndex = length - 1
  const result: T[] = [...array]

  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    const value = result[rand]!
    result[rand] = result[index]!
    result[index] = value
  }

  return result
}

/**
 * Map an array.
 * For the asynchronous version, see {@link maps}.
 */
export function map<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => U): U[] {
  const length = array == null ? 0 : array.length

  if (!length) {
    return []
  }

  return array.map(callbackfn)
}

/**
 * Map an array asynchronously awaiting on each iteration.
 * For the synchronous version, see {@link map}.
 */
export async function maps<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => U | Promise<U>): Promise<U[]> {
  const length = array == null ? 0 : array.length

  if (!length) {
    return []
  }

  let index = -1
  const result: U[] = []

  while (++index < length) {
    result[index] = await callbackfn(array[index]!, index, array)
  }

  return result
}

/**
 * Split an array into chunks.
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = []

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }

  return result
}

/**
 * Split an array into chunks using a generator.
 */
export function* chunkify<T>(array: T[], size: number): Generator<T[], void, unknown> {
  for (let i = 0; i < array.length; i += size) {
    yield array.slice(i, i + size)
  }
}
