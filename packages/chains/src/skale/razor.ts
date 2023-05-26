import { type Chain } from '@wagmi/core'

export const skaleRazor = {
  id: 278_611_351,
  name: 'SKALE | Razor Network',
  network: 'skale-razor',
  nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.skalenodes.com/v1/turbulent-unique-scheat'],
    },
    public: {
      http: ['https://mainnet.skalenodes.com/v1/turbulent-unique-scheat'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'SKALE Explorer',
      url: 'https://turbulent-unique-scheat.explorer.mainnet.skalenodes.com',
    },
    default: {
      name: 'SKALE Explorer',
      url: 'https://turbulent-unique-scheat.explorer.mainnet.skalenodes.com',
    },
  },
  contracts: {},
} as const satisfies Chain
