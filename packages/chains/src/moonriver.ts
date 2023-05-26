import { type Chain } from '@wagmi/core'

export const moonriver = {
  id: 1285,
  name: 'Moonriver',
  network: 'moonriver',
  nativeCurrency: {
    decimals: 18,
    name: 'MOVR',
    symbol: 'MOVR',
  },
  rpcUrls: {
    public: {
      http: ['https://moonriver.public.blastapi.io'],
      webSocket: ['wss://moonriver.public.blastapi.io'],
    },
    default: {
      http: ['https://moonriver.public.blastapi.io'],
      webSocket: ['wss://moonriver.public.blastapi.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Moonscan',
      url: 'https://moonriver.moonscan.io',
    },
    etherscan: {
      name: 'Moonscan',
      url: 'https://moonriver.moonscan.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 1597904,
    },
  },
  testnet: false,
} as const satisfies Chain
