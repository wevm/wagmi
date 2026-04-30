import { accounts, chain, config } from '@wagmi/test'
import { http } from 'viem'
import { expect, test } from 'vitest'

import { mock } from '../connectors/mock.js'
import { createConfig } from '../createConfig.js'
import { getConnectors } from './getConnectors.js'

test('default', () => {
  expect(getConnectors(config)).toEqual(config.connectors)
  expect(getConnectors(config)).toEqual(config.connectors)
})

test('behavior: isolates cache per config', () => {
  const config1 = createConfig({
    chains: [chain.mainnet],
    connectors: [mock({ accounts })],
    transports: {
      [chain.mainnet.id]: http(),
    },
  })
  const config2 = createConfig({
    chains: [chain.mainnet],
    connectors: [mock({ accounts })],
    transports: {
      [chain.mainnet.id]: http(),
    },
  })

  config2._internal.connectors.setState(() => [...config1.connectors])

  const connectors1 = getConnectors(config1)
  const connectors2 = getConnectors(config2)

  expect(connectors1).toBe(config1.connectors)
  expect(connectors2).toBe(config2.connectors)
  expect(connectors1).not.toBe(connectors2)
})
