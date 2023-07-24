import { abi, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { simulateContractQueryOptions } from './simulateContract.js'

test('default', () => {
  expect(
    simulateContractQueryOptions(config, {
      address: '0x',
      abi: abi.erc20,
      functionName: 'transferFrom',
      args: ['0x', '0x', 123n],
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "simulateContract",
        {
          "abi": [
            {
              "inputs": [
                {
                  "name": "sender",
                  "type": "address",
                },
                {
                  "name": "recipient",
                  "type": "address",
                },
                {
                  "name": "amount",
                  "type": "uint256",
                },
              ],
              "name": "transferFrom",
              "outputs": [
                {
                  "type": "bool",
                },
              ],
              "stateMutability": "nonpayable",
              "type": "function",
            },
          ],
          "address": "0x",
          "args": [
            "0x",
            "0x",
            123n,
          ],
          "functionName": "transferFrom",
        },
      ],
    }
  `)
})
