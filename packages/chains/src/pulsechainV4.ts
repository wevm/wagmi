import { type Chain } from '@wagmi/core'

export const pulsechainV4 = {
  id: 943,
  network: 'pulsechainV4',
  name: 'Pulsechain V4',
  testnet: true,
  nativeCurrency: { name: 'Pulse', symbol: 'PLS', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.v4.testnet.pulsechain.com'],
      webSocket: ['wss://ws.v4.testnet.pulsechain.com'],
    },
    public: {
      http: ['https://rpc.v4.testnet.pulsechain.com'],
      webSocket: ['wss://ws.v4.testnet.pulsechain.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://scan.v4.testnet.pulsechain.com',
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
