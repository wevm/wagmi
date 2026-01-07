import { connect, disconnect } from '@wagmi/core'
import { config, wait } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test } from 'vitest'

import { deepUnref } from '../utils/cloneDeep.js'
import { useConnect } from './useConnect.js'
import { useConnectorClient } from './useConnectorClient.js'
import { useConnectors } from './useConnectors.js'
import { useDisconnect } from './useDisconnect.js'
import { useSwitchChain } from './useSwitchChain.js'

const connector = config.connectors[0]!

test('default', async () => {
  const [client] = renderComposable(() => useConnectorClient())

  expect(deepUnref(client)).toMatchInlineSnapshot(`
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
          "connectorUid": undefined,
        },
      ],
      "refetch": [Function],
      "status": "pending",
      "suspense": [Function],
    }
  `)
})

test('behavior: connected on mount', async () => {
  await connect(config, { connector })

  const [client] = renderComposable(() => useConnectorClient())

  await waitFor(client.isSuccess, (isSuccess) => isSuccess === true)

  const { data, queryKey: _, ...rest } = deepUnref(client)
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
      "suspense": [Function],
    }
  `)

  await disconnect(config, { connector })
})

test('behavior: connect and disconnect', async () => {
  const [connect] = renderComposable(() => useConnect())
  const [connectors] = renderComposable(() => useConnectors())
  const [client] = renderComposable(() => useConnectorClient())
  const [disconnect] = renderComposable(() => useDisconnect())

  expect(client.data.value).not.toBeDefined()

  connect.mutate({
    connector: connectors.value[0]!,
  })

  await waitFor(client.data, (data) => data !== undefined)

  disconnect.mutate()

  await waitFor(client.data, (data) => data === undefined)
})

test('behavior: switch chains', async () => {
  await connect(config, { connector })

  const [connectorClient] = renderComposable(() => useConnectorClient())
  const [switchChain] = renderComposable(() => useSwitchChain())

  expect(connectorClient.data.value).not.toBeDefined()

  await waitFor(connectorClient.data, (data) => data !== undefined)

  switchChain.mutate({ chainId: 456 })
  await waitFor(switchChain.isSuccess, (isSuccess) => isSuccess === true)
  await waitFor(connectorClient.data, (data) => data !== undefined)
  expect(connectorClient.data?.value?.chain.id).toEqual(456)

  switchChain.mutate({ chainId: 1 })
  await waitFor(switchChain.isSuccess, (isSuccess) => isSuccess === true)
  await waitFor(connectorClient.data, (data) => data !== undefined)
  expect(connectorClient.data?.value?.chain.id).toEqual(1)

  await disconnect(config, { connector })
})

test('behavior: disabled when properties missing', async () => {
  const [connectorClient] = renderComposable(() => useConnectorClient())

  await wait(100)
  expect(connectorClient.isPending.value).toBe(true)
})

test('behavior: disabled when connecting', async () => {
  const [connectorClient] = renderComposable(() => useConnectorClient())

  config.setState((x) => ({ ...x, status: 'connecting' }))

  await wait(100)
  expect(connectorClient.isLoading.value).not.toBeTruthy()
})
