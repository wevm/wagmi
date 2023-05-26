import { type Chain } from '@wagmi/core'

export const telos = {
  id: 40,
  name: 'Telos',
  network: 'telos',
  nativeCurrency: {
    decimals: 18,
    name: 'Telos',
    symbol: 'TLOS',
  },
  rpcUrls: {
    default: { http: ['https://mainnet.telos.net/evm'] },
    public: { http: ['https://mainnet.telos.net/evm'] },
  },
  blockExplorers: {
    default: {
      name: 'Teloscan',
      url: 'https://www.teloscan.io/',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 246530709,
    },
  },
} as const satisfies Chain
