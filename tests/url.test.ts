import { expect, it } from 'vitest'
import { fileURLToPath, pathToFileURL } from '../src/common/url'

it.each([
  ['C:\\test', 'file:///C:/test'],
  ['C:\\test  ', 'file:///C:/test%20%20'],
  ['C:\\test  a ', 'file:///C:/test  a%20'],
  ['C:\\test\\?', 'file:///C:/test/%3F'],
  ['C:\\test\\#', 'file:///C:/test/%23'],
  ['C:\\test\\%25', 'file:///C:/test/%2525'],
  ['C:\\test\\\n', 'file:///C:/test/%0A'],
  ['C:\\test\\\r', 'file:///C:/test/%0D'],
  ['C:\\test\\\t', 'file:///C:/test/%09'],
  ['C:\\test\\a b c', 'file:///C:/test/a b c'],
  ['C:\\test\\a b c#d?e%f', 'file:///C:/test/a b c%23d%3Fe%25f'],
])('pathToFileURL("%s") -> "%s"', (a, expected) => {
  expect(pathToFileURL(a)).toBe(expected)
})

it.each([
  ['file:///C:/test', 'C:/test'],
  ['file:///C:/test%20%20', 'C:/test  '],
  ['file:///C:/test/%3F', 'C:/test/?'],
  ['file:///C:/test/%23', 'C:/test/#'],
  ['file:///C:/test/%2525', 'C:/test/%25'],
  ['file:///C:/test/%0A', 'C:/test/\n'],
  ['file:///C:/test/%0D', 'C:/test/\r'],
  ['file:///C:/test/%09', 'C:/test/\t'],
  ['file:///C:/test/a%20b%20c', 'C:/test/a b c'],
  ['file:///C:/test/a%20b%20c%23d%3Fe%25f', 'C:/test/a b c#d?e%f'],
])('fileURLToPath("%s") -> "%s"', (a, expected) => {
  expect(fileURLToPath(a)).toBe(expected)
})
