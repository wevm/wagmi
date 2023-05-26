import { type Chain } from '@wagmi/core'

export const zkSync = {
  id: 324,
  name: 'zkSync Era',
  network: 'zksync-era',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.era.zksync.io'],
      webSocket: ['wss://mainnet.era.zksync.io/ws'],
    },
    public: {
      http: ['https://mainnet.era.zksync.io'],
      webSocket: ['wss://mainnet.era.zksync.io/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'zkExplorer',
      url: 'https://explorer.zksync.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0x47898B2C52C957663aE9AB46922dCec150a2272c',
    },
  },
} as const satisfies Chain
