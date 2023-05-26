import { type Chain } from '@wagmi/core'

export const fantom = {
  id: 250,
  name: 'Fantom',
  network: 'fantom',
  nativeCurrency: {
    decimals: 18,
    name: 'Fantom',
    symbol: 'FTM',
  },
  rpcUrls: {
    default: { http: ['https://rpc.ankr.com/fantom'] },
    public: { http: ['https://rpc.ankr.com/fantom'] },
  },
  blockExplorers: {
    etherscan: { name: 'FTMScan', url: 'https://ftmscan.com' },
    default: { name: 'FTMScan', url: 'https://ftmscan.com' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 33001987,
    },
  },
} as const satisfies Chain
