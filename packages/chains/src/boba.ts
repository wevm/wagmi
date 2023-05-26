import { type Chain } from '@wagmi/core'

export const boba = {
  id: 288,
  name: 'Boba Network',
  network: 'boba',
  nativeCurrency: {
    decimals: 18,
    name: 'Boba',
    symbol: 'BOBA',
  },
  rpcUrls: {
    default: { http: ['https://mainnet.boba.network'] },
    public: { http: ['https://mainnet.boba.network'] },
  },
  blockExplorers: {
    etherscan: { name: 'BOBAScan', url: 'https://bobascan.com' },
    default: { name: 'BOBAScan', url: 'https://bobascan.com' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 446859,
    },
  },
} as const satisfies Chain
