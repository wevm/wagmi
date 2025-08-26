import { connect, disconnect } from '@wagmi/core'
import { config, wait } from '@wagmi/test'
import { render, renderHook } from '@wagmi/test/react'
import * as React from 'react'
import { expect, test, vi } from 'vitest'

import { useAccount } from './useAccount.js'
import { useConnect } from './useConnect.js'
import { useConnectorClient } from './useConnectorClient.js'
import { useDisconnect } from './useDisconnect.js'
import { useSwitchChain } from './useSwitchChain.js'

const connector = config.connectors[0]!

test('default', async () => {
  const { result } = await renderHook(() => useConnectorClient())

  await vi.waitFor(() => expect(result.current.isPending).toBeTruthy())

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
    }
  `)
})

test('behavior: connected on mount', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() => useConnectorClient())

  await vi.waitUntil(() => result.current.isSuccess)

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
  const { result } = await renderHook(() => ({
    useConnect: useConnect(),
    useConnectorClient: useConnectorClient(),
    useDisconnect: useDisconnect(),
  }))

  expect(result.current.useConnectorClient.data).not.toBeDefined()

  result.current.useConnect.connect({
    connector: result.current.useConnect.connectors[0]!,
  })

  await vi.waitFor(() =>
    expect(result.current.useConnectorClient.data).toBeDefined(),
  )

  result.current.useDisconnect.disconnect()

  await vi.waitFor(() =>
    expect(result.current.useConnectorClient.data).not.toBeDefined(),
  )
})

test('behavior: switch chains', async () => {
  await connect(config, { connector })

  const { act, result } = await renderHook(() => ({
    useConnectorClient: useConnectorClient(),
    useSwitchChain: useSwitchChain(),
  }))

  expect(result.current.useConnectorClient.data).not.toBeDefined()
  await vi.waitFor(() =>
    expect(result.current.useConnectorClient.data).toBeDefined(),
  )

  await act(() => result.current.useSwitchChain.switchChain({ chainId: 456 }))
  await vi.waitUntil(() => result.current.useSwitchChain.isSuccess, {
    timeout: 5_000,
  })
  await act(() => result.current.useSwitchChain.reset())
  await vi.waitUntil(() => result.current.useConnectorClient.isSuccess, {
    timeout: 5_000,
  })
  expect(result.current.useConnectorClient.data?.chain.id).toEqual(456)

  await act(() => result.current.useSwitchChain.switchChain({ chainId: 1 }))
  await vi.waitUntil(() => result.current.useSwitchChain.isSuccess, {
    timeout: 5_000,
  })
  await vi.waitUntil(() => result.current.useConnectorClient.isSuccess, {
    timeout: 5_000,
  })
  expect(result.current.useConnectorClient.data?.chain.id).toEqual(1)

  await disconnect(config, { connector })
})

test('behavior: disabled when properties missing', async () => {
  await disconnect(config, { connector })

  const { result } = await renderHook(() => useConnectorClient())

  await wait(0)
  await vi.waitFor(() => expect(result.current.isPending).toBeTruthy())
})

test('behavior: disabled when connecting', async () => {
  const { result } = await renderHook(() => useConnectorClient())

  config.setState((x) => ({ ...x, status: 'connecting' }))

  await wait(0)
  expect(result.current.isLoading).not.toBeTruthy()
})

test('behavior: re-render does not invalidate query', async () => {
  await disconnect(config, { connector })

  const screen = await render(<Parent />)

  await screen.getByTestId('connect').click()
  await vi.waitFor(async () => {
    await expect
      .element(screen.getByTestId('address'))
      .toHaveTextContent('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
    await expect.element(screen.getByTestId('client')).toBeVisible()

    await expect.element(screen.getByTestId('child-client')).toBeVisible()
    await expect
      .element(screen.getByTestId('render-count'))
      .toHaveTextContent('1')
  })

  const initialClient = screen.getByTestId('child-client')

  await screen.getByTestId('rerender').click()
  await vi.waitFor(() =>
    expect.element(screen.getByTestId('render-count')).toHaveTextContent('2'),
  )

  await expect
    .element(screen.getByTestId('child-client').element())
    .toEqual(initialClient.element())
})

test('behavior: connector is on a different chain', async () => {
  await disconnect(config, { connector })
  await connect(config, { connector })
  config.setState((state) => {
    const uid = state.current!
    const connection = state.connections.get(uid)!
    return {
      ...state,
      connections: new Map(state.connections).set(uid, {
        ...connection,
        chainId: 456,
      }),
    }
  })

  const { result } = await renderHook(() => useConnectorClient())

  await vi.waitUntil(() => result.current.isError, 10_000)

  const { error } = result.current
  expect(error?.message).toMatchInlineSnapshot(`
    "The current chain of the connector (id: 1) does not match the connection's chain (id: 456).

    Current Chain ID:  1
    Expected Chain ID: 456

    Version: @wagmi/core@x.y.z"
  `)

  await disconnect(config, { connector })
})

function Parent() {
  const [renderCount, setRenderCount] = React.useState(1)

  const { connectors, connect } = useConnect()
  const { address } = useAccount()
  const { data } = useConnectorClient()

  return (
    <>
      <div data-testid="address">{address}</div>
      <div data-testid="client">{data?.uid}</div>
      <Child key={renderCount} renderCount={renderCount} />

      <button
        type="button"
        data-testid="connect"
        onClick={() => connect({ connector: connectors[0]! })}
      >
        Connect
      </button>
      <button
        type="button"
        data-testid="rerender"
        onClick={() => setRenderCount((prev) => prev + 1)}
      >
        Re-render
      </button>
    </>
  )
}

function Child(props: { renderCount: number }) {
  const { renderCount } = props
  const { data } = useConnectorClient()
  return (
    <div>
      <span data-testid="child-client">{data?.uid}</span>
      <span data-testid="render-count">{renderCount}</span>
    </div>
  )
}
