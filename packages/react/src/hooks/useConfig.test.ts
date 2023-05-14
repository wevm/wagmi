import { expect, test, vi } from 'vitest'

import { createWrapper, renderHook } from '../../test/index.js'
import { useConfig } from './useConfig.js'

test('mounts', async () => {
  const { result } = renderHook(() => useConfig())
  expect(result.current).toBeDefined()
})

test('throws when not inside Provider', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})

  try {
    renderHook(() => useConfig(), {
      wrapper: createWrapper(() => null, undefined),
    })
  } catch (error) {
    expect(error).toMatchInlineSnapshot(
      '[Error: `useConfig` must be used within `WagmiConfig`.]',
    )
  }
})
