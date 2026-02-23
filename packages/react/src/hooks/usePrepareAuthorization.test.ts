import { address, config, privateKey } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { privateKeyToAccount } from 'viem/accounts'
import { expect, test, vi } from 'vitest'

import { usePrepareAuthorization } from './usePrepareAuthorization.js'

const account = privateKeyToAccount(privateKey)

test('default', async () => {
  const { result } = await renderHook(() =>
    usePrepareAuthorization({
      account: account.address,
      contractAddress: address.wagmiMintExample,
      chainId: config.chains[0].id,
      nonce: 0,
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        "chainId": 1,
        "nonce": 0,
      },
      "dataUpdatedAt": 1675209600000,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "idle",
      "isError": false,
      "isFetched": true,
      "isFetchedAfterMount": true,
      "isFetching": false,
      "isInitialLoading": false,
      "isLoading": false,
      "isLoadingError": false,
      "isPaused": false,
      "isPending": false,
      "isPlaceholderData": false,
      "isRefetchError": false,
      "isRefetching": false,
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "prepareAuthorization",
        {
          "account": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "chainId": 1,
          "contractAddress": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "nonce": 0,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})
