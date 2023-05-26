import { type Chain } from '@wagmi/core'

export const bronosTestnet = {
  id: 1038,
  name: 'Bronos Testnet',
  network: 'bronos-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Bronos Coin',
    symbol: 'tBRO',
  },
  rpcUrls: {
    default: { http: ['https://evm-testnet.bronos.org'] },
    public: { http: ['https://evm-testnet.bronos.org'] },
  },
  blockExplorers: {
    default: { name: 'BronoScan', url: 'https://tbroscan.bronos.org' },
  },
  testnet: true,
} as const satisfies Chain
