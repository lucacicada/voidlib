/**
 * Represents options for walking through a directory structure.
 *
 * @template T - The type of the entries yielded by the walk.
 * @template TEntry - The runtime-specific type of the entries.
 */
export interface WalkOptions<T, TEntry> {
  /**
   * Set to `true` to recursively walk through subdirectories.
   *
   * @default false
   */
  recursive?: boolean

  /**
   * Return `false` to skip the entry from being yielded.
   *
   * Excluding directories will *not* prevent them from being recursed into.
   * If you want to prevent recursion into a directory, use {@link recurse}.
   *
   * By default, all entries are included.
   */
  include?: (entry: TEntry) => boolean

  /**
   * Return `false` to skip recursing into the directory.
   *
   * The directory will still be yielded, use {@link include} to skip yielding it.
   *
   * By default, all directories are recursed into.
   *
   * #### Note:
   * Called only if {@link recursive} is `true`.
   */
  recurse?: (entry: TEntry) => boolean

  /**
   * Transform the entry before yielding it.
   */
  transform?: (entry: TEntry) => T | Promise<T>

  /**
   * Callback for when an entry is excluded.
   */
  onExcluded?: (entry: TEntry) => void
}

/**
 * Walks through a directory, using the Breadth-First Search (BFS) algorithm.
 * It scan a directory before its subdirectories.
 *
 * @template T - The type of the entries yielded by the walk.
 */
export async function* walk<T = unknown>(_path: string, _options?: WalkOptions<T, unknown>): AsyncGenerator<Awaited<T>, void, unknown> {
  throw new Error('File system is not supported for the current runtime')
}
