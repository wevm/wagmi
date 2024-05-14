import { VueQueryPlugin } from '@tanstack/vue-query'
import { mock } from '@wagmi/connectors'
import { http, connect, createConfig, disconnect } from '@wagmi/core'
import { accounts, chain } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test, vi } from 'vitest'
import type { App } from 'vue'

import { WagmiPlugin } from '../plugin.js'
import { useAccount } from './useAccount.js'
import { useAccountEffect } from './useAccountEffect.js'
import { useConnect } from './useConnect.js'
import { useDisconnect } from './useDisconnect.js'

test('behavior: connect and disconnect called once', async () => {
  const onConnect = vi.fn()
  const onDisconnect = vi.fn()

  renderComposable(() => useAccountEffect({ onConnect, onDisconnect }))
  const [connect] = renderComposable(() => useConnect())
  const [disconnect] = renderComposable(() => useDisconnect())

  connect.connect({
    connector: connect.connectors[0]!,
  })
  await waitFor(connect.isSuccess)
  connect.connect({
    connector: connect.connectors[0]!,
  })

  disconnect.disconnect()
  await waitFor(disconnect.isSuccess)
  disconnect.disconnect()

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

  function attach(app: App) {
    app
      .use(WagmiPlugin, {
        config,
        reconnectOnMount: true,
      })
      .use(VueQueryPlugin, {})
  }

  await connect(config, { connector: config.connectors[0]! })
  const onConnect = vi.fn((data) => {
    expect(data.isReconnected).toBeTruthy()
  })

  renderComposable(() => useAccountEffect({ onConnect }), {
    attach,
  })
  const [account] = renderComposable(() => useAccount(), { attach })

  await waitFor(account.status, (status) => status === 'connected')

  expect(onConnect).toBeCalledTimes(1)

  await disconnect(config)
})
