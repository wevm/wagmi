import { QueryClient } from '@tanstack/svelte-query'
import { type Config, connect, disconnect, hydrate } from '@wagmi/core'
import { vi } from 'vitest'
import { config } from '../config.js'

type TestHookOptions = {
  shouldMockConfig?: boolean
  mockConfigOverride?: Config
  reconnectOnMount?: boolean
}

const noop = () => {}

export const setups = {
  connect: async () => {
    const connector = config.connectors[0]!
    await connect(config, { connector })
  },
}

export const teardowns = {
  disconnect: async () => {
    const connector = config.connectors[0]!
    await disconnect(config, { connector })
  },
}

export const testHook =
  (
    fn: () => void,
    options: TestHookOptions = {},
    setup: () => void = noop,
    teardown: () => void = noop,
  ) =>
  async () => {
    const queryClient = new QueryClient()
    const svelte = await import('svelte')
    svelte.getContext = vi.fn((key: any) => {
      if (key === '$$_queryClient') return queryClient
      if (key === '$$_isRestoring') return () => false

      if (options.shouldMockConfig ?? true) {
        return options.mockConfigOverride ?? config
      }

      return undefined
    }) as <T>(key: any) => T // match type signature of svelte.getContext

    const { onMount } = hydrate(config, {
      reconnectOnMount: options.reconnectOnMount ?? false,
    })

    await onMount()

    await Promise.resolve(setup())

    let promise: Promise<void> | void
    const cleanup = $effect.root(() => {
      promise = fn()
    })
    try {
      // @ts-ignore - this is a hack to wait for the test to finish
      return await Promise.resolve(promise)
    } finally {
      await Promise.resolve(teardown())
      cleanup()
    }
  }
