import { mock } from '@wagmi/connectors'
import { connect, createConfig, disconnect, http } from '@wagmi/core'
import { accounts, chain, config } from '@wagmi/test'
import { createWrapper, renderHook } from '@wagmi/test/react'
import { createElement, Fragment } from 'react'
import { expect, test, vi } from 'vitest'

import { WagmiProvider } from '../context.js'
import { useConnect } from './useConnect.js'
import { useConnectionEffect } from './useConnectionEffect.js'
import { useConnectors } from './useConnectors.js'
import { useDisconnect } from './useDisconnect.js'

test('parameters: config', async () => {
  const { result } = await renderHook(() => useConnectionEffect({ config }), {
    wrapper: ({ children }) => createElement(Fragment, { children }),
  })
  expect(result.current).toBeUndefined()
})

test('behavior: connect and disconnect called once', async () => {
  const onConnect = vi.fn()
  const onDisconnect = vi.fn()

  const { result } = await renderHook(() => ({
    useConnectionEffect: useConnectionEffect({ onConnect, onDisconnect }),
    useConnect: useConnect(),
    useConnectors: useConnectors(),
    useDisconnect: useDisconnect(),
  }))

  result.current.useConnect.mutate({
    connector: result.current.useConnectors[0]!,
  })
  await vi.waitFor(() =>
    expect(result.current.useConnect.isSuccess).toBeTruthy(),
  )

  result.current.useConnect.mutate({
    connector: result.current.useConnectors[0]!,
  })
  await vi.waitFor(() =>
    expect(result.current.useConnect.isSuccess).toBeTruthy(),
  )

  result.current.useDisconnect.mutate()
  await vi.waitFor(() =>
    expect(result.current.useDisconnect.isSuccess).toBeTruthy(),
  )
  result.current.useDisconnect.mutate()
  await vi.waitFor(() =>
    expect(result.current.useDisconnect.isSuccess).toBeTruthy(),
  )

  expect(onConnect).toBeCalledTimes(1)
  expect(onDisconnect).toBeCalledTimes(1)
})

test('behavior: connect called on reconnect', async () => {
  const config = createConfig({
    chains: [chain.mainnet],
    connectors: [
      mock({
        accounts,
        features: { reconnect: true },
      }),
    ],
    transports: { [chain.mainnet.id]: http() },
  })

  await connect(config, { connector: config.connectors[0]! })
  const onConnect = vi.fn((data) => {
    expect(data.isReconnected).toBeTruthy()
  })

  renderHook(() => useConnectionEffect({ onConnect }), {
    wrapper: createWrapper(WagmiProvider, { config, reconnectOnMount: true }),
  })

  await vi.waitFor(() => expect(onConnect).toBeCalledTimes(1), {
    timeout: 10_000,
  })

  await disconnect(config)
})
