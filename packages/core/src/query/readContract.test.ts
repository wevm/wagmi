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
      "queryFn": [Function],
      "queryKey": [
        "readContract",
        {
          "abi": [
            {
              "inputs": [
                {
                  "name": "account",
                  "type": "address",
                },
              ],
              "name": "balanceOf",
              "outputs": [
                {
                  "type": "uint256",
                },
              ],
              "stateMutability": "view",
              "type": "function",
            },
          ],
          "address": "0x",
          "args": [
            "0x",
          ],
          "functionName": "balanceOf",
        },
      ],
    }
  `)
})
