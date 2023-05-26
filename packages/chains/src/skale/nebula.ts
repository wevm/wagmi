import { type Chain } from '@wagmi/core'

export const skaleNebula = {
  id: 1_482_601_649,
  name: 'SKALE | Nebula Gaming Hub',
  network: 'skale-nebula',
  nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.skalenodes.com/v1/green-giddy-denebola'],
    },
    public: {
      http: ['https://mainnet.skalenodes.com/v1/green-giddy-denebola'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'SKALE Explorer',
      url: 'https://green-giddy-denebola.explorer.mainnet.skalenodes.com',
    },
    default: {
      name: 'SKALE Explorer',
      url: 'https://green-giddy-denebola.explorer.mainnet.skalenodes.com',
    },
  },
  contracts: {},
} as const satisfies Chain
