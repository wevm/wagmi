import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { estimateFeesPerGasQueryOptions } from './estimateFeesPerGas.js'

test('default', () => {
  expect(estimateFeesPerGasQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "estimateFeesPerGas",
        {},
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    estimateFeesPerGasQueryOptions(config, { chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "estimateFeesPerGas",
        {
          "chainId": 1,
        },
      ],
    }
  `)
})
