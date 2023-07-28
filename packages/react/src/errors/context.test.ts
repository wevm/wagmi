import { expect, test } from 'vitest'

import { WagmiProviderNotFoundError } from './context.js'

test('WagmiProviderNotFoundError', () => {
  expect(new WagmiProviderNotFoundError()).toMatchInlineSnapshot(`
    [WagmiProviderNotFoundError: \`useConfig\` must be used within \`WagmiProvider\`.

    Version: wagmi@x.y.z]
  `)
})
