import { QueryClient } from '@tanstack/query-core'
import { abi, accounts, address, config } from '@wagmi/test'
import { afterEach, expect, test } from 'vitest'

import { simulateContractQueryOptions } from './simulateContract.js'

const queryClient = new QueryClient()

afterEach(() => queryClient.clear())

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
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "simulateContract",
        {
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

test('parameters: account without connector', async () => {
  const options = simulateContractQueryOptions(config, {
    account: accounts[1],
    address: address.wagmiMintExample,
    abi: abi.wagmiMintExample,
    functionName: 'mint',
  })
  expect(options.enabled).toBe(true)

  const result = await queryClient.fetchQuery(options)
  expect(result.request.account).toEqual({
    address: accounts[1],
    type: 'json-rpc',
  })
})

test('behavior: account and connector missing', async () => {
  const options = simulateContractQueryOptions(config, {
    address: address.wagmiMintExample,
    abi: abi.wagmiMintExample,
    functionName: 'mint',
  })
  expect(options.enabled).toBe(false)
  await expect(queryClient.fetchQuery(options)).rejects.toThrow(
    'account or connector is required',
  )
})
