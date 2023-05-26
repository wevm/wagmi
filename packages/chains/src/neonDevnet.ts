import { type Chain } from '@wagmi/core'

export const neonDevnet = {
  id: 245_022_926,
  network: 'neonDevnet',
  name: 'Neon EVM DevNet',
  nativeCurrency: { name: 'NEON', symbol: 'NEON', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://devnet.neonevm.org'],
    },
    public: {
      http: ['https://devnet.neonevm.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Neonscan',
      url: 'https://neonscan.org',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 205206112,
    },
  },
  testnet: true,
} as const satisfies Chain
