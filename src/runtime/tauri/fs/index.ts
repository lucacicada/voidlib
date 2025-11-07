import type { DirEntry as TauriDirEntry } from '@tauri-apps/plugin-fs'
import type { WalkOptions as WalkOptionsCommon } from '../../../common/fs'
import { readDir } from '@tauri-apps/plugin-fs'
import { join } from '../../../common/path'

/** @inheritdoc */
export interface DirEntry extends TauriDirEntry {
  parentPath: string
}

/** @inheritdoc */
export interface WalkOptions<T> extends WalkOptionsCommon<T, DirEntry> {}

/** @inheritdoc */
export async function* walk<T = DirEntry>(path: string | string[], options?: WalkOptions<T>): AsyncGenerator<Awaited<T>, void, unknown> {
  const stack: string[] = Array.isArray(path) ? [...path] : [path]

  while (stack.length > 0) {
    const currentPath = stack.pop()!

    for (const entry of await readDir(currentPath) as DirEntry[]) {
      entry.parentPath = currentPath

      if (options?.include?.(entry) ?? true) {
        yield options?.transform ? await options.transform(entry) : (entry as T)
      }
      else {
        options?.onExcluded?.(entry)
      }

      if (options?.recursive && entry.isDirectory && (options?.recurse?.(entry) ?? true)) {
        stack.push(join(currentPath, entry.name))
      }
    }
  }
}
