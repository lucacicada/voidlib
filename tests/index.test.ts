import { expect, it } from 'vitest'
import { sanitizeFileName } from '../src/common/path'

it.each([
  ['CON', '_CON'],
  ['AUX', '_AUX'],
  ['NUL', '_NUL'],
  ['COM1', '_COM1'],
  ['LPT1', '_LPT1'],
  ['CON.txt', '_CON.txt'],

  ['   ', '_'],
  ['', '_'],
  ['...', '_'],
  ['...   ', '_'],
  ['  ...   ', '_'],

  ['.file.', '.file'],
  ['...file...', '.file'],
  ['...    file   ...', '.file'],
  ['...    file   ...txt', '.file.txt'],

  ['. ..    file   .. .txt', '.file.txt'],
  [' .... . . . .  .     .   . ..    file   .. .  txt  ', '.file.txt'],
  ['. .. file .. .txt', '.file.txt'],

  ['file with spaces.txt', 'file with spaces.txt'],
  ['file@name#with$special%chars&.txt', 'file@name#with$special%chars&.txt'],
  ['invalid/characters:in|filename.txt', 'invalid characters in filename.txt'],
  ['   leading and trailing spaces   ', 'leading and trailing spaces'],

  ['file/./name.txt', 'file name.txt'],
  ['file/../name.txt', 'file name.txt'],
  ['file/./name/./.txt', 'file name.txt'],
  ['file/../name/../.txt', 'file name.txt'],
  ['file/./name/../.txt', 'file name.txt'],
])('sanitizeFileName("%s") -> "%s"', (a, expected) => {
  expect(sanitizeFileName(a)).toBe(expected)
})
