import { connect, disconnect } from '@wagmi/core'
import { config, wait } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { expect, test, vi } from 'vitest'
import { useConnect } from './useConnect.js'
import { useConnectorClient } from './useConnectorClient.js'
import { useConnectors } from './useConnectors.js'
import { useDisconnect } from './useDisconnect.js'
import { useSwitchChain } from './useSwitchChain.js'

const connector = config.connectors[0]!

test('default', async () => {
  const { result } = renderPrimitive(() => useConnectorClient())

  await vi.waitFor(() => expect(result.isPending).toBeTruthy())

  expect(result).toMatchInlineSnapshot(`
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
      "isStale": false,
      "isSuccess": false,
      "queryKey": [
        "connectorClient",
        {
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "pending",
    }
  `)
})

test('behavior: connected on mount', async () => {
  await connect(config, { connector })

  const { result } = renderPrimitive(() => useConnectorClient())

  await vi.waitUntil(() => result.isSuccess, { timeout: 5_000 })

  const { data, queryKey: _, ...rest } = result
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
  const { result } = renderPrimitive(() => ({
    useConnect: useConnect(),
    useConnectors: useConnectors(),
    useConnectorClient: useConnectorClient(),
    useDisconnect: useDisconnect(),
  }))

  expect(result.useConnectorClient.data).not.toBeDefined()

  result.useConnect.mutate({
    connector: result.useConnectors()[0]!,
  })

  await vi.waitFor(() => expect(result.useConnectorClient.data).toBeDefined())

  result.useDisconnect.mutate()

  await vi.waitFor(() =>
    expect(result.useConnectorClient.data).not.toBeDefined(),
  )
})

test('behavior: switch chains', async () => {
  await connect(config, { connector })

  const { result } = renderPrimitive(() => ({
    useConnectorClient: useConnectorClient(),
    useSwitchChain: useSwitchChain(),
  }))

  expect(result.useConnectorClient.data).not.toBeDefined()
  await vi.waitFor(() => expect(result.useConnectorClient.data).toBeDefined())

  result.useSwitchChain.mutate({ chainId: 456 })
  await vi.waitUntil(() => result.useSwitchChain.isSuccess, {
    timeout: 5_000,
  })
  result.useSwitchChain.reset()
  await vi.waitUntil(() => result.useConnectorClient.isSuccess, {
    timeout: 5_000,
  })
  expect(result.useConnectorClient.data?.chain.id).toEqual(456)

  result.useSwitchChain.mutate({ chainId: 1 })
  await vi.waitUntil(() => result.useSwitchChain.isSuccess, {
    timeout: 5_000,
  })
  await vi.waitUntil(() => result.useConnectorClient.isSuccess, {
    timeout: 5_000,
  })
  expect(result.useConnectorClient.data?.chain.id).toEqual(1)

  await disconnect(config, { connector })
})

test('behavior: disabled when properties missing', async () => {
  await disconnect(config, { connector })

  const { result } = renderPrimitive(() => useConnectorClient())

  await wait(0)
  await vi.waitFor(() => expect(result.isPending).toBeTruthy())
})

test('behavior: disabled when connecting', async () => {
  const { result } = renderPrimitive(() => useConnectorClient())
  config.setState((x) => ({ ...x, status: 'connecting' }))

  await wait(0)
  expect(result.isLoading).not.toBeTruthy()
})
