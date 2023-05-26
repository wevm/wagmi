import { type Chain } from '@wagmi/core'

export const polygonZkEvm = {
  id: 1101,
  name: 'Polygon zkEVM',
  network: 'polygon-zkevm',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://zkevm-rpc.com'],
    },
    public: {
      http: ['https://zkevm-rpc.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'PolygonScan',
      url: 'https://zkevm.polygonscan.com',
    },
  },
} as const satisfies Chain
