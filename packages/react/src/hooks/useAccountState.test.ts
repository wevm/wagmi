import { connect, createConfig, disconnect, http } from '@wagmi/core'
import { accounts, chain, testConnector } from '@wagmi/test'
import { createWrapper, renderHook, waitFor } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { WagmiProvider } from '../context.js'
import { useAccountState } from './useAccountState.js'
import { useConnect } from './useConnect.js'
import { useDisconnect } from './useDisconnect.js'

test('behavior: connect and disconnect called once', async () => {
  const onConnect = vi.fn()
  const onDisconnect = vi.fn()

  const { result } = renderHook(() => ({
    useAccountState: useAccountState({ onConnect, onDisconnect }),
    useConnect: useConnect(),
    useDisconnect: useDisconnect(),
  }))

  result.current.useConnect.connect({
    connector: result.current.useConnect.connectors[0]!,
  })
  await waitFor(() => expect(result.current.useConnect.isSuccess).toBeTruthy())

  result.current.useConnect.connect({
    connector: result.current.useConnect.connectors[0]!,
  })
  await waitFor(() => expect(result.current.useConnect.isSuccess).toBeTruthy())

  result.current.useDisconnect.disconnect()
  await waitFor(() =>
    expect(result.current.useDisconnect.isSuccess).toBeTruthy(),
  )
  result.current.useDisconnect.disconnect()
  await waitFor(() =>
    expect(result.current.useDisconnect.isSuccess).toBeTruthy(),
  )

  expect(onConnect).toBeCalledTimes(1)
  expect(onDisconnect).toBeCalledTimes(1)
})

test('behavior: connect called on reconnect', async () => {
  const config = createConfig({
    chains: [chain.mainnet],
    connectors: [
      testConnector({
        accounts,
        features: { reconnect: true },
      }),
    ],
    reconnectOnMount: true,
    transports: { [chain.mainnet.id]: http() },
  })

  await connect(config, { connector: config.connectors[0]! })
  const onConnect = vi.fn((data) => {
    expect(data.isReconnected).toBeTruthy()
  })

  renderHook(() => useAccountState({ onConnect }), {
    wrapper: createWrapper(WagmiProvider, { value: config }),
  })

  await waitFor(() => expect(onConnect).toBeCalledTimes(1))

  await disconnect(config)
})
