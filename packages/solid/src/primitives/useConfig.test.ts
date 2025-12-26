import { config } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { expect, test, vi } from 'vitest'

import { useConfig } from './useConfig.js'

test('default', () => {
  const { result } = renderPrimitive(useConfig(() => ({ config })))
  expect(result).toBeDefined()
})

test('behavior: throws when not inside Provider', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})

  try {
    renderPrimitive(useConfig(), {
      wrapper: (props) => props.children,
    })
  } catch (error) {
    expect(error).toMatchInlineSnapshot(`
      [WagmiProviderNotFoundError: \`useConfig\` must be used within \`WagmiProvider\`.

      Docs: https://wagmi.sh/solid/api/WagmiProvider.html
      Version: @wagmi/solid@x.y.z]
    `)
  }
})
