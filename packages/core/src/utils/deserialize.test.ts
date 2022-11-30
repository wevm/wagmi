import { BigNumber } from 'ethers'
import { describe, expect, it } from 'vitest'

import { deserialize } from './deserialize'

describe('deserialize', () => {
  it('deserializes', () => {
    const deserializedCache = deserialize(
      JSON.stringify({
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
                bignumbers: BigNumber.from('0x01'),
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
                "bignumbers": {
                  "hex": "0x01",
                  "type": "BigNumber",
                },
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
})
