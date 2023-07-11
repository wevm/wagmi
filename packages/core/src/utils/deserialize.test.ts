import { expect, test } from 'vitest'

import { deserialize } from './deserialize.js'
import { serialize } from './serialize.js'

test('deserializes', () => {
  const deserializedCache = deserialize(
    serialize({
      some: 'complex',
      object: {
        that: 'has',
        many: [
          { many: 'many', manymany: 'many' },
          { many: 'many' },
          { many: 'many' },
          {
            many: {
              properties: {
                ones: {
                  that: {
                    have: {
                      functions: () => null,
                    },
                  },
                },
              },
            },
          },
        ],
      },
      and: {
        ones: {
          that: {
            have: {
              bigints: 123456789012345678901234567890n,
            },
          },
        },
      },
      also: {
        ones: {
          that: {
            have: {
              proxies: new Proxy({ lol: 'nice' }, {}),
            },
          },
        },
      },
    }),
  )
  expect(deserializedCache).toMatchInlineSnapshot(`
      {
        "also": {
          "ones": {
            "that": {
              "have": {
                "proxies": {
                  "lol": "nice",
                },
              },
            },
          },
        },
        "and": {
          "ones": {
            "that": {
              "have": {
                "bigints": 123456789012345678901234567890n,
              },
            },
          },
        },
        "object": {
          "many": [
            {
              "many": "many",
              "manymany": "many",
            },
            {
              "many": "many",
            },
            {
              "many": "many",
            },
            {
              "many": {
                "properties": {
                  "ones": {
                    "that": {
                      "have": {},
                    },
                  },
                },
              },
            },
          ],
          "that": "has",
        },
        "some": "complex",
      }
    `)
})

test('Map', () => {
  const map = new Map().set('foo', { bar: 'baz' })
  const deserializedCache = deserialize(serialize({ map }))
  expect(deserializedCache).toEqual({ map })
})

test('bigint', () => {
  const bigint = 123n
  const deserializedCache = deserialize(serialize({ bigint }))
  expect(deserializedCache).toEqual({ bigint })
})
