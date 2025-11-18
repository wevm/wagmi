import { createWrapper, renderHook } from '@wagmi/test/react'
import * as React from 'react'
import { expect, test, vi } from 'vitest'

import { useConfig } from './useConfig.js'

test('mounts', async () => {
  const { result } = await renderHook(() => useConfig())
  expect(result.current).toBeDefined()
})

test('behavior: throws when not inside Provider', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})

  await expect(
    renderHook(() => useConfig(), {
      wrapper: createWrapper(
        (props) => React.createElement('div', undefined, props.children),
        undefined,
      ),
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [WagmiProviderNotFoundError: \`useConfig\` must be used within \`WagmiProvider\`.

    Docs: https://wagmi.sh/react/api/WagmiProvider.html
    Version: wagmi@x.y.z]
  `)
})
