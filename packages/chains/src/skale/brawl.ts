import { type Chain } from '@wagmi/core'

export const skaleBlockBrawlers = {
  id: 391_845_894,
  name: 'SKALE | Block Brawlers',
  network: 'skale-brawl',
  nativeCurrency: { name: 'BRAWL', symbol: 'BRAWL', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.skalenodes.com/v1/frayed-decent-antares'],
    },
    public: {
      http: ['https://mainnet.skalenodes.com/v1/frayed-decent-antares'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'SKALE Explorer',
      url: 'https://frayed-decent-antares.explorer.mainnet.skalenodes.com',
    },
    default: {
      name: 'SKALE Explorer',
      url: 'https://frayed-decent-antares.explorer.mainnet.skalenodes.com',
    },
  },
  contracts: {},
} as const satisfies Chain
