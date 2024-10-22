import { accounts, config, wait } from '@wagmi/test'
import type { EIP1193Provider } from 'mipd'
import { http } from 'viem'
import { mainnet } from 'viem/chains'
import { expect, test, vi } from 'vitest'

import { createConnector } from './connectors/createConnector.js'
import { mock } from './connectors/mock.js'
import { createConfig } from './createConfig.js'
import { createStorage } from './createStorage.js'
import { hydrate } from './hydrate.js'
import { cookieStorage } from './utils/cookie.js'

vi.mock(import('mipd'), async (importOriginal) => {
  const mod = await importOriginal()

  let cache: typeof mod | undefined
  if (!cache)
    cache = {
      ...mod,
      createStore() {
        const store = mod.createStore()
        return {
          ...store,
          getProviders() {
            const info = {
              icon: 'data:image/svg+xml,<svg width="32px" height="32px" viewBox="0 0 32 32"/>',
              uuid: crypto.randomUUID(),
            } as const
            const provider = '<EIP1193Provider>' as unknown as EIP1193Provider
            return [
              { info: { ...info, name: 'Foo', rdns: 'com.foo' }, provider },
              { info: { ...info, name: 'Bar', rdns: 'com.bar' }, provider },
              { info: { ...info, name: 'Mock', rdns: 'com.mock' }, provider },
            ]
          },
        }
      },
    }
  return cache
})

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

test('ssr', async () => {
  const config = createConfig({
    chains: [mainnet],
    connectors: [
      createConnector((c) => {
        return {
          ...mock({ accounts })(c),
          rdns: 'com.mock',
        }
      }),
    ],
    ssr: true,
    storage: createStorage({ storage: cookieStorage }),
    transports: { [mainnet.id]: http() },
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

  await wait(100)
  expect(config.connectors.map((x) => x.rdns ?? x.id)).toMatchInlineSnapshot(
    `
    [
      "com.mock",
      "com.foo",
      "com.bar",
    ]
  `,
  )
})
