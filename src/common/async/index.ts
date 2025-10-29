/**
 * Wraps a value in a {@link Promise}.
 */
export function promise<T>(value: T): Promise<Awaited<T>> {
  return Promise.resolve(value)
}

/**
 * A function that returns a {@link Promise} of type T.
 */
export type AsyncFn<T> = () => Promise<T>

/**
 * Executes asynchronous tasks with a concurrency limit.
 *
 * @example
 * ```ts
 * const items = [1, 2, 3, 4, 5]
 * const results = await concurrent(items.map(item => async () => {
 *   // Simulate an asynchronous operation
 *   await new Promise(resolve => setTimeout(resolve, 1000))
 *   return item * 2
 * }), 2)
 *
 * console.log(results) // [2, 4, 6, 8, 10]
 * ```
 */
export async function concurrent<T>(tasks: AsyncFn<T>[], limit: number): Promise<T[]> {
  const results: T[] = []
  let index = 0

  const worker = async (): Promise<void> => {
    while (index < tasks.length) {
      const i = index++
      results[i] = await tasks[i]!()
    }
  }

  const workers = Array.from({ length: limit }, () => worker())
  await Promise.all(workers)
  return results
}

/**
 * Split an array into chunks, then await all promises in each chunk before proceeding to the next.
 */
export async function batch<T, U>(array: T[], batchSize: number, callback: (item: T) => Promise<U>): Promise<U[]> {
  const results: U[] = []

  for (let i = 0; i < array.length; i += batchSize) {
    const batch = array.slice(i, i + batchSize)
    const batchResults = await Promise.all(batch.map(callback))
    results.push(...batchResults)
  }

  return results
}
