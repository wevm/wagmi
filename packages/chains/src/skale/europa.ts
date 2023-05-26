import { type Chain } from '@wagmi/core'

export const skaleEuropa = {
  id: 2_046_399_126,
  name: 'SKALE | Europa Liquidity Hub',
  network: 'skale-europa',
  nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.skalenodes.com/v1/elated-tan-skat'],
    },
    public: {
      http: ['https://mainnet.skalenodes.com/v1/elated-tan-skat'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'SKALE Explorer',
      url: 'https://elated-tan-skat.explorer.mainnet.skalenodes.com',
    },
    default: {
      name: 'SKALE Explorer',
      url: 'https://elated-tan-skat.explorer.mainnet.skalenodes.com',
    },
  },
  contracts: {},
} as const satisfies Chain
