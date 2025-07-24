import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getEnsResolverQueryOptions } from './getEnsResolver.js'

test('default', () => {
  expect(getEnsResolverQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "ensResolver",
        {},
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getEnsResolverQueryOptions(config, { chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "ensResolver",
        {
          "chainId": 1,
        },
      ],
    }
  `)
})
