import { config, testChains } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getFeeDataQueryOptions } from './getFeeData.js'

test('default', () => {
  expect(getFeeDataQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "feeData",
        {},
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getFeeDataQueryOptions(config, { chainId: testChains.anvil.id }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "feeData",
        {
          "chainId": 123,
        },
      ],
    }
  `)
})
