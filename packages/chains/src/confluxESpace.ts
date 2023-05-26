import { type Chain } from '@wagmi/core'

export const confluxESpace = {
  id: 1_030,
  name: 'Conflux eSpace',
  network: 'cfx-espace',
  nativeCurrency: { name: 'Conflux', symbol: 'CFX', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://evm.confluxrpc.org'],
    },
    public: {
      http: ['https://evm.confluxrpc.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'ConfluxScan',
      url: 'https://evm.confluxscan.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0xEFf0078910f638cd81996cc117bccD3eDf2B072F',
      blockCreated: 68602935,
    },
  },
} as const satisfies Chain
