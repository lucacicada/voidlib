export type Query<TObject, TSelector> = {
  [K in Extract<keyof TSelector, keyof TObject> as TSelector[K] extends false ? never : K]:
  TSelector[K] extends true
    ? TObject[K]
    : TSelector[K] extends object
      ? TObject[K] extends Array<infer U>
        ? Array<Query<U, TSelector[K]>>
        : TObject[K] extends object
          ? Query<TObject[K], TSelector[K]>
          : never
      : never
} extends infer O ? { [K in keyof O]: O[K] } : never

type Selector<TObject, TSelector> = {
  [K in keyof TSelector]: K extends keyof TObject ? TSelector[K] : never
}

/**
 * Query a relational object based on a selector.
 */
export function queryObject<T, S>(obj: T, selector: Selector<T, S>): Query<T, S> {
  if (selector === true) {
    return obj as any
  }

  if (selector === false) {
    return undefined as any
  }

  if (obj == null) {
    return {} as any
  }

  return queryObjectNested(obj, selector, obj, obj) as any
}

function queryObjectNested(obj: any, selector: any, root: any, current: any): any {
  if (selector === true) {
    return obj
  }

  if (selector === false) {
    return undefined
  }

  if (obj == null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj
      .map(item => queryObjectNested(item, selector, root, obj))
      .filter(v => v !== undefined)
  }

  if (typeof obj === 'object') {
    const result: any = {}

    for (const key in selector) {
      if (key === '__proto__' || key === 'constructor') {
        continue
      }

      const sel = selector[key]
      if (sel == null || sel === false) {
        continue
      }

      if (!(key in obj)) {
        continue
      }

      const val = obj[key]
      if (val === undefined) {
        continue
      }

      if (val === null) {
        result[key] = null
      }
      else if (typeof sel === 'function') {
        result[key] = sel(val, obj, root, current)
      }
      else if (typeof val === 'object' || Array.isArray(val)) {
        result[key] = queryObjectNested(val, sel, root, obj)
      }
      else {
        result[key] = val
      }
    }

    return result
  }

  return obj
}
