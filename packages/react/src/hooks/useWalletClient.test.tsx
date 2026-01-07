import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { render, renderHook } from '@wagmi/test/react'
import * as React from 'react'
import { expect, test, vi } from 'vitest'
import { useConnect } from './useConnect.js'
import { useConnection } from './useConnection.js'
import { useConnectors } from './useConnectors.js'
import { useDisconnect } from './useDisconnect.js'
import { useSwitchChain } from './useSwitchChain.js'
import { useWalletClient } from './useWalletClient.js'

// Almost identical implementation to `useConnectorClient` (except for return type)
// Should update both in tandem

const connector = config.connectors[0]!

test('default', async () => {
  const { result } = await renderHook(() => useWalletClient())

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
        "walletClient",
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

  const { result } = await renderHook(() => useWalletClient())

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

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
    useConnectors: useConnectors(),
    useWalletClient: useWalletClient(),
    useDisconnect: useDisconnect(),
  }))

  expect(result.current.useWalletClient.data).not.toBeDefined()

  result.current.useConnect.connect({
    connector: result.current.useConnectors[0]!,
  })

  await vi.waitFor(() =>
    expect(result.current.useWalletClient.data).toBeDefined(),
  )

  result.current.useDisconnect.disconnect()

  await vi.waitFor(() =>
    expect(result.current.useWalletClient.data).not.toBeDefined(),
  )
})

test('behavior: switch chains', async () => {
  await connect(config, { connector })

  const { act, result } = await renderHook(() => ({
    useWalletClient: useWalletClient(),
    useSwitchChain: useSwitchChain(),
  }))

  expect(result.current.useWalletClient.data).not.toBeDefined()
  await vi.waitFor(() =>
    expect(result.current.useWalletClient.data).toBeDefined(),
  )

  await act(() => result.current.useSwitchChain.switchChain({ chainId: 456 }))
  await vi.waitUntil(() => result.current.useSwitchChain.isSuccess, {
    timeout: 5_000,
  })
  await act(() => result.current.useSwitchChain.reset())
  await vi.waitUntil(() => result.current.useWalletClient.isSuccess, {
    timeout: 5_000,
  })
  expect(result.current.useWalletClient.data?.chain.id).toEqual(456)

  await act(() => result.current.useSwitchChain.switchChain({ chainId: 1 }))
  await vi.waitUntil(() => result.current.useSwitchChain.isSuccess, {
    timeout: 5_000,
  })
  await vi.waitUntil(() => result.current.useWalletClient.isSuccess, {
    timeout: 5_000,
  })
  expect(result.current.useWalletClient.data?.chain.id).toEqual(1)

  await disconnect(config, { connector })
})

test('behavior: re-render does not invalidate query', async () => {
  await disconnect(config, { connector })

  const screen = await render(<Parent />)

  await screen.getByTestId('connect').click()
  await vi.waitFor(async () => {
    await expect
      .element(screen.getByTestId('address'))
      .toHaveTextContent('0x95132632579b073D12a6673e18Ab05777a6B86f8')
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

function Parent() {
  const [renderCount, setRenderCount] = React.useState(1)

  const { connect } = useConnect()
  const connectors = useConnectors()
  const { address } = useConnection()
  const { data } = useWalletClient()

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
  const { data } = useWalletClient()
  return (
    <div>
      <span data-testid="child-client">{data?.uid}</span>
      <span data-testid="render-count">{renderCount}</span>
    </div>
  )
}
