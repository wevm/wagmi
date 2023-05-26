import { type Chain } from '@wagmi/core'

export const ektaTestnet = {
  id: 1004,
  name: 'Ekta Testnet',
  network: 'ekta-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'EKTA',
    symbol: 'EKTA',
  },
  rpcUrls: {
    public: { http: ['https://test.ekta.io:8545'] },
    default: { http: ['https://test.ekta.io:8545'] },
  },
  blockExplorers: {
    default: { name: 'Test Ektascan', url: 'https://test.ektascan.io' },
  },
  testnet: true,
} as const satisfies Chain
