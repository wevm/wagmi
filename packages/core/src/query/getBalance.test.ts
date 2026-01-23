import { accounts, chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getBalanceQueryOptions } from './getBalance.js'

const address = accounts[0]

test('default', () => {
  expect(getBalanceQueryOptions(config, { address })).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "balance",
        {
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
        },
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getBalanceQueryOptions(config, { address, chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "balance",
        {
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "chainId": 1,
        },
      ],
    }
  `)
})
