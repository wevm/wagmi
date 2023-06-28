import { accounts, testConnector } from '@wagmi/test'
import { http } from 'viem'
import { mainnet } from 'viem/chains'
import { expect, test } from 'vitest'

import { createConfig } from './config.js'

test('exports', () => {
  const config = createConfig({
    chains: [mainnet],
    connectors: [testConnector({ accounts })],
    transports: {
      [mainnet.id]: http(),
    },
  })
  expect(config).toBeDefined()
})
