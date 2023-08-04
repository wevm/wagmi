import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { usePrepareSendTransaction } from './usePrepareSendTransaction.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() =>
    usePrepareSendTransaction({
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01'),
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "account": {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "type": "json-rpc",
        },
        "chainId": 123,
        "connector": undefined,
        "gas": 21000n,
        "mode": "prepared",
        "to": "0xd2135CfB216b74109775236E36d4b433F1DF507B",
        "value": 10000000000000000n,
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
        "prepareSendTransaction",
        {
          "account": {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "type": "json-rpc",
          },
          "chainId": 123,
          "to": "0xd2135CfB216b74109775236E36d4b433F1DF507B",
          "value": 10000000000000000n,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)

  await disconnect(config, { connector })
})
