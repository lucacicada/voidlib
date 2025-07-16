/// <reference types="node" />

import type { Dirent } from 'node:fs'
import { opendir } from 'node:fs/promises'
import { join } from 'node:path'

export interface WalkOptions<T> {
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
  include?: (entry: Dirent<string>) => boolean

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
  recurse?: (entry: Dirent<string>) => boolean

  /**
   * Transform the entry before yielding it.
   */
  transform?: (entry: Dirent<string>) => T | Promise<T>

  /**
   * Callback for when an entry is excluded.
   */
  onExcluded?: (entry: Dirent<string>) => void
}

/**
 * Walks through a directory, using the Breadth-First Search (BFS) algorithm.
 * It scan a directory before its subdirectories.
 */
export async function* walk<T = Dirent<string>>(path: string, options?: WalkOptions<T>) {
  const stack: string[] = [path]

  while (stack.length > 0) {
    const currentPath = stack.pop()!

    for await (const entry of await opendir(currentPath)) {
      if (options?.include?.(entry) ?? true) {
        yield options?.transform ? await options.transform(entry) : (entry as T)
      }
      else {
        options?.onExcluded?.(entry)
      }

      if (options?.recursive && entry.isDirectory() && (options?.recurse?.(entry) ?? true)) {
        stack.push(join(entry.parentPath, entry.name))
      }
    }
  }
}
