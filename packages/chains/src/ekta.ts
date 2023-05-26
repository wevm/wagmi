import { type Chain } from '@wagmi/core'

export const ekta = {
  id: 1994,
  name: 'Ekta',
  network: 'ekta',
  nativeCurrency: {
    decimals: 18,
    name: 'EKTA',
    symbol: 'EKTA',
  },
  rpcUrls: {
    public: { http: ['https://main.ekta.io'] },
    default: { http: ['https://main.ekta.io'] },
  },
  blockExplorers: {
    default: { name: 'Ektascan', url: 'https://ektascan.io' },
  },
} as const satisfies Chain
