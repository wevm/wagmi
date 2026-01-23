import { abi, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import {
  readContractsQueryKey,
  readContractsQueryOptions,
} from './readContracts.js'

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
              "functionName": "balanceOf",
            },
          ],
        },
      ],
    }
  `)
})

test('behavior: query key should not change when contracts have explicit chainIds', () => {
  const contracts = [
    {
      address: '0x',
      abi: abi.erc20,
      functionName: 'balanceOf',
      args: ['0x'],
      chainId: 1,
    },
    {
      address: '0x',
      abi: abi.erc20,
      functionName: 'totalSupply',
      chainId: 1,
    },
  ] as const

  const queryKeyChain1 = readContractsQueryKey({ contracts, chainId: 1 })
  const queryKeyChain10 = readContractsQueryKey({ contracts, chainId: 10 })

  expect(queryKeyChain1).toEqual(queryKeyChain10)
})
