import { connect, disconnect } from '@wagmi/core'
import { config, wait } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useConnect } from './useConnect.js'
import { useConnectorClient } from './useConnectorClient.js'
import { useDisconnect } from './useDisconnect.js'
import { useSwitchChain } from './useSwitchChain.js'

const connector = config.connectors[0]!

test('default', async () => {
  const { result } = renderHook(() => useConnectorClient())

  await waitFor(() => expect(result.current.isPending).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": undefined,
      "dataUpdatedAt": 0,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "idle",
      "isError": false,
      "isFetched": false,
      "isFetchedAfterMount": false,
      "isFetching": false,
      "isInitialLoading": false,
      "isLoading": false,
      "isLoadingError": false,
      "isPaused": false,
      "isPending": true,
      "isPlaceholderData": false,
      "isRefetchError": false,
      "isRefetching": false,
      "isStale": true,
      "isSuccess": false,
      "queryKey": [
        "connectorClient",
        {
          "chainId": 1,
          "connectorUid": undefined,
        },
      ],
      "refetch": [Function],
      "status": "pending",
    }
  `)
})

test('behavior: connected on mount', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() => useConnectorClient())

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  const { data, queryKey: _, ...rest } = result.current
  expect(data).toMatchObject(
    expect.objectContaining({
      account: expect.any(Object),
      chain: expect.any(Object),
    }),
  )
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
      "isStale": false,
      "isSuccess": true,
      "refetch": [Function],
      "status": "success",
    }
  `)

  await disconnect(config, { connector })
})

test('behavior: connect and disconnect', async () => {
  const { result } = renderHook(() => ({
    useConnect: useConnect(),
    useConnectorClient: useConnectorClient(),
    useDisconnect: useDisconnect(),
  }))

  expect(result.current.useConnectorClient.data).not.toBeDefined()

  result.current.useConnect.connect({
    connector: result.current.useConnect.connectors[0]!,
  })

  await waitFor(() =>
    expect(result.current.useConnectorClient.data).toBeDefined(),
  )

  result.current.useDisconnect.disconnect()

  await waitFor(() =>
    expect(result.current.useConnectorClient.data).not.toBeDefined(),
  )
})

test('behavior: switch chains', async () => {
  const { result } = renderHook(() => ({
    useConnect: useConnect(),
    useConnectorClient: useConnectorClient(),
    useDisconnect: useDisconnect(),
    useSwitchChain: useSwitchChain(),
  }))

  expect(result.current.useConnectorClient.data).not.toBeDefined()

  result.current.useConnect.connect({
    connector: result.current.useConnect.connectors[0]!,
  })

  await waitFor(() =>
    expect(result.current.useConnectorClient.data).toBeDefined(),
  )

  result.current.useSwitchChain.switchChain({ chainId: 456 })
  await waitFor(() => {
    expect(result.current.useSwitchChain.isSuccess).toBeTruthy()
    result.current.useSwitchChain.reset()
  })
  expect(result.current.useConnectorClient.data?.chain.id).toEqual(456)

  result.current.useSwitchChain.switchChain({ chainId: 1 })
  await waitFor(() =>
    expect(result.current.useSwitchChain.isSuccess).toBeTruthy(),
  )
  expect(result.current.useConnectorClient.data?.chain.id).toEqual(1)

  result.current.useDisconnect.disconnect()

  await waitFor(() =>
    expect(result.current.useConnectorClient.data).not.toBeDefined(),
  )
})

test('behavior: disabled when properties missing', async () => {
  const { result } = renderHook(() => useConnectorClient())

  await wait(100)
  await waitFor(() => expect(result.current.isPending).toBeTruthy())
})
