import { type Chain } from '@wagmi/core'

export const scrollTestnet = {
  id: 534_353,
  name: 'Scroll Testnet',
  network: 'scroll-testnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://alpha-rpc.scroll.io/l2'],
      webSocket: ['wss://alpha-rpc.scroll.io/l2/ws'],
    },
    public: {
      http: ['https://alpha-rpc.scroll.io/l2'],
      webSocket: ['wss://alpha-rpc.scroll.io/l2/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://blockscout.scroll.io',
    },
  },
  testnet: true,
} as const satisfies Chain
