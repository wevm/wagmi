import { type Chain } from '@wagmi/core'

export const thunderTestnet = {
  id: 997,
  name: '5ireChain Thunder Testnet',
  network: '5ireChain',
  nativeCurrency: { name: '5ire Token', symbol: '5IRE', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.5ire.network'],
    },
    public: {
      http: ['https://rpc-testnet.5ire.network'],
    },
  },
  blockExplorers: {
    default: {
      name: '5ireChain Explorer',
      url: 'https://explorer.5ire.network',
    },
  },
  testnet: true,
} as const satisfies Chain
