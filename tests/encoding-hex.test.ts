import { Buffer } from 'node:buffer'
import { expect, it } from 'vitest'
import { decodeHex, hex, HEX_ALPHABET_LOWER, HEX_ALPHABET_UPPER } from '../src/common/encoding/hex.js'

it.each([
  [''],
  ['00'],
  ['0a1b2c3d4e5f'],
  ['abcdef123456'],
  ['FFFFFFFF'],
])('should be able to decode "%s"', (a) => {
  expect(decodeHex(a)).toStrictEqual(new Uint8Array(Buffer.from(a, 'hex')))
})

it('should encode lowercase by default', () => {
  for (let i = 0; i < 100; i++) {
    const data = crypto.getRandomValues(new Uint8Array(i))
    expect(hex(data)).toBe(Buffer.from(data).toString('hex'))
  }
})

it('should encode lowercase with HEX_ALPHABET_LOWER', () => {
  for (let i = 0; i < 100; i++) {
    const data = crypto.getRandomValues(new Uint8Array(i))
    expect(hex(data, HEX_ALPHABET_LOWER)).toBe(Buffer.from(data).toString('hex'))
  }
})

it('should encode uppercase with HEX_ALPHABET_UPPER', () => {
  for (let i = 0; i < 100; i++) {
    const data = crypto.getRandomValues(new Uint8Array(i))
    expect(hex(data, HEX_ALPHABET_UPPER)).toBe(Buffer.from(data).toString('hex').toUpperCase())
  }
})

it('should decode it\'s own encoded data', () => {
  for (let i = 0; i < 100; i++) {
    const data = crypto.getRandomValues(new Uint8Array(i))
    expect(decodeHex(hex(data, HEX_ALPHABET_LOWER))).toStrictEqual(data)
    expect(decodeHex(hex(data, HEX_ALPHABET_UPPER))).toStrictEqual(data)
  }
})

it('should throw on invalid hex strings', () => {
  expect(() => decodeHex('a')).toThrowError()
  expect(() => decodeHex('x')).toThrowError()
})
