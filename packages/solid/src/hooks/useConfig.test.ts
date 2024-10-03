import { renderHook } from '@wagmi/test/solid'
import { expect, test } from 'vitest'

import { useConfig } from './useConfig.js'

test('mounts', () => {
  const { result } = renderHook(useConfig)
  expect(result).toBeDefined()
})

test('behavior: throws when not inside Provider', () => {
  try {
    renderHook(() => useConfig(), {
      wrapper: undefined,
    })
  } catch (error) {
    expect(error).toMatchInlineSnapshot(
      `
      [WagmiProviderNotFoundError: \`useConfig\` must be used within \`WagmiProvider\`.

      Docs: https://wagmi.sh/solid/api/WagmiProvider.html
      Version: @wagmi/solid@x.y.z]
    `,
    )
  }
})
