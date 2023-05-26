import { type Chain } from '@wagmi/core'

export const baseGoerli = {
  id: 84531,
  network: 'base-goerli',
  name: 'Base Goerli',
  nativeCurrency: { name: 'Base Goerli', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://goerli.base.org'],
    },
    public: {
      http: ['https://goerli.base.org'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'Basescan',
      url: 'https://goerli.basescan.org',
    },
    default: {
      name: 'Basescan',
      url: 'https://goerli.basescan.org',
    },
  },
  testnet: true,
} as const satisfies Chain
