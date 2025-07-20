/// <reference types="node" />

import type { Dirent } from 'node:fs'
import type { WalkOptions as WalkOptionsCommon } from '../../../common/fs'
import { opendir } from 'node:fs/promises'
import { join } from 'node:path'

/** @inheritdoc */
export interface WalkOptions<T> extends WalkOptionsCommon<T, Dirent<string>> {}

/** @inheritdoc */
export async function* walk<T = Dirent<string>>(path: string, options?: WalkOptions<T>): AsyncGenerator<Awaited<T>, void, unknown> {
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
