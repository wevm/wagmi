import { accounts, wait } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { ref } from 'vue'
import { deepUnref } from '../utils/cloneDeep.js'
import { useEstimateGas } from './useEstimateGas.js'

test('default', async () => {
  const [result] = renderComposable(() =>
    useEstimateGas({
      account: accounts[0],
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
    }),
  )

  await waitFor(result.isSuccess)

  expect(deepUnref(result)).toMatchInlineSnapshot(`
    {
      "data": 21000n,
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
        "estimateGas",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chainId": 1,
          "to": "0xd2135CfB216b74109775236E36d4b433F1DF507B",
          "value": 10000000000000000n,
        },
      ],
      "refetch": [Function],
      "status": "success",
      "suspense": [Function],
    }
  `)
})

test('behavior: address: undefined -> defined', async () => {
  const address = ref()

  const [result] = renderComposable(() =>
    useEstimateGas({
      account: address,
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
    }),
  )

  await wait(100)
  expect(result.fetchStatus.value).toBe('idle')

  address.value = accounts[0]

  await waitFor(result.isSuccess)

  expect(deepUnref(result)).toMatchInlineSnapshot(`
    {
      "data": 21000n,
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
        "estimateGas",
        {
          "account": undefined,
          "chainId": 1,
          "to": "0xd2135CfB216b74109775236E36d4b433F1DF507B",
          "value": 10000000000000000n,
        },
      ],
      "refetch": [Function],
      "status": "success",
      "suspense": [Function],
    }
  `)
})
