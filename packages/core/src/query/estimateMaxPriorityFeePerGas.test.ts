import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { estimateMaxPriorityFeePerGasQueryOptions } from './estimateMaxPriorityFeePerGas.js'

test('default', () => {
  expect(
    estimateMaxPriorityFeePerGasQueryOptions(config),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "estimateMaxPriorityFeePerGas",
        {},
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    estimateMaxPriorityFeePerGasQueryOptions(config, {
      chainId: chain.mainnet.id,
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "estimateMaxPriorityFeePerGas",
        {
          "chainId": 1,
        },
      ],
    }
  `)
})
