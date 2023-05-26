import { type Chain } from '@wagmi/core'

export const iotexTestnet = {
  id: 4_690,
  name: 'IoTeX Testnet',
  network: 'iotex-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'IoTeX',
    symbol: 'IOTX',
  },
  rpcUrls: {
    default: {
      http: ['https://babel-api.testnet.iotex.io'],
      webSocket: ['wss://babel-api.testnet.iotex.io'],
    },
    public: {
      http: ['https://babel-api.testnet.iotex.io'],
      webSocket: ['wss://babel-api.testnet.iotex.io'],
    },
  },
  blockExplorers: {
    default: { name: 'IoTeXScan', url: 'https://testnet.iotexscan.io' },
  },
} as const satisfies Chain
