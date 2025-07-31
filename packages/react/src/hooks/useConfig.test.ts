import { createWrapper, renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useConfig } from './useConfig.js'

test('mounts', async () => {
  const { result } = await renderHook(() => useConfig())
  expect(result.current).toBeDefined()
})

test('behavior: throws when not inside Provider', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})

  try {
    renderHook(() => useConfig(), {
      wrapper: createWrapper(() => null, undefined),
    })
  } catch (error) {
    expect(error).toMatchInlineSnapshot(
      '[Error: `useConfig` must be used within `WagmiProvider`.]',
    )
  }
})
