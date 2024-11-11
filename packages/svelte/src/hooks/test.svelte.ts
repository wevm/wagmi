import { QueryClient } from '@tanstack/svelte-query'
import { type Config, connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { onTestFinished, vi } from 'vitest'

type TestHookOptions = {
  shouldMockConfig?: boolean
  mockConfigOverride?: Config
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
    const svelte = await import('svelte')
    svelte.getContext = vi.fn((key: any) => {
      if (key === '$$_queryClient') return new QueryClient()
      if (key === '$$_isRestoring') return () => false

      if (options.shouldMockConfig ?? true) {
        return options.mockConfigOverride ?? config
      }

      return undefined
    })

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
