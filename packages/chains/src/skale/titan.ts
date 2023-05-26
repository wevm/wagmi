import { type Chain } from '@wagmi/core'

export const skaleTitan = {
  id: 1_350_216_234,
  name: 'SKALE | Titan Community Hub',
  network: 'skale-titan',
  nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.skalenodes.com/v1/parallel-stormy-spica'],
    },
    public: {
      http: ['https://mainnet.skalenodes.com/v1/parallel-stormy-spica'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'SKALE Explorer',
      url: 'https://parallel-stormy-spica.explorer.mainnet.skalenodes.com',
    },
    default: {
      name: 'SKALE Explorer',
      url: 'https://parallel-stormy-spica.explorer.mainnet.skalenodes.com',
    },
  },
  contracts: {},
} as const satisfies Chain
