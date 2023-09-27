import { accounts, chain } from '@wagmi/test'
import { http } from 'viem'
import { expect, test } from 'vitest'

import { connect } from './actions/connect.js'
import { disconnect } from './actions/disconnect.js'
import { switchChain } from './actions/switchChain.js'
import { mock } from './connectors/mock.js'
import { createConfig } from './createConfig.js'

const { mainnet, optimism } = chain

test('default', () => {
  const config = createConfig({
    chains: [mainnet],
    connectors: [mock({ accounts })],
    transports: {
      [mainnet.id]: http(),
    },
  })
  expect(config).toBeDefined()
})

test('behavior: syncConnectedChain', async () => {
  const config = createConfig({
    chains: [mainnet, optimism],
    connectors: [mock({ accounts })],
    syncConnectedChain: true,
    transports: {
      [mainnet.id]: http(),
      [optimism.id]: http(),
    },
  })
  // defaults to first chain in `createConfig({ chains })`
  expect(config.getClient().chain.id).toBe(mainnet.id)

  // switches to optimism
  await switchChain(config, { chainId: optimism.id })
  expect(config.getClient().chain.id).toBe(optimism.id)

  // connects to mainnet
  await connect(config, {
    chainId: mainnet.id,
    connector: config.connectors[0]!,
  })
  expect(config.getClient().chain.id).toBe(mainnet.id)

  // switches to optimism
  await switchChain(config, { chainId: optimism.id })
  expect(config.getClient().chain.id).toBe(optimism.id)

  // disconnects, still connected to optimism
  await disconnect(config)
  expect(config.getClient().chain.id).toBe(optimism.id)
})
