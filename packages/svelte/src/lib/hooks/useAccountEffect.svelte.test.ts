import { mock } from '@wagmi/connectors'
import { http, connect, createConfig, disconnect } from '@wagmi/core'
import { accounts, chain, config, wait } from '@wagmi/test'
import { expect, test, vi } from 'vitest'
import { testHook } from './test.svelte.js'
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

test(
  'behavior: connect called on reconnect',
  testHook(async () => {
    const mockConnector = mock({
      accounts,
      features: { reconnect: true },
    })
    const newConfig = createConfig({
      chains: [chain.mainnet],
      connectors: [mockConnector],
      transports: { [chain.mainnet.id]: http() },
    })

    await connect(newConfig, { connector: mockConnector })

    const onConnect = vi.fn((data) => {
      expect(data.isReconnected).toBeTruthy()
    })

    // Set the config in the Svelte context for this test
    const svelte = await import('svelte')
    svelte.getContext = vi.fn().mockReturnValue(newConfig)

    useAccountEffect(() => ({ onConnect }))

    await vi.waitFor(() => {
      expect(onConnect).toBeCalledTimes(1)
    })

    await disconnect(newConfig)
  }),
)
