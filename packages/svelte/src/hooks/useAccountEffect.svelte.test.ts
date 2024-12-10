import { mock } from '@wagmi/connectors'
import {
  http,
  connect,
  createConfig,
  disconnect,
  getAccount,
  reconnect,
} from '@wagmi/core'
import { accounts, chain, config, wait } from '@wagmi/test'
import { testHook } from '@wagmi/test/svelte'
import { expect, test, vi } from 'vitest'
import { useAccountEffect } from './useAccountEffect.svelte'
import { useConnect } from './useConnect.svelte'
import { useDisconnect } from './useDisconnect.svelte'

test(
  'parameters: config',
  testHook(
    () => {
      const result = useAccountEffect(() => ({ config }))
      expect(result).toBeUndefined()
    },
    { shouldMockConfig: false },
  ),
)

test(
  'behavior: connect and disconnect called once',
  testHook(async () => {
    const onConnect = vi.fn()
    const onDisconnect = vi.fn()

    const connectHook = $derived.by(useConnect())
    const disconnectHook = $derived.by(useDisconnect())

    useAccountEffect(() => ({ onConnect, onDisconnect }))

    connectHook.connect({ connector: connectHook.connectors[0]! })
    await expect.poll(() => connectHook.data?.accounts).toBeTruthy()

    connectHook.connect({ connector: connectHook.connectors[0]! })
    await expect.poll(() => connectHook.isSuccess).toBeTruthy()

    await wait(1000) // TODO: why is this needed?

    disconnectHook.disconnect()
    await expect.poll(() => disconnectHook.isSuccess).toBeTruthy()

    disconnectHook.disconnect()
    await expect.poll(() => disconnectHook.isSuccess).toBeTruthy()

    expect(onConnect).toBeCalledTimes(1)
    expect(onDisconnect).toBeCalledTimes(1)
  }),
)

const mockConnector = mock({
  accounts,
  features: { reconnect: true },
})
const newConfig = createConfig({
  chains: [chain.mainnet],
  connectors: [mockConnector],
  transports: { [chain.mainnet.id]: http() },
})

test(
  'behavior: connect called on reconnect',
  testHook(
    async () => {
      const onConnect = vi.fn((data) => {
        expect(data.isReconnected).toBeTruthy()
      })

      useAccountEffect(() => ({ onConnect }))

      await reconnect(newConfig)

      await connect(newConfig, { connector: mockConnector })

      await expect.poll(() => onConnect).toHaveBeenCalledOnce()
    },
    { mockConfigOverride: newConfig, reconnectOnMount: true },
    async () => {
      await connect(newConfig, { connector: mockConnector })
    },
    async () => {
      await disconnect(newConfig)
    },
  ),
)
