import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { usePrepareTransactionRequest } from './usePrepareTransactionRequest.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() =>
    usePrepareTransactionRequest({
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      value: parseEther('1'),
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  const {
    data: {
      gas: _gas,
      maxFeePerGas: _mfpg,
      maxPriorityFeePerGas: _mpfpg,
      nonce: _nonce,
      ...data
    } = {},
    ...rest
  } = result.current

  expect(data).toMatchInlineSnapshot(`
    {
      "chainId": 1,
      "from": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
      "type": "eip1559",
      "value": 1000000000000000000n,
    }
  `)
  expect(rest).toMatchInlineSnapshot(`
    {
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
        "prepareTransactionRequest",
        {
          "chainId": 1,
          "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "value": 1000000000000000000n,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)

  await disconnect(config, { connector })
})
