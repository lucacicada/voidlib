// Common

/**
 * A no-operation function.
 */
export const NOOP = (): void => {}

/**
 * A function that always returns `false`.
 */
export const FALSE = () => false as const

/**
 * A function that always returns `true`.
 */
export const TRUE = () => false as const

// Primordials

/**
 * Equivalent of `Object.prototype.toString.call(value)`
 *
 * @alias {@link Object.prototype.toString.call}
 */
export const toString = Object.prototype.toString.call as (value: unknown) => string

/**
 * Equivalent of `Object.prototype.hasOwnProperty.call(value, key)`
 *
 * @alias {@link Object.prototype.hasOwnProperty.call}
 */
export const hasOwnProperty = Object.prototype.hasOwnProperty.call as (value: unknown, key: PropertyKey) => boolean

/**
 * Equivalent of `Object.prototype.isPrototypeOf.call(value, obj)`
 *
 * @alias {@link Object.prototype.isPrototypeOf.call}
 */
export const isPrototypeOf = Object.prototype.isPrototypeOf.call as (obj: unknown, value: unknown) => boolean

/**
 * Equivalent of `{}.propertyIsEnumerable.call(value, key)`
 *
 * @alias {@link Object.prototype.propertyIsEnumerable.call}
 */
export const propertyIsEnumerable = {}.propertyIsEnumerable.call as (value: unknown, key: PropertyKey) => boolean

// Constraints

/**
 * Check if the value is `T`.
 *
 * @alias {@link Object.is}
 */
export const is = Object.is as <const T = unknown>(value: unknown, type: T) => value is T

/**
 * @alias {@link Object.values}
 */
export const values = Object.values

/**
 * @alias {@link Object.entries}
 */
export const entries = Object.entries

/**
 * Check if the value is `T[]`.
 *
 * @alias {@link Array.isArray}
 */
export const isArray = Array.isArray as <T = unknown>(value: unknown) => value is T[]

/**
 * Check if the value is an integer `number`.
 *
 * @alias {@link Number.isInteger}
 */
export const isInteger = Number.isInteger as (value: unknown) => value is number

/**
 * Check if the value is a safe integer `number`.
 *
 * @alias {@link Number.isSafeInteger}
 */
export const isSafeInteger = Number.isSafeInteger as (value: unknown) => value is number

/**
 * Check if the value is a finite `number`.
 *
 * @alias {@link Number.isFinite}
 */
export const isFinite = Number.isFinite as (value: unknown) => value is number

/**
 * Check if the value is `NaN`.
 *
 * @alias {@link Number.isNaN}
 */
export const isNaN = Number.isNaN as (value: unknown) => value is number

// Coercions

/**
 * ## Note:
 * This function throws {@link TypeError} when:
 * - The argument is a {@link Symbol}.
 * - The argument is a `object` without [{@link Symbol.toPrimitive}], {@link Object.valueOf} or {@link Object.toString}.
 * - Resolving a primitive either throw or return a non primitive value.
 *
 * @alias {@link Number.parseInt}
 */
export const parseInt = Number.parseInt as (value: unknown, radix?: number | undefined) => number

/**
 * ## Note:
 * This function throws {@link TypeError} when:
 * - The argument is a {@link Symbol}.
 * - The argument is a `object` without [{@link Symbol.toPrimitive}], {@link Object.valueOf} or {@link Object.toString}.
 * - Resolving a primitive either throw or return a non primitive value.
 *
 * @alias {@link Number.parseFloat}
 */
export const parseFloat = Number.parseFloat as (value: unknown, radix?: number | undefined) => number

// Constraints

export function isInfinity(value: unknown): value is number {
  return value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY
}

export function isPositiveInfinity(value: unknown): value is number {
  return value === Number.POSITIVE_INFINITY
}

export function isNegativeInfinity(value: unknown): value is number {
  return value === Number.NEGATIVE_INFINITY
}

export function isZero(value: unknown): value is 0 {
  return value === 0
}

export function isNegativeZero(value: unknown): value is -0 {
  return is(value, -0)
}

/**
 * Check if the value is a `symbol`.
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol'
}

/**
 * Check if the value is a `string`.
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * Check if the value type is a `number`, {@link Infinity} and {@link NaN} are considered numbers.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

/**
 * Check if the value is a finite `number`.
 *
 * Note: to check for `typeof value === 'number'`, use  {@link isNumberType}.
 *
 * _This function uses {@link isFinite}_
 */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && isFinite(value)
}

/**
 * Coerce a type to valid finite numeric string or number (`number` | `string`).
 *
 * _This function uses {@link isFinite}, {@link parseFloat}_
 */
export function isNumeric(val: unknown): val is number | string {
  return (typeof val === 'number' && isFinite(val)) || (typeof val === 'string' && isFinite(parseFloat(val)))
}

/**
 * Check if the value is a `function`.
 */
export function isFunction<T extends (...args: unknown[]) => unknown>(value: unknown): value is T {
  return typeof value === 'function'
}

/**
 * Check if the value is a **non null** `object`.
 */
export function isObject<T = Record<PropertyKey, unknown>>(value: unknown): value is T {
  return value != null && typeof value === 'object'
}

// /**
//  * Check if the value is a **non null**, **non array** `object`.
//  *
//  * Note: If you want to include arrays, use {@link isObjectType} instead.
//  *  - A `null` type is `object` in JavaScript.
//  *  - An array type is `object` in JavaScript.
//  *
//  * _This function uses {@link isArray}_
//  */
// export function isObject<T = Record<PropertyKey, unknown>>(value: unknown): value is T {
//   return value != null && typeof value === 'object' && !isArray(value)
// }

export function isPlainObject(value: unknown): value is object {
  return value != null && typeof value === 'object' && toString(value) === '[object Object]'
}

/**
 * Check if the value is a {@link Date}.
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date
}

/**
 * Check if the value is a finite {@link Date}.
 *
 * _This function uses {@link isFinite}_
 */
export function isFiniteDate(value: unknown): value is Date {
  return value instanceof Date && isFinite(+value)
}

/**
 * Check if the value is a `Promise<T>` instance.
 */
export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return typeof value !== 'undefined' && value instanceof Promise
}

/**
 * Check if the value is a `PromiseLike<T>`.
 */
export function isPromiseLike<T = unknown>(value: unknown): value is PromiseLike<T> {
  return typeof value === 'object' && value != null && 'then' in value && typeof value.then === 'function'
}

/**
 * Alias of isPromiseLike
 */
export function isAwaitable<T = unknown>(value: unknown): value is PromiseLike<T> {
  return typeof value === 'object' && value != null && 'then' in value && typeof value.then === 'function'
}

/**
 * Check if the value is an `AsyncIterable<T>`.
 */
export function isAsyncIterable<T = unknown>(value: unknown): value is AsyncIterable<T> {
  return typeof value === 'object' && value != null && Symbol.asyncIterator in value && typeof value[Symbol.asyncIterator] === 'function'
}

/**
 * Returns a boolean indicating whether or not an absolute URL, or a relative URL combined with a base URL, are parsable and valid.
 */
export function canParseUrl(url: string | URL, base?: string | URL): boolean {
  if (URL.canParse) {
    return URL.canParse(url, base)
  }

  try {
    return Boolean(new URL(url, base))
  }
  catch {
    return false
  }
}

// Coercions

export function asUrl(url: unknown, base?: unknown): URL | null {
  try {
    return new URL(url as any, base as any)
  }
  catch {
    return null
  }
}

export function asUrlString(value: unknown, base?: unknown): string | null {
  return asUrl(value, base)?.href || null
}

/**
 * Coerce the value.
 *
 * _This function uses {@link parseInt}, {@link isSafeInteger}_
 */
export function asSafeInteger(value: unknown): number | undefined {
  if (typeof value === 'string') {
    value = parseInt(value)
  }

  return isSafeInteger(value) ? value : undefined
}

/**
 * Coerce the value.
 *
 * _This function uses {@link parseFloat}, {@link isFinite}_
 */
export function asNumber(value: unknown): number | undefined {
  if (typeof value === 'string') {
    value = parseFloat(value)
  }

  return isFinite(value) ? value : undefined
}

/**
 * Coerce the value.
 *
 * - On `undefined` or `null`, returns an empty string `""`
 * - On `typeof value === 'string'`, returns `value`
 * - On a {@link isFinite} number, returns the finite number as a string
 * - On a **non** finite number, returns an empty string `""`
 *
 * _This function uses {@link isFinite}_
 *
 * ### Note
 *
 * This function is not a replacement for `String(<value>)`
 */
export function asString(value: unknown): string {
  if (value == null) {
    return ''
  }

  if (isFinite(value)) {
    return String(value)
  }

  return String(value)
}

/**
 * Coerce the value.
 *
 * _This function uses {@link isArray}_
 */
export function asArray<T = unknown>(value: unknown): T[] {
  return isArray<T>(value) ? value : []
}

/**
 * Coerce the value.
 *
 * _This function uses {@link isObject}_
 */
export function asObject<T = Record<PropertyKey, unknown>>(value: unknown): T | undefined {
  return isObject<T>(value) ? value : undefined
}

/**
 * Coerce the value.
 *
 * _This function uses {@link isFunction}_
 */
export function asFunction<T extends (...args: unknown[]) => unknown>(value: unknown): T | undefined {
  return isFunction<T>(value) ? value : undefined
}

// Utils

export function sleep(timeout: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

// can be useful for with Promise.race
export function timeout(timeout: number): Promise<void> {
  return new Promise((_resolve, reject) => {
    setTimeout(reject, timeout)
  })
}

export function hasMethod(value: unknown, method: PropertyKey) /* : value is object */ {
  return typeof value === 'object' && value !== null && method in value && typeof value[method as keyof typeof value] === 'function'
}

/**
 * Represents a deferred promise.
 */
export interface DeferredPromise<T> {
  /**
   * The deferred promise, you can use this promise to await on the result.
   */
  promise: Promise<T>

  /**
   * Invoke this function to resolve the promise.
   */
  resolve: (value: T | PromiseLike<T>) => void

  /**
   * Invoke this function to reject the promise.
   */
  reject: (reason?: any) => void
}

/**
 * Defer a promise.
 *
 * #### Note
 * _This is an advanced hack, use it with extreme caution!_
 */
export function deferPromise<T = void>(): DeferredPromise<T> {
  let resolveFn: any
  let rejectFn: any

  const promise = new Promise<T>((resolve, reject) => {
    resolveFn = resolve
    rejectFn = reject
  })

  return {
    promise,
    resolve: resolveFn!,
    reject: rejectFn!,
  }
}

/**
 * Represents an asynchronous operation that can be resolved or rejected.
 */
export interface Task<T> extends Promise<T> {
  /**
   * Invoke this function to resolve the promise.
   */
  resolve: (value: T | PromiseLike<T>) => void

  /**
   * Invoke this function to reject the promise.
   */
  reject: (reason?: any) => void
}

/**
 * Creates a {@link Task}.
 *
 * #### Note
 * _This is even a more advanced hack then {@link deferPromise}, use it with extreme caution!_
 */
export function task<T = void>(): Task<T> {
  let resolveFn: any
  let rejectFn: any

  const promise: any = new Promise<T>((resolve, reject) => {
    resolveFn = resolve
    rejectFn = reject
  })

  promise.resolve = resolveFn!
  promise.resolve = rejectFn!

  return promise
}

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
 */
export async function mapAsync<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => U | Promise<U>): Promise<U[]> {
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

export function omitUndefined<const T extends Record<PropertyKey, unknown>>(obj: T) {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined)) as {
    [K in keyof T as Exclude<T[K], undefined> extends never ? never : K]: Exclude<T[K], undefined>
  }
}

export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}

export function nullo(): object {
  return Object.create(null)
}
