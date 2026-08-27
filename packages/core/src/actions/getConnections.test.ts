import { accounts, chain, config } from '@wagmi/test'
import { http } from 'viem'
import { expect, test } from 'vitest'

import { mock } from '../connectors/mock.js'
import { createConfig } from '../createConfig.js'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getConnections } from './getConnections.js'

test('default', async () => {
  const connector = config.connectors[0]!
  expect(getConnections(config)).toEqual([])
  await connect(config, { connector })
  expect(getConnections(config).length).toEqual(1)
  await disconnect(config, { connector })
  expect(getConnections(config)).toEqual([])
})

test('behavior: isolates reconnecting snapshot per config', async () => {
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

  const connector = config1.connectors[0]!
  await connect(config1, { connector })

  expect(getConnections(config1).length).toBe(1)

  config2.setState((state) => ({ ...state, status: 'reconnecting' }))
  expect(getConnections(config2)).toEqual([])

  await disconnect(config1, { connector })
})
