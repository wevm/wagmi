import { type Chain } from '@wagmi/core'

export const cronos = {
  id: 25,
  name: 'Cronos',
  network: 'cronos',
  nativeCurrency: {
    decimals: 18,
    name: 'Cronos',
    symbol: 'CRO',
  },
  rpcUrls: {
    default: { http: ['https://node.croswap.com/rpc'] },
    public: { http: ['https://node.croswap.com/rpc'] },
  },
  blockExplorers: {
    etherscan: { name: 'CronosScan', url: 'https://cronoscan.com' },
    default: { name: 'CronosScan', url: 'https://cronoscan.com' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 1963112,
    },
  },
} as const satisfies Chain
