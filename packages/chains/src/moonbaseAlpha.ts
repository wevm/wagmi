import { type Chain } from '@wagmi/core'

export const moonbaseAlpha = {
  id: 1287,
  name: 'Moonbase Alpha',
  network: 'moonbase-alpha',
  nativeCurrency: {
    decimals: 18,
    name: 'DEV',
    symbol: 'DEV',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.api.moonbase.moonbeam.network'],
      webSocket: ['wss://wss.api.moonbase.moonbeam.network'],
    },
    public: {
      http: ['https://rpc.api.moonbase.moonbeam.network'],
      webSocket: ['wss://wss.api.moonbase.moonbeam.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Moonscan',
      url: 'https://moonbase.moonscan.io',
    },
    etherscan: {
      name: 'Moonscan',
      url: 'https://moonbase.moonscan.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 1850686,
    },
  },
  testnet: true,
} as const satisfies Chain
