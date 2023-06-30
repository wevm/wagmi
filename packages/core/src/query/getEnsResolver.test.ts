import { config, testChains } from '@wagmi/test'
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
    getEnsResolverQueryOptions(config, { chainId: testChains.anvil.id }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "ensResolver",
        {
          "chainId": 123,
        },
      ],
    }
  `)
})
