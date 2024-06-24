import { config } from '@wagmi/test'
import { http } from 'viem'
import { mainnet } from 'viem/chains'
import { expect, test } from 'vitest'

import { createConfig } from './createConfig.js'
import { createStorage } from './createStorage.js'
import { hydrate } from './hydrate.js'
import { cookieStorage } from './utils/cookie.js'

test('default', () => {
  const { onMount } = hydrate(config, {
    initialState: undefined,
    reconnectOnMount: false,
  })
  onMount()
  expect(onMount).toBeDefined()
})

test('initialState', () => {
  const config = createConfig({
    chains: [mainnet],
    transports: { [mainnet.id]: http() },
    ssr: true,
    storage: createStorage({ storage: cookieStorage }),
  })

  const { onMount } = hydrate(config, {
    initialState: {
      chainId: 1,
      current: null,
      connections: new Map(),
      status: 'disconnected',
    },
    reconnectOnMount: true,
  })
  onMount()
  expect(onMount).toBeDefined()
})

test('ssr', () => {
  const config = createConfig({
    chains: [mainnet],
    transports: { [mainnet.id]: http() },
    ssr: true,
    storage: createStorage({ storage: cookieStorage }),
  })

  const { onMount } = hydrate(config, {
    initialState: {
      chainId: 10,
      current: null,
      connections: new Map(),
      status: 'disconnected',
    },
    reconnectOnMount: false,
  })
  onMount()
  expect(onMount).toBeDefined()
  expect(config.chains[0].id).toBe(1)
})
