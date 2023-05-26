import { type Chain } from '@wagmi/core'

export const haqqMainnet = {
  id: 11235,
  name: 'HAQQ Mainnet',
  network: 'haqq-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Islamic Coin',
    symbol: 'ISLM',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.eth.haqq.network'],
    },
    public: {
      http: ['https://rpc.eth.haqq.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'HAQQ Explorer',
      url: 'https://explorer.haqq.network',
    },
  },
} as const satisfies Chain
