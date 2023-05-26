import { type Chain } from '@wagmi/core'

export const canto = {
  id: 7_700,
  name: 'Canto',
  network: 'canto',
  nativeCurrency: {
    decimals: 18,
    name: 'Canto',
    symbol: 'CANTO',
  },
  rpcUrls: {
    default: { http: ['https://canto.slingshot.finance'] },
    public: { http: ['https://canto.slingshot.finance'] },
  },
  blockExplorers: {
    default: {
      name: 'Canto EVM Explorer (Blockscout)',
      url: 'https://evm.explorer.canto.io',
    },
  },
} as const satisfies Chain
