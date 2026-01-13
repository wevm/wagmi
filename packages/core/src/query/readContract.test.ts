import { abi, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { readContractQueryOptions } from './readContract.js'

test('default', () => {
  expect(
    readContractQueryOptions(config, {
      address: '0x',
      abi: abi.erc20,
      functionName: 'balanceOf',
      args: ['0x'],
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "readContract",
        {
          "address": "0x",
          "args": [
            "0x",
          ],
          "functionName": "balanceOf",
        },
      ],
      "structuralSharing": [Function],
    }
  `)
})
