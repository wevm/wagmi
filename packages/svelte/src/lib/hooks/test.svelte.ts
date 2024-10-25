import { QueryClient } from '@tanstack/svelte-query'
import { config } from '@wagmi/test'
import { onTestFinished, vi } from 'vitest'

type TestHookOptions = {
  shouldMockConfig?: boolean
}

export const testHook =
  (fn: () => void, options: TestHookOptions = {}) =>
  async () => {
    const svelte = await import('svelte')
    svelte.getContext = vi.fn((key: any) => {
      if (key === '$$_queryClient') return new QueryClient()
      if (key === '$$_isRestoring') return () => false

      if (options.shouldMockConfig ?? true) {
        return config
      }

      return undefined
    })

    const cleanup = $effect.root(await fn)

    onTestFinished(() => cleanup())
  }
