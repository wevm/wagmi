import { mainnet } from '@wagmi/chains'
import { type Chain, createTestClient, http } from 'viem'

import { createConfig } from '../src/index.js'
import { chainId, pool, port } from './constants.js'

export const anvil = {
  ...mainnet, // We are using a mainnet fork for testing.
  id: chainId,
  rpcUrls: {
    // These rpc urls are automatically used in the transports.
    default: {
      // Note how we append the worker id to the local rpc urls.
      http: [`http://127.0.0.1:${port}/${pool}`],
      webSocket: [`ws://127.0.0.1:${port}/${pool}`],
    },
    public: {
      // Note how we append the worker id to the local rpc urls.
      http: [`http://127.0.0.1:${port}/${pool}`],
      webSocket: [`ws://127.0.0.1:${port}/${pool}`],
    },
  },
} as const satisfies Chain

export const testClient = createTestClient({
  chain: anvil,
  mode: 'anvil',
  transport: http(),
})

export const config = createConfig({
  chains: [anvil], // TODO: Figure out how to get chains
  connectors: [],
  reconnectOnMount: false,
  storage: null,
  transports: {
    [anvil.id]: http(),
  },
})
