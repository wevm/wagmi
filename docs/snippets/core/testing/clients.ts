import { http, createTestClient } from 'viem'

import { mainnetFork, optimismFork } from './chains'

export const mainnetTestClient = createTestClient({
  mode: 'anvil',
  chain: mainnetFork,
  transport: http(),
})

export const optimismTestClient = createTestClient({
  mode: 'anvil',
  chain: optimismFork,
  transport: http(),
})
