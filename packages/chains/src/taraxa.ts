import { type Chain } from '@wagmi/core'

export const taraxa = {
  id: 841,
  name: 'Taraxa Mainnet',
  network: 'taraxa',
  nativeCurrency: { name: 'Tara', symbol: 'TARA', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.mainnet.taraxa.io'],
    },
    public: {
      http: ['https://rpc.mainnet.taraxa.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Taraxa Explorer',
      url: 'https://explorer.mainnet.taraxa.io',
    },
  },
} as const satisfies Chain
