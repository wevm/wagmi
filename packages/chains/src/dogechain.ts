import { type Chain } from '@wagmi/core'

export const dogechain = {
  id: 2_000,
  name: 'Dogechain',
  network: 'dogechain',
  nativeCurrency: {
    decimals: 18,
    name: 'Dogechain',
    symbol: 'DC',
  },
  rpcUrls: {
    default: { http: ['https://rpc.dogechain.dog'] },
    public: { http: ['https://rpc.dogechain.dog'] },
  },
  blockExplorers: {
    etherscan: {
      name: 'DogeChainExplorer',
      url: 'https://explorer.dogechain.dog',
    },
    default: {
      name: 'DogeChainExplorer',
      url: 'https://explorer.dogechain.dog',
    },
  },
} as const satisfies Chain
