import { type Chain } from '@wagmi/core'

export const pulsechain = {
  id: 369,
  network: 'pulsechain',
  name: 'Pulsechain',
  nativeCurrency: { name: 'Pulse', symbol: 'PLS', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.pulsechain.com'],
      webSocket: ['wss://ws.pulsechain.com'],
    },
    public: {
      http: ['https://rpc.pulsechain.com'],
      webSocket: ['wss://ws.pulsechain.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://scan.pulsechain.com',
    },
  },
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 14353601,
    },
  },
} as const satisfies Chain
