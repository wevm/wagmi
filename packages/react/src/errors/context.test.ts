import { expect, test } from 'vitest'

import { WagmiProviderNotFoundError } from './context.js'

test('WagmiProviderNotFoundError', () => {
  expect(new WagmiProviderNotFoundError()).toMatchInlineSnapshot(`
    [WagmiProviderNotFoundError: \`useConfig\` must be used within \`WagmiProvider\`.

    Docs: https://beta.wagmi.sh/reacthttps://beta.wagmi.sh/react/api/WagmiProvider.html
    Version: wagmi@x.y.z]
  `)
})
