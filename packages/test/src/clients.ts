import {
  type Account,
  type Client,
  createTestClient,
  http,
  type TestActions,
  type TestRpcSchema,
  type Transport,
} from 'viem'

import { type Chain, mainnet, mainnet2, optimism } from './chains.js'

export const mainnetTestClient = createTestClient({
  mode: 'anvil',
  cacheTime: 0,
  chain: mainnet,
  transport: http(),
}).extend(wagmiTestMethods)

export const mainnet2TestClient = createTestClient({
  mode: 'anvil',
  cacheTime: 0,
  chain: mainnet2,
  transport: http(),
}).extend(wagmiTestMethods)

export const optimismTestClient = createTestClient({
  mode: 'anvil',
  cacheTime: 0,
  chain: optimism,
  transport: http(),
}).extend(wagmiTestMethods)

export const testClient = {
  mainnet: mainnetTestClient,
  mainnet2: mainnet2TestClient,
  optimism: optimismTestClient,
}

function wagmiTestMethods(
  client: Client<
    Transport,
    Chain,
    Account | undefined,
    TestRpcSchema<'anvil'>,
    TestActions
  >,
) {
  return {
    /** Resets instance attached to chain. */
    async restart() {
      return await fetch(`${client.chain.rpcUrls.default.http[0]}/restart`)
    },
    /** Resets fork attached to chain at starting block number. */
    resetFork() {
      return client.reset({
        jsonRpcUrl: client.chain.fork.url,
        blockNumber: client.chain.fork.blockNumber,
      })
    },
  }
}
