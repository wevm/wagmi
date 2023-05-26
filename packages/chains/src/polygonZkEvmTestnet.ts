import { type Chain } from '@wagmi/core'

export const polygonZkEvmTestnet = {
  id: 1442,
  name: 'Polygon zkEVM Testnet',
  network: 'polygon-zkevm-testnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.public.zkevm-test.net'],
    },
    public: {
      http: ['https://rpc.public.zkevm-test.net'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://explorer.public.zkevm-test.net',
    },
  },
  testnet: true,
} as const satisfies Chain
