import { expect, test } from 'vitest'

import {
  WagmiInjectionContextError,
  WagmiPluginNotFoundError,
} from './plugin.js'

test('WagmiPluginNotFoundError', () => {
  expect(new WagmiPluginNotFoundError()).toMatchInlineSnapshot(`
    [WagmiPluginNotFoundError: No \`config\` found in Vue context, use \`WagmiPlugin\` to properly initialize the library.

    Docs: https://wagmi.sh/vue/api/Nuxt.html
    Version: @wagmi/vue@x.y.z]
  `)
})

test('WagmiInjectionContextError', () => {
  expect(new WagmiInjectionContextError()).toMatchInlineSnapshot(`
    [WagmiInjectionContextError: Wagmi composables can only be used inside \`setup()\` function or functions that support injection context.

    Docs: https://wagmi.sh/vue/api/Nuxt.html
    Version: @wagmi/vue@x.y.z]
  `)
})
