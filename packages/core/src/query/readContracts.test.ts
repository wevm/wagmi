import { abi, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { readContractsQueryOptions } from './readContracts.js'

test('default', () => {
  expect(
    readContractsQueryOptions(config, {
      contracts: [
        {
          address: '0x',
          abi: abi.erc20,
          functionName: 'balanceOf',
          args: ['0x'],
        },
      ],
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "readContracts",
        {
          "contracts": [
            {
              "address": "0x",
              "args": [
                "0x",
              ],
              "chainId": undefined,
              "functionName": "balanceOf",
            },
          ],
        },
      ],
    }
  `)
})
