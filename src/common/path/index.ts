import {
  join as _join,
  normalize as _normalize,
  relative as _relative,
  resolve as _resolve,
} from 'pathe'

// TODO: Reimplement or just re-export!
export const join = _join as (...paths: string[]) => string
export const normalize = _normalize as (path: string) => string
export const relative = _relative as (from: string, to: string) => string
export const resolve = _resolve as (...paths: string[]) => string

// eslint-disable-next-line regexp/prefer-w, regexp/use-ignore-case
const ASCII_RX = /[^A-Za-z0-9!#$%&'*+,\-;=@[\]^_`{}~.]/g

/**
 * Sanitize a file name by removing invalid characters and normalizing the format.
 *
 * - Directory traversal sequences (`./`, `../`) are replaced with a space.
 * - Invalid characters {@link invalidPattern} are replaced with a space.
 * - Consecutive whitespace is replaced with a single space.
 * - Consecutive dots are replaced with a single dot.
 * - Whitespace around dots is removed.
 * - Leading and trailing whitespace is removed.
 * - Trailing dots are discarded.
 * - Empty filenames return `_` (underscore).
 *
 * ## Note:
 * Reserved Windows filenames (e.g. `CON`, `PRN`, `AUX`, `NUL`, `COM1`, etc.) are prefixed with an underscore. (e.g. `_CON`)
 * This is to avoid conflicts with reserved names in Windows.
 *
 * @param dirname - The file name to sanitize.
 * @param invalidPattern - A regex pattern or string to match invalid characters. Defaults /[^\w!#$%&'*+,\-;=@[\]^`{}~.]/g
 */
export function sanitizeFileName(dirname: string, invalidPattern: string | RegExp = ASCII_RX): string {
  dirname = dirname
    // Replace directory traversal sequences with a space
    .replace(/\.{1,2}[\\/]/g, ' ')

    // Replace invalid characters with a space
    .replace(invalidPattern, ' ')

    // Normalize whitespace
    .replace(/\s+/g, ' ')

    // Dots must not be surrounded by spaces
    .replace(/\. /g, '.')
    .replace(/ \./g, '.')

    // Remove leading and trailing whitespace
    .trim()

    // Normalize dots
    .replace(/\.{2,}/g, '.')

    // Remove trailing dots
    .replace(/[. ]+$/, '')

  // Empty filenames are not allowed, return '_'
  if (dirname.length === 0) {
    return '_'
  }

  // Prefix reserved Windows filenames with an underscore '_'
  if (/^(?:CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\..*)?$/i.test(dirname)) {
    return `_${dirname}`
  }

  // Sanity check, this should not happen.
  // Filenames that consist only of dots or spaces must return '_'
  if (/^\.+$/.test(dirname)) {
    return '_'
  }

  return dirname
}
