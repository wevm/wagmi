import { type Chain } from '@wagmi/core'

export const klaytn = {
  id: 8_217,
  name: 'Klaytn',
  network: 'klaytn',
  nativeCurrency: {
    decimals: 18,
    name: 'Klaytn',
    symbol: 'KLAY',
  },
  rpcUrls: {
    default: { http: ['https://cypress.fautor.app/archive'] },
    public: { http: ['https://cypress.fautor.app/archive'] },
  },
  blockExplorers: {
    etherscan: { name: 'KlaytnScope', url: 'https://scope.klaytn.com' },
    default: { name: 'KlaytnScope', url: 'https://scope.klaytn.com' },
  },
} as const satisfies Chain
