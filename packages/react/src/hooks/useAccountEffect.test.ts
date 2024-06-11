import { mock } from '@wagmi/connectors'
import { http, connect, createConfig, disconnect } from '@wagmi/core'
import { accounts, chain, config } from '@wagmi/test'
import { createWrapper, renderHook, waitFor } from '@wagmi/test/react'
import { Fragment, createElement } from 'react'
import { expect, test, vi } from 'vitest'

import { WagmiProvider } from '../context.js'
import { useAccountEffect } from './useAccountEffect.js'
import { useConnect } from './useConnect.js'
import { useDisconnect } from './useDisconnect.js'

test('parameters: config', () => {
  const { result } = renderHook(() => useAccountEffect({ config }), {
    wrapper: ({ children }) => createElement(Fragment, { children }),
  })
  expect(result.current).toBeUndefined()
})

test('behavior: connect and disconnect called once', async () => {
  const onConnect = vi.fn()
  const onDisconnect = vi.fn()

  const { result } = renderHook(() => ({
    useAccountEffect: useAccountEffect({ onConnect, onDisconnect }),
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

  renderHook(() => useAccountEffect({ onConnect }), {
    wrapper: createWrapper(WagmiProvider, { config, reconnectOnMount: true }),
  })

  await waitFor(() => expect(onConnect).toBeCalledTimes(1))

  await disconnect(config)
})
