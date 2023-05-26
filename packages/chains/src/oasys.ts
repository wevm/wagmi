import { type Chain } from '@wagmi/core'

export const oasys = {
  id: 248,
  name: 'Oasys',
  network: 'oasys',
  nativeCurrency: { name: 'Oasys', symbol: 'OAS', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.mainnet.oasys.games'],
    },
    public: {
      http: ['https://rpc.mainnet.oasys.games'],
    },
  },
  blockExplorers: {
    default: {
      name: 'OasysScan',
      url: 'https://scan.oasys.games',
    },
  },
} as const satisfies Chain
