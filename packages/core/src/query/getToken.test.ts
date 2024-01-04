import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getTokenQueryOptions } from './getToken.js'

test('default', () => {
  expect(getTokenQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "token",
        {},
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getTokenQueryOptions(config, { chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "token",
        {
          "chainId": 1,
        },
      ],
    }
  `)
})
