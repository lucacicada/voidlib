import type { Query } from '../src/common/object'
import { expect, expectTypeOf, it } from 'vitest'
import { queryObject } from '../src/common/object'

const obj = {
  a: 1 as const,
  b: 2,
  stringProperty: 'value',
  items: [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ],
  nested: {
    c: 3,
    d: 4,
    e: 6,
  },
  nestedArray: [
    { id: 1, value: 'Nested Item 1' },
    { id: 2, value: 'Nested Item 2' },
    { id: 3, value: 'Nested Item 3' },
  ],
  nullProperty: null,
  transform: 'into something else',
}

const selector = {
  a: true,
  items: true,
  nested: {
    e: true,
    c: true,
  },
  nestedArray: {
    id: true,
    value: false,
  },
  nullProperty: true,
  transform: () => 'something else',
} as const

type Data = Query<typeof obj, typeof selector>

it('should select 1', () => {
  const output = queryObject(obj, selector)

  expectTypeOf(output).toMatchObjectType<Data>()

  expect(output).toStrictEqual({
    a: 1,
    items: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ],
    nested: {
      e: 6,
      c: 3,
    },
    nestedArray: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ],
    nullProperty: null,
    transform: 'something else',
  })
})
