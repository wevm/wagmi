import { createTestClient, http } from 'viem'

import { chain } from './chains.js'

const { mainnet, mainnet2, optimism } = chain

export const testClient = {
  mainnet: createTestClient({
    mode: 'anvil',
    cacheTime: 0,
    chain: mainnet,
    transport: http(),
  }),
  mainnet2: createTestClient({
    mode: 'anvil',
    cacheTime: 0,
    chain: mainnet2,
    transport: http(),
  }),
  optimism: createTestClient({
    mode: 'anvil',
    cacheTime: 0,
    chain: optimism,
    transport: http(),
  }),
}
