import { type Chain } from '@wagmi/core'

export const polygon = {
  id: 137,
  name: 'Polygon',
  network: 'matic',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    alchemy: {
      http: ['https://polygon-mainnet.g.alchemy.com/v2'],
      webSocket: ['wss://polygon-mainnet.g.alchemy.com/v2'],
    },
    infura: {
      http: ['https://polygon-mainnet.infura.io/v3'],
      webSocket: ['wss://polygon-mainnet.infura.io/ws/v3'],
    },
    default: {
      http: ['https://polygon-rpc.com'],
    },
    public: {
      http: ['https://polygon-rpc.com'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'PolygonScan',
      url: 'https://polygonscan.com',
    },
    default: {
      name: 'PolygonScan',
      url: 'https://polygonscan.com',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 25770160,
    },
  },
} as const satisfies Chain
