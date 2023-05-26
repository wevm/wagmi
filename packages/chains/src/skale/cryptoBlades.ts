import { type Chain } from '@wagmi/core'

export const skaleCryptoBlades = {
  id: 1_026_062_157,
  name: 'SKALE | CryptoBlades',
  network: 'skale-cryptoblades',
  nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.skalenodes.com/v1/affectionate-immediate-pollux'],
    },
    public: {
      http: ['https://mainnet.skalenodes.com/v1/affectionate-immediate-pollux'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'SKALE Explorer',
      url: 'https://affectionate-immediate-pollux.explorer.mainnet.skalenodes.com',
    },
    default: {
      name: 'SKALE Explorer',
      url: 'https://affectionate-immediate-pollux.explorer.mainnet.skalenodes.com',
    },
  },
  contracts: {},
} as const satisfies Chain
