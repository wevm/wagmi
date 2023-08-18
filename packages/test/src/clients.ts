import { createTestClient, http } from 'viem'

import { mainnet, mainnet2, optimism } from './chains.js'

export const mainnetTestClient = createTestClient({
  mode: 'anvil',
  cacheTime: 0,
  chain: mainnet,
  transport: http(),
})

export const mainnet2TestClient = createTestClient({
  mode: 'anvil',
  cacheTime: 0,
  chain: mainnet2,
  transport: http(),
})

export const optimismTestClient = createTestClient({
  mode: 'anvil',
  cacheTime: 0,
  chain: optimism,
  transport: http(),
})

export const testClient = {
  mainnet: mainnetTestClient,
  mainnet2: mainnet2TestClient,
  optimism: optimismTestClient,
}
