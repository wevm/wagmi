import { renderComposable } from '@wagmi/test/vue'
import { expect, test, vi } from 'vitest'

import { useConfig } from './useConfig.js'

test('default', () => {
  const [config] = renderComposable(() => useConfig())
  expect(config).toBeDefined()
})

test('behavior: throws when not provided via WagmiPlugin', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})

  try {
    renderComposable(() => useConfig(), { attach() {} })
  } catch (error) {
    expect(error).toMatchInlineSnapshot(`
      [WagmiPluginNotFoundError: No \`config\` found in Vue context, use \`WagmiPlugin\` to properly initialize the library.

      Docs: https://wagmi.sh/vue/api/Nuxt.html
      Version: @wagmi/vue@x.y.z]
    `)
  }
})
