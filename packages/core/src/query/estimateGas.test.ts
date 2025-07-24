import { config } from '@wagmi/test'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { estimateGasQueryOptions } from './estimateGas.js'

test('default', () => {
  expect(
    estimateGasQueryOptions(config, {
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "estimateGas",
        {
          "to": "0xd2135CfB216b74109775236E36d4b433F1DF507B",
          "value": 10000000000000000n,
        },
      ],
    }
  `)
})
