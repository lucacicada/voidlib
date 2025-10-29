/// <reference types="node" />

import type { Dirent, OpenDirOptions, Stats } from 'node:fs'
import type { WalkOptions as WalkOptionsCommon } from '../../../common/fs'
import { stat as nodeStat, opendir } from 'node:fs/promises'
import { join } from 'node:path'

/** @inheritdoc */
export interface WalkOptions<T> extends WalkOptionsCommon<T, Dirent<string>> {
  /**
   * Whether to ignore inaccessible files or directories (due to permissions or non-existence).
   *
   * @default true
   */
  ignoreInaccessible?: boolean

  /**
   * Options to pass to `opendir` when opening directories.
   */
  openDirOptions?: Omit<OpenDirOptions, 'recursive'>
}

/**
 * Walks through a directory, using the Breadth-First Search (BFS) algorithm.
 * It scan a directory before its subdirectories.
 *
 * @template T - The type of the entries yielded by the walk.
 */
export async function* walk<T = Dirent<string>>(path: string, options?: WalkOptions<T>): AsyncGenerator<T, void, unknown> {
  const ignoreInaccessible = options?.ignoreInaccessible ?? true
  const stack: string[] = [path]

  while (stack.length > 0) {
    const currentPath = stack.pop()!

    let dir: AsyncIterable<Dirent<string>>
    try {
      dir = await opendir(currentPath, {
        ...options?.openDirOptions,
        recursive: false,
      })
    }
    catch (err: any) {
      if (err && ignoreInaccessible && (err.code === 'EACCES' || err.code === 'EPERM' || err.code === 'ENOENT')) {
        continue
      }
      else {
        throw err
      }
    }

    for await (const entry of dir) {
      if (options?.include?.(entry) ?? true) {
        let r: T = entry as T

        if (options?.transform) {
          try {
            r = await options.transform(entry)
          }
          // let the user run stat inside the transform, catch the errors automatically
          catch (err: any) {
            if (err && ignoreInaccessible && (err.code === 'EACCES' || err.code === 'EPERM' || err.code === 'ENOENT')) {
              continue
            }
            else {
              throw err
            }
          }
        }

        yield r
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

/**
 * Get the stats of a file or directory.
 *
 * @param path - The path to the file or directory.
 * @returns The stats of the file or directory, or `false` if it does not exist.
 */
export async function stat(path: string): Promise<Stats | false> {
  return await nodeStat(path).catch(() => false)
}

/**
 * Check if a file exists.
 */
export async function fileExists(path: string): Promise<boolean> {
  try {
    return (await nodeStat(path)).isFile()
  }
  catch { }

  return false
}

/**
 * Check if a directory exists.
 */
export async function directoryExists(path: string): Promise<boolean> {
  try {
    return (await nodeStat(path)).isDirectory()
  }
  catch { }

  return false
}
